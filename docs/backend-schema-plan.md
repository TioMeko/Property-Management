# Backend Data Schema Plan

This document outlines the database models, relationships, and schema design needed to support the Property Management application frontend. This schema is derived from the frontend data requirements and follows database normalization principles.

## Table of Contents
1. [Entity Relationship Overview](#entity-relationship-overview)
2. [Core Models](#core-models)
3. [Junction Tables](#junction-tables)
4. [Enums and Constants](#enums-and-constants)
5. [Database Indexes](#database-indexes)
6. [API Response Patterns](#api-response-patterns)
7. [Implementation Notes](#implementation-notes)

---

## Entity Relationship Overview

```
┌─────────────┐
│    User     │
└──────┬──────┘
       │
       ├──────────────────────────────────────────────┐
       │                                              │
┌──────▼──────┐                                ┌─────▼─────┐
│  Landlord   │                                │   Tenant  │
│  (Profile)  │                                │ (Profile) │
└──────┬──────┘                                └─────┬─────┘
       │                                              │
       │ owns                                   leases│
       │                                              │
┌──────▼──────────┐                          ┌───────▼────────┐
│    Property     │◄─────────────────────────│     Lease      │
└──────┬──────────┘         located at       └───────┬────────┘
       │                                              │
       │ has                                    has   │
       │                                              │
┌──────▼──────────┐                          ┌───────▼────────┐
│      Unit       │                          │    Payment     │
└──────┬──────────┘                          └────────────────┘
       │
       │ has
       │
┌──────▼─────────────────┐
│ Maintenance Request    │
└────────────────────────┘

┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Message   │         │Notification │         │   Document  │
└─────────────┘         └─────────────┘         └─────────────┘
```

---

## Core Models

### 1. User Model

**Table Name:** `users`

**Description:** Core user authentication and profile data for all user types.

**Schema:**
```typescript
{
  id: UUID (PRIMARY KEY),
  email: VARCHAR(255) UNIQUE NOT NULL,
  passwordHash: VARCHAR(255) NOT NULL,
  role: ENUM('landlord', 'tenant', 'admin') NOT NULL,
  firstName: VARCHAR(100) NOT NULL,
  lastName: VARCHAR(100) NOT NULL,
  phone: VARCHAR(20),
  address: VARCHAR(255),
  city: VARCHAR(100),
  state: VARCHAR(50),
  zipCode: VARCHAR(10),
  avatarUrl: VARCHAR(500),
  isEmailVerified: BOOLEAN DEFAULT false,
  isActive: BOOLEAN DEFAULT true,
  lastLoginAt: TIMESTAMP,
  createdAt: TIMESTAMP DEFAULT NOW(),
  updatedAt: TIMESTAMP DEFAULT NOW()
}
```

**Indexes:**
- PRIMARY KEY on `id`
- UNIQUE INDEX on `email`
- INDEX on `role`
- INDEX on `isActive`

**Relationships:**
- Has many: Properties (if landlord)
- Has many: Leases (if tenant)
- Has many: Messages (sent and received)
- Has many: Notifications
- Has one: UserSettings

---

### 2. Property Model

**Table Name:** `properties`

**Description:** Represents rental properties owned by landlords.

**Schema:**
```typescript
{
  id: UUID (PRIMARY KEY),
  landlordId: UUID (FOREIGN KEY -> users.id) NOT NULL,
  name: VARCHAR(255) NOT NULL,
  address: VARCHAR(255) NOT NULL,
  city: VARCHAR(100) NOT NULL,
  state: VARCHAR(50) NOT NULL,
  zipCode: VARCHAR(10) NOT NULL,
  country: VARCHAR(50) DEFAULT 'USA',
  propertyType: ENUM('apartment', 'house', 'condo', 'townhouse', 'commercial') NOT NULL,
  totalUnits: INTEGER NOT NULL DEFAULT 1,
  occupiedUnits: INTEGER NOT NULL DEFAULT 0,
  yearBuilt: INTEGER,
  squareFeet: INTEGER,
  description: TEXT,
  amenities: TEXT[], // PostgreSQL array or JSON
  images: TEXT[], // Array of image URLs
  status: ENUM('active', 'inactive', 'maintenance') DEFAULT 'active',
  createdAt: TIMESTAMP DEFAULT NOW(),
  updatedAt: TIMESTAMP DEFAULT NOW()
}
```

**Indexes:**
- PRIMARY KEY on `id`
- INDEX on `landlordId`
- INDEX on `status`
- INDEX on `city, state` (composite for location searches)

**Relationships:**
- Belongs to: User (landlord)
- Has many: Units
- Has many: Leases
- Has many: MaintenanceRequests

**Computed Fields:**
- `occupancyRate`: (occupiedUnits / totalUnits) * 100
- `vacantUnits`: totalUnits - occupiedUnits

---

### 3. Unit Model

**Table Name:** `units`

**Description:** Individual units within a property (for multi-unit properties).

**Schema:**
```typescript
{
  id: UUID (PRIMARY KEY),
  propertyId: UUID (FOREIGN KEY -> properties.id) NOT NULL,
  unitNumber: VARCHAR(50) NOT NULL,
  floor: INTEGER,
  bedrooms: INTEGER NOT NULL,
  bathrooms: DECIMAL(3,1) NOT NULL,
  squareFeet: INTEGER,
  monthlyRent: DECIMAL(10,2) NOT NULL,
  securityDeposit: DECIMAL(10,2),
  status: ENUM('available', 'occupied', 'maintenance', 'reserved') DEFAULT 'available',
  description: TEXT,
  features: TEXT[], // Array of features
  images: TEXT[], // Array of image URLs
  createdAt: TIMESTAMP DEFAULT NOW(),
  updatedAt: TIMESTAMP DEFAULT NOW()
}
```

**Indexes:**
- PRIMARY KEY on `id`
- INDEX on `propertyId`
- INDEX on `status`
- UNIQUE INDEX on `propertyId, unitNumber`

**Relationships:**
- Belongs to: Property
- Has many: Leases
- Has many: MaintenanceRequests

---

### 4. Lease Model

**Table Name:** `leases`

**Description:** Lease agreements between landlords and tenants.

**Schema:**
```typescript
{
  id: UUID (PRIMARY KEY),
  propertyId: UUID (FOREIGN KEY -> properties.id) NOT NULL,
  unitId: UUID (FOREIGN KEY -> units.id),
  tenantId: UUID (FOREIGN KEY -> users.id) NOT NULL,
  landlordId: UUID (FOREIGN KEY -> users.id) NOT NULL,
  leaseStartDate: DATE NOT NULL,
  leaseEndDate: DATE NOT NULL,
  monthlyRent: DECIMAL(10,2) NOT NULL,
  securityDeposit: DECIMAL(10,2) NOT NULL,
  securityDepositPaid: BOOLEAN DEFAULT false,
  paymentDueDay: INTEGER NOT NULL DEFAULT 1, // Day of month (1-31)
  status: ENUM('draft', 'active', 'expiring_soon', 'expired', 'terminated', 'renewed') DEFAULT 'draft',
  leaseType: ENUM('fixed', 'month_to_month') DEFAULT 'fixed',
  terms: TEXT, // Lease terms and conditions
  documentUrl: VARCHAR(500), // PDF of signed lease
  notes: TEXT,
  terminationDate: DATE,
  terminationReason: TEXT,
  renewedToLeaseId: UUID (FOREIGN KEY -> leases.id), // If renewed
  createdAt: TIMESTAMP DEFAULT NOW(),
  updatedAt: TIMESTAMP DEFAULT NOW()
}
```

**Indexes:**
- PRIMARY KEY on `id`
- INDEX on `tenantId`
- INDEX on `landlordId`
- INDEX on `propertyId`
- INDEX on `unitId`
- INDEX on `status`
- INDEX on `leaseEndDate` (for expiration notifications)

**Relationships:**
- Belongs to: User (tenant)
- Belongs to: User (landlord)
- Belongs to: Property
- Belongs to: Unit
- Has many: Payments
- Self-referential: renewedToLeaseId

**Computed Fields:**
- `daysUntilExpiration`: leaseEndDate - currentDate
- `isExpiringSoon`: leaseEndDate within 60 days

---

### 5. Payment Model

**Table Name:** `payments`

**Description:** Rent and other payments made by tenants.

**Schema:**
```typescript
{
  id: UUID (PRIMARY KEY),
  leaseId: UUID (FOREIGN KEY -> leases.id) NOT NULL,
  tenantId: UUID (FOREIGN KEY -> users.id) NOT NULL,
  landlordId: UUID (FOREIGN KEY -> users.id) NOT NULL,
  amount: DECIMAL(10,2) NOT NULL,
  dueDate: DATE NOT NULL,
  paidDate: TIMESTAMP,
  status: ENUM('pending', 'paid', 'partial', 'overdue', 'failed', 'refunded') DEFAULT 'pending',
  paymentType: ENUM('rent', 'security_deposit', 'late_fee', 'utility', 'other') DEFAULT 'rent',
  paymentMethod: VARCHAR(50), // 'credit_card', 'bank_transfer', 'check', 'cash'
  transactionId: VARCHAR(255) UNIQUE,
  stripePaymentIntentId: VARCHAR(255), // If using Stripe
  amountPaid: DECIMAL(10,2) DEFAULT 0,
  lateFee: DECIMAL(10,2) DEFAULT 0,
  notes: TEXT,
  receiptUrl: VARCHAR(500),
  createdAt: TIMESTAMP DEFAULT NOW(),
  updatedAt: TIMESTAMP DEFAULT NOW()
}
```

**Indexes:**
- PRIMARY KEY on `id`
- INDEX on `leaseId`
- INDEX on `tenantId`
- INDEX on `landlordId`
- INDEX on `status`
- INDEX on `dueDate`
- UNIQUE INDEX on `transactionId`

**Relationships:**
- Belongs to: Lease
- Belongs to: User (tenant)
- Belongs to: User (landlord)

**Triggers/Hooks:**
- On create: Create notification for tenant
- On status change to 'overdue': Send overdue notification
- On status change to 'paid': Update lease payment status

---

### 6. MaintenanceRequest Model

**Table Name:** `maintenance_requests`

**Description:** Maintenance and repair requests for properties.

**Schema:**
```typescript
{
  id: UUID (PRIMARY KEY),
  propertyId: UUID (FOREIGN KEY -> properties.id) NOT NULL,
  unitId: UUID (FOREIGN KEY -> units.id),
  tenantId: UUID (FOREIGN KEY -> users.id) NOT NULL,
  landlordId: UUID (FOREIGN KEY -> users.id) NOT NULL,
  assignedToId: UUID (FOREIGN KEY -> users.id), // Maintenance worker
  title: VARCHAR(255) NOT NULL,
  description: TEXT NOT NULL,
  category: ENUM('plumbing', 'electrical', 'hvac', 'appliance', 'structural', 'pest', 'other') NOT NULL,
  priority: ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
  status: ENUM('pending', 'in_progress', 'scheduled', 'completed', 'cancelled') DEFAULT 'pending',
  images: TEXT[], // Array of image URLs
  scheduledDate: TIMESTAMP,
  completedDate: TIMESTAMP,
  estimatedCost: DECIMAL(10,2),
  actualCost: DECIMAL(10,2),
  notes: TEXT,
  resolutionNotes: TEXT,
  permissionToEnter: BOOLEAN DEFAULT false,
  createdAt: TIMESTAMP DEFAULT NOW(),
  updatedAt: TIMESTAMP DEFAULT NOW()
}
```

**Indexes:**
- PRIMARY KEY on `id`
- INDEX on `propertyId`
- INDEX on `unitId`
- INDEX on `tenantId`
- INDEX on `landlordId`
- INDEX on `assignedToId`
- INDEX on `status`
- INDEX on `priority`
- INDEX on `createdAt` (for sorting)

**Relationships:**
- Belongs to: Property
- Belongs to: Unit
- Belongs to: User (tenant)
- Belongs to: User (landlord)
- Belongs to: User (assigned worker)
- Has many: MaintenanceUpdates

---

### 7. MaintenanceUpdate Model

**Table Name:** `maintenance_updates`

**Description:** Status updates and comments on maintenance requests.

**Schema:**
```typescript
{
  id: UUID (PRIMARY KEY),
  requestId: UUID (FOREIGN KEY -> maintenance_requests.id) NOT NULL,
  userId: UUID (FOREIGN KEY -> users.id) NOT NULL,
  updateType: ENUM('status_change', 'comment', 'cost_update', 'scheduled') NOT NULL,
  previousStatus: VARCHAR(50),
  newStatus: VARCHAR(50),
  comment: TEXT,
  images: TEXT[],
  createdAt: TIMESTAMP DEFAULT NOW()
}
```

**Indexes:**
- PRIMARY KEY on `id`
- INDEX on `requestId`
- INDEX on `userId`

**Relationships:**
- Belongs to: MaintenanceRequest
- Belongs to: User

---

### 8. Message Model

**Table Name:** `messages`

**Description:** Direct messages between users (landlords and tenants).

**Schema:**
```typescript
{
  id: UUID (PRIMARY KEY),
  senderId: UUID (FOREIGN KEY -> users.id) NOT NULL,
  receiverId: UUID (FOREIGN KEY -> users.id) NOT NULL,
  propertyId: UUID (FOREIGN KEY -> properties.id), // Optional context
  leaseId: UUID (FOREIGN KEY -> leases.id), // Optional context
  subject: VARCHAR(255),
  content: TEXT NOT NULL,
  isRead: BOOLEAN DEFAULT false,
  readAt: TIMESTAMP,
  parentMessageId: UUID (FOREIGN KEY -> messages.id), // For threading
  attachments: TEXT[], // Array of attachment URLs
  createdAt: TIMESTAMP DEFAULT NOW(),
  updatedAt: TIMESTAMP DEFAULT NOW()
}
```

**Indexes:**
- PRIMARY KEY on `id`
- INDEX on `senderId`
- INDEX on `receiverId`
- INDEX on `propertyId`
- INDEX on `leaseId`
- INDEX on `isRead`
- INDEX on `createdAt`

**Relationships:**
- Belongs to: User (sender)
- Belongs to: User (receiver)
- Belongs to: Property (optional)
- Belongs to: Lease (optional)
- Self-referential: parentMessageId (for threads)

---

### 9. Notification Model

**Table Name:** `notifications`

**Description:** System notifications for users.

**Schema:**
```typescript
{
  id: UUID (PRIMARY KEY),
  userId: UUID (FOREIGN KEY -> users.id) NOT NULL,
  type: ENUM('payment', 'maintenance', 'message', 'lease', 'system', 'reminder') NOT NULL,
  title: VARCHAR(255) NOT NULL,
  content: TEXT NOT NULL,
  relatedEntityType: VARCHAR(50), // 'payment', 'maintenance_request', 'lease', etc.
  relatedEntityId: UUID,
  actionUrl: VARCHAR(500), // Deep link to relevant page
  isRead: BOOLEAN DEFAULT false,
  readAt: TIMESTAMP,
  priority: ENUM('low', 'medium', 'high') DEFAULT 'medium',
  expiresAt: TIMESTAMP, // Optional expiration
  createdAt: TIMESTAMP DEFAULT NOW()
}
```

**Indexes:**
- PRIMARY KEY on `id`
- INDEX on `userId`
- INDEX on `type`
- INDEX on `isRead`
- INDEX on `createdAt`

**Relationships:**
- Belongs to: User

---

### 10. Document Model

**Table Name:** `documents`

**Description:** Store documents like leases, receipts, reports.

**Schema:**
```typescript
{
  id: UUID (PRIMARY KEY),
  userId: UUID (FOREIGN KEY -> users.id) NOT NULL,
  propertyId: UUID (FOREIGN KEY -> properties.id),
  leaseId: UUID (FOREIGN KEY -> leases.id),
  documentType: ENUM('lease', 'receipt', 'report', 'identification', 'other') NOT NULL,
  title: VARCHAR(255) NOT NULL,
  description: TEXT,
  fileUrl: VARCHAR(500) NOT NULL,
  fileType: VARCHAR(50), // 'pdf', 'jpg', 'png', 'docx'
  fileSize: INTEGER, // In bytes
  uploadedBy: UUID (FOREIGN KEY -> users.id) NOT NULL,
  isPublic: BOOLEAN DEFAULT false,
  createdAt: TIMESTAMP DEFAULT NOW(),
  updatedAt: TIMESTAMP DEFAULT NOW()
}
```

**Indexes:**
- PRIMARY KEY on `id`
- INDEX on `userId`
- INDEX on `propertyId`
- INDEX on `leaseId`
- INDEX on `documentType`
- INDEX on `uploadedBy`

**Relationships:**
- Belongs to: User (owner)
- Belongs to: Property (optional)
- Belongs to: Lease (optional)
- Belongs to: User (uploader)

---

### 11. UserSettings Model

**Table Name:** `user_settings`

**Description:** User preferences and settings.

**Schema:**
```typescript
{
  id: UUID (PRIMARY KEY),
  userId: UUID (FOREIGN KEY -> users.id) UNIQUE NOT NULL,
  // Notification Preferences
  emailNotifications: BOOLEAN DEFAULT true,
  smsNotifications: BOOLEAN DEFAULT false,
  paymentReminders: BOOLEAN DEFAULT true,
  maintenanceUpdates: BOOLEAN DEFAULT true,
  messageNotifications: BOOLEAN DEFAULT true,
  leaseExpirationReminders: BOOLEAN DEFAULT true,
  // Display Preferences
  darkMode: BOOLEAN DEFAULT false,
  language: VARCHAR(10) DEFAULT 'en',
  timezone: VARCHAR(50) DEFAULT 'UTC',
  dateFormat: VARCHAR(20) DEFAULT 'MM/DD/YYYY',
  // Tenant-specific
  autoPayRent: BOOLEAN DEFAULT false,
  autoPayDay: INTEGER, // Day before due date to auto-pay
  // Landlord-specific
  defaultPaymentDueDay: INTEGER DEFAULT 1,
  requireDepositOnBooking: BOOLEAN DEFAULT true,
  // General
  twoFactorEnabled: BOOLEAN DEFAULT false,
  createdAt: TIMESTAMP DEFAULT NOW(),
  updatedAt: TIMESTAMP DEFAULT NOW()
}
```

**Indexes:**
- PRIMARY KEY on `id`
- UNIQUE INDEX on `userId`

**Relationships:**
- Belongs to: User (one-to-one)

---

### 12. Activity Log Model

**Table Name:** `activity_logs`

**Description:** Track user activities for audit trail and recent activity feeds.

**Schema:**
```typescript
{
  id: UUID (PRIMARY KEY),
  userId: UUID (FOREIGN KEY -> users.id) NOT NULL,
  activityType: ENUM('login', 'payment', 'maintenance', 'message', 'lease', 'profile_update', 'property_update') NOT NULL,
  entityType: VARCHAR(50), // 'payment', 'lease', 'property', etc.
  entityId: UUID,
  description: TEXT NOT NULL,
  metadata: JSONB, // Additional data as JSON
  ipAddress: VARCHAR(45),
  userAgent: VARCHAR(500),
  createdAt: TIMESTAMP DEFAULT NOW()
}
```

**Indexes:**
- PRIMARY KEY on `id`
- INDEX on `userId`
- INDEX on `activityType`
- INDEX on `createdAt`

**Relationships:**
- Belongs to: User

---

## Junction Tables

### PropertyTenant (for historical tracking)

**Table Name:** `property_tenants`

**Description:** Track tenant history at properties (many-to-many).

**Schema:**
```typescript
{
  id: UUID (PRIMARY KEY),
  propertyId: UUID (FOREIGN KEY -> properties.id) NOT NULL,
  tenantId: UUID (FOREIGN KEY -> users.id) NOT NULL,
  moveInDate: DATE NOT NULL,
  moveOutDate: DATE,
  isCurrentTenant: BOOLEAN DEFAULT true,
  createdAt: TIMESTAMP DEFAULT NOW()
}
```

---

## Enums and Constants

### User Roles
```typescript
enum UserRole {
  LANDLORD = 'landlord',
  TENANT = 'tenant',
  ADMIN = 'admin'
}
```

### Property Types
```typescript
enum PropertyType {
  APARTMENT = 'apartment',
  HOUSE = 'house',
  CONDO = 'condo',
  TOWNHOUSE = 'townhouse',
  COMMERCIAL = 'commercial'
}
```

### Lease Status
```typescript
enum LeaseStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  EXPIRING_SOON = 'expiring_soon',
  EXPIRED = 'expired',
  TERMINATED = 'terminated',
  RENEWED = 'renewed'
}
```

### Payment Status
```typescript
enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  PARTIAL = 'partial',
  OVERDUE = 'overdue',
  FAILED = 'failed',
  REFUNDED = 'refunded'
}
```

### Maintenance Priority
```typescript
enum MaintenancePriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}
```

### Maintenance Status
```typescript
enum MaintenanceStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  SCHEDULED = 'scheduled',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}
```

### Notification Types
```typescript
enum NotificationType {
  PAYMENT = 'payment',
  MAINTENANCE = 'maintenance',
  MESSAGE = 'message',
  LEASE = 'lease',
  SYSTEM = 'system',
  REMINDER = 'reminder'
}
```

---

## Database Indexes

### Performance Indexes

```sql
-- User lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_active ON users(isActive);

-- Property searches
CREATE INDEX idx_properties_landlord ON properties(landlordId);
CREATE INDEX idx_properties_location ON properties(city, state);
CREATE INDEX idx_properties_status ON properties(status);

-- Unit availability
CREATE INDEX idx_units_property ON units(propertyId);
CREATE INDEX idx_units_status ON units(status);

-- Lease queries
CREATE INDEX idx_leases_tenant ON leases(tenantId);
CREATE INDEX idx_leases_landlord ON leases(landlordId);
CREATE INDEX idx_leases_property ON leases(propertyId);
CREATE INDEX idx_leases_status ON leases(status);
CREATE INDEX idx_leases_expiration ON leases(leaseEndDate);

-- Payment queries
CREATE INDEX idx_payments_lease ON payments(leaseId);
CREATE INDEX idx_payments_tenant ON payments(tenantId);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_due_date ON payments(dueDate);

-- Maintenance tracking
CREATE INDEX idx_maintenance_property ON maintenance_requests(propertyId);
CREATE INDEX idx_maintenance_tenant ON maintenance_requests(tenantId);
CREATE INDEX idx_maintenance_landlord ON maintenance_requests(landlordId);
CREATE INDEX idx_maintenance_status ON maintenance_requests(status);
CREATE INDEX idx_maintenance_priority ON maintenance_requests(priority);

-- Message queries
CREATE INDEX idx_messages_sender ON messages(senderId);
CREATE INDEX idx_messages_receiver ON messages(receiverId);
CREATE INDEX idx_messages_unread ON messages(receiverId, isRead);
CREATE INDEX idx_messages_created ON messages(createdAt);

-- Notification queries
CREATE INDEX idx_notifications_user ON notifications(userId);
CREATE INDEX idx_notifications_unread ON notifications(userId, isRead);
CREATE INDEX idx_notifications_created ON notifications(createdAt);

-- Activity logs
CREATE INDEX idx_activity_user ON activity_logs(userId);
CREATE INDEX idx_activity_type ON activity_logs(activityType);
CREATE INDEX idx_activity_created ON activity_logs(createdAt);
```

### Full-Text Search Indexes

```sql
-- PostgreSQL full-text search
CREATE INDEX idx_properties_search ON properties 
  USING gin(to_tsvector('english', name || ' ' || address || ' ' || city));

CREATE INDEX idx_maintenance_search ON maintenance_requests 
  USING gin(to_tsvector('english', title || ' ' || description));

CREATE INDEX idx_messages_search ON messages 
  USING gin(to_tsvector('english', subject || ' ' || content));
```

---

## API Response Patterns

### Standard Success Response
```json
{
  "success": true,
  "data": {},
  "message": "Operation completed successfully",
  "timestamp": "2024-12-15T10:30:00Z"
}
```

### Standard Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "email",
      "issue": "Email already exists"
    }
  },
  "timestamp": "2024-12-15T10:30:00Z"
}
```

### Paginated Response
```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10,
    "hasNext": true,
    "hasPrevious": false
  },
  "timestamp": "2024-12-15T10:30:00Z"
}
```

---

## Implementation Notes

### 1. Database Choice
**Recommended:** PostgreSQL
- Strong ACID compliance
- Excellent JSON/JSONB support for flexible fields
- Full-text search capabilities
- Array data type support
- Mature ecosystem

**Alternative:** MongoDB (if preferring NoSQL)
- Flexible schema
- Good for rapid development
- Built-in aggregation framework

### 2. ORM/Query Builder
**Recommended:** 
- **Node.js:** Prisma, TypeORM, or Sequelize
- **Python:** SQLAlchemy or Django ORM

### 3. Migrations
- Use a migration tool (e.g., Prisma Migrate, Knex, Alembic)
- Version control all migrations
- Include rollback capabilities

### 4. Data Validation
- Implement validation at multiple levels:
  - Database constraints (NOT NULL, UNIQUE, CHECK)
  - Application-level validation (Joi, Yup, Zod)
  - API input validation middleware

### 5. Soft Deletes
Consider adding soft delete support for important entities:
```typescript
{
  deletedAt: TIMESTAMP NULL,
  isDeleted: BOOLEAN DEFAULT false
}
```

**Entities to implement soft deletes:**
- Users (for data retention/compliance)
- Properties
- Leases (for historical records)
- Payments (for audit trail)
- Messages

### 6. Audit Trail
Implement audit logging for sensitive operations:
- Payment transactions
- Lease modifications
- Property changes
- User role changes

### 7. Data Archival
Plan for archiving old data:
- Completed maintenance requests (after 2 years)
- Old messages (after 1 year)
- Expired leases (after 7 years for legal compliance)
- Activity logs (after 90 days)

### 8. Caching Strategy
Implement caching for:
- User profile data (Redis)
- Property listings (Redis)
- Dashboard aggregations (Redis with TTL)
- Notification counts (Redis)

### 9. File Storage
For documents and images:
- **Option 1:** AWS S3 / Azure Blob Storage
- **Option 2:** Cloudinary (for images)
- Store only URLs in database
- Implement CDN for faster delivery

### 10. Security Considerations

#### Sensitive Data Encryption
Encrypt sensitive fields:
- `passwordHash`: Use bcrypt or Argon2
- SSN, banking info: Encrypt at rest
- API keys/tokens: Store hashed

#### Row-Level Security
Implement row-level security to ensure:
- Landlords can only access their properties
- Tenants can only access their own data
- Messages are only visible to sender/receiver

#### Input Sanitization
- Sanitize all user inputs
- Use parameterized queries (prevent SQL injection)
- Validate file uploads (size, type, malware scan)

### 11. Scheduled Jobs

Implement cron jobs or background workers for:

**Daily Tasks:**
- Check for overdue payments → create notifications
- Check for lease expirations → create warnings
- Update payment statuses
- Generate daily activity summaries

**Weekly Tasks:**
- Send payment reminders (7 days before due)
- Maintenance request follow-ups
- Weekly reports for landlords

**Monthly Tasks:**
- Generate monthly revenue reports
- Archive old data
- Performance analytics

### 12. Database Triggers

Consider implementing triggers for:

```sql
-- Auto-update updatedAt timestamp
CREATE TRIGGER update_timestamp
BEFORE UPDATE ON properties
FOR EACH ROW
EXECUTE FUNCTION update_modified_timestamp();

-- Auto-calculate occupiedUnits when lease changes
CREATE TRIGGER update_property_occupancy
AFTER INSERT OR UPDATE OR DELETE ON leases
FOR EACH ROW
EXECUTE FUNCTION recalculate_property_occupancy();

-- Create notification on new maintenance request
CREATE TRIGGER notify_landlord_maintenance
AFTER INSERT ON maintenance_requests
FOR EACH ROW
EXECUTE FUNCTION create_maintenance_notification();
```

### 13. Data Seeding

Create seed data for development:
- Sample users (landlords and tenants)
- Sample properties with units
- Sample leases
- Sample payments (some overdue, some paid)
- Sample maintenance requests
- Sample messages

### 14. Testing Data

Maintain separate test database with:
- Anonymized production-like data
- Edge cases (expired leases, overdue payments)
- Performance test data (large datasets)

---

## Implementation Phases

### Phase 1: Foundation (Weeks 1-2)
- [ ] Set up database (PostgreSQL)
- [ ] Configure ORM/migrations
- [ ] Implement User model and authentication
- [ ] Implement UserSettings model
- [ ] Set up file storage (S3/Cloudinary)

### Phase 2: Core Entities (Weeks 3-4)
- [ ] Implement Property model
- [ ] Implement Unit model
- [ ] Implement Lease model
- [ ] Set up relationships and constraints
- [ ] Create seed data

### Phase 3: Transactions (Weeks 5-6)
- [ ] Implement Payment model
- [ ] Integrate payment gateway (Stripe)
- [ ] Implement payment notifications
- [ ] Set up scheduled payment checks

### Phase 4: Operations (Weeks 7-8)
- [ ] Implement MaintenanceRequest model
- [ ] Implement MaintenanceUpdate model
- [ ] Implement status tracking
- [ ] Set up maintenance notifications

### Phase 5: Communication (Week 9)
- [ ] Implement Message model
- [ ] Implement Notification model
- [ ] Set up real-time messaging (WebSocket)
- [ ] Implement notification delivery

### Phase 6: Analytics & Reporting (Week 10)
- [ ] Implement ActivityLog model
- [ ] Implement Document model
- [ ] Create aggregation queries for dashboards
- [ ] Set up reporting endpoints

### Phase 7: Optimization (Week 11-12)
- [ ] Add database indexes
- [ ] Implement caching
- [ ] Set up monitoring
- [ ] Performance testing and optimization
- [ ] Security audit

---

## SQL Schema Generation

### Example: Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('landlord', 'tenant', 'admin')),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  address VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(50),
  zip_code VARCHAR(10),
  avatar_url VARCHAR(500),
  is_email_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  last_login_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Example: Properties Table
```sql
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  landlord_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(50) NOT NULL,
  zip_code VARCHAR(10) NOT NULL,
  country VARCHAR(50) DEFAULT 'USA',
  property_type VARCHAR(50) NOT NULL CHECK (property_type IN ('apartment', 'house', 'condo', 'townhouse', 'commercial')),
  total_units INTEGER NOT NULL DEFAULT 1,
  occupied_units INTEGER NOT NULL DEFAULT 0,
  year_built INTEGER,
  square_feet INTEGER,
  description TEXT,
  amenities TEXT[],
  images TEXT[],
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'maintenance')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT valid_occupancy CHECK (occupied_units <= total_units)
);
```

---

## Data Validation Rules

### User
- Email: Valid email format, unique
- Password: Min 8 characters, mix of upper/lower/numbers
- Phone: Valid phone format (E.164)
- Role: Must be valid enum value

### Property
- totalUnits: Must be >= 1
- occupiedUnits: Must be <= totalUnits
- yearBuilt: Must be between 1800 and current year

### Lease
- leaseEndDate: Must be after leaseStartDate
- monthlyRent: Must be > 0
- securityDeposit: Must be >= 0
- paymentDueDay: Must be between 1 and 31

### Payment
- amount: Must be > 0
- dueDate: Required
- paidDate: Must be <= current date if paid

### MaintenanceRequest
- title: Required, min 5 characters
- description: Required, min 10 characters
- priority: Must be valid enum value
- status: Must be valid enum value

---

**Document Version:** 1.0  
**Last Updated:** November 9, 2025  
**Maintainer:** Backend Development Team  
**Database:** PostgreSQL 14+

