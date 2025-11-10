# Backend Data Schema Plan

This document outlines the database models, relationships, and schema design needed to support the Property Management application frontend using MongoDB. This schema is derived from the frontend data requirements and follows MongoDB best practices for document design and embedded vs referenced data.

## Table of Contents
1. [Entity Relationship Overview](#entity-relationship-overview)
2. [Core Collections](#core-collections)
3. [Embedded vs Referenced Data](#embedded-vs-referenced-data)
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

## Core Collections

### 1. User Collection

**Collection Name:** `users`

**Description:** Core user authentication and profile data for all user types.

**Schema:**
```typescript
{
  _id: ObjectId,
  email: String (unique, required),
  passwordHash: String (required),
  role: String (enum: ['landlord', 'tenant', 'admin'], required),
  firstName: String (required),
  lastName: String (required),
  phone: String,
  address: String,
  city: String,
  state: String,
  zipCode: String,
  avatarUrl: String,
  isEmailVerified: Boolean (default: false),
  isActive: Boolean (default: true),
  lastLoginAt: Date,
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now)
}
```

**Indexes:**
- Unique index on `email`
- Index on `role`
- Index on `isActive`
- Index on `createdAt`

**Relationships:**
- Has many: Properties (if landlord)
- Has many: Leases (if tenant)
- Has many: Messages (sent and received)
- Has many: Notifications
- Has one: UserSettings

---

### 2. Property Collection

**Collection Name:** `properties`

**Description:** Represents rental properties owned by landlords.

**Schema:**
```typescript
{
  _id: ObjectId,
  landlordId: ObjectId (ref: 'User', required),
  name: String (required),
  address: String (required),
  city: String (required),
  state: String (required),
  zipCode: String (required),
  country: String (default: 'USA'),
  propertyType: String (enum: ['apartment', 'house', 'condo', 'townhouse', 'commercial'], required),
  totalUnits: Number (required, default: 1),
  occupiedUnits: Number (required, default: 0),
  yearBuilt: Number,
  squareFeet: Number,
  description: String,
  amenities: [String],
  images: [String],
  status: String (enum: ['active', 'inactive', 'maintenance'], default: 'active'),
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now)
}
```

**Indexes:**
- Index on `landlordId`
- Index on `status`
- Compound index on `city, state` (for location searches)
- Text index on `name, address, city` (for search)

**Relationships:**
- Belongs to: User (landlord)
- Has many: Units
- Has many: Leases
- Has many: MaintenanceRequests

**Computed Fields:**
- `occupancyRate`: (occupiedUnits / totalUnits) * 100
- `vacantUnits`: totalUnits - occupiedUnits

---

### 3. Unit Collection

**Collection Name:** `units`

**Description:** Individual units within a property (for multi-unit properties).

**Schema:**
```typescript
{
  _id: ObjectId,
  propertyId: ObjectId (ref: 'Property', required),
  unitNumber: String (required),
  floor: Number,
  bedrooms: Number (required),
  bathrooms: Number (required),
  squareFeet: Number,
  monthlyRent: Number (required),
  securityDeposit: Number,
  status: String (enum: ['available', 'occupied', 'maintenance', 'reserved'], default: 'available'),
  description: String,
  features: [String],
  images: [String],
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now)
}
```

**Indexes:**
- Index on `propertyId`
- Index on `status`
- Compound unique index on `propertyId, unitNumber`

**Relationships:**
- Belongs to: Property
- Has many: Leases
- Has many: MaintenanceRequests

---

### 4. Lease Collection

**Collection Name:** `leases`

**Description:** Lease agreements between landlords and tenants.

**Schema:**
```typescript
{
  _id: ObjectId,
  propertyId: ObjectId (ref: 'Property', required),
  unitId: ObjectId (ref: 'Unit'),
  tenantId: ObjectId (ref: 'User', required),
  landlordId: ObjectId (ref: 'User', required),
  leaseStartDate: Date (required),
  leaseEndDate: Date (required),
  monthlyRent: Number (required),
  securityDeposit: Number (required),
  securityDepositPaid: Boolean (default: false),
  paymentDueDay: Number (required, default: 1), // Day of month (1-31)
  status: String (enum: ['draft', 'active', 'expiring_soon', 'expired', 'terminated', 'renewed'], default: 'draft'),
  leaseType: String (enum: ['fixed', 'month_to_month'], default: 'fixed'),
  terms: String,
  documentUrl: String,
  notes: String,
  terminationDate: Date,
  terminationReason: String,
  renewedToLeaseId: ObjectId (ref: 'Lease'),
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now)
}
```

**Indexes:**
- Index on `tenantId`
- Index on `landlordId`
- Index on `propertyId`
- Index on `unitId`
- Index on `status`
- Index on `leaseEndDate` (for expiration notifications)
- Compound index on `tenantId, status`

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

### 5. Payment Collection

**Collection Name:** `payments`

**Description:** Rent and other payments made by tenants.

**Schema:**
```typescript
{
  _id: ObjectId,
  leaseId: ObjectId (ref: 'Lease', required),
  tenantId: ObjectId (ref: 'User', required),
  landlordId: ObjectId (ref: 'User', required),
  amount: Number (required),
  dueDate: Date (required),
  paidDate: Date,
  status: String (enum: ['pending', 'paid', 'partial', 'overdue', 'failed', 'refunded'], default: 'pending'),
  paymentType: String (enum: ['rent', 'security_deposit', 'late_fee', 'utility', 'other'], default: 'rent'),
  paymentMethod: String,
  transactionId: String (unique),
  stripePaymentIntentId: String,
  amountPaid: Number (default: 0),
  lateFee: Number (default: 0),
  notes: String,
  receiptUrl: String,
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now)
}
```

**Indexes:**
- Index on `leaseId`
- Index on `tenantId`
- Index on `landlordId`
- Index on `status`
- Index on `dueDate`
- Unique index on `transactionId`
- Compound index on `tenantId, status`
- Compound index on `tenantId, dueDate`

**Relationships:**
- Belongs to: Lease
- Belongs to: User (tenant)
- Belongs to: User (landlord)

**Triggers/Hooks:**
- On create: Create notification for tenant
- On status change to 'overdue': Send overdue notification
- On status change to 'paid': Update lease payment status

---

### 6. MaintenanceRequest Collection

**Collection Name:** `maintenance_requests`

**Description:** Maintenance and repair requests for properties.

**Schema:**
```typescript
{
  _id: ObjectId,
  propertyId: ObjectId (ref: 'Property', required),
  unitId: ObjectId (ref: 'Unit'),
  tenantId: ObjectId (ref: 'User', required),
  landlordId: ObjectId (ref: 'User', required),
  assignedToId: ObjectId (ref: 'User'),
  title: String (required),
  description: String (required),
  category: String (enum: ['plumbing', 'electrical', 'hvac', 'appliance', 'structural', 'pest', 'other'], required),
  priority: String (enum: ['low', 'medium', 'high', 'urgent'], default: 'medium'),
  status: String (enum: ['pending', 'in_progress', 'scheduled', 'completed', 'cancelled'], default: 'pending'),
  images: [String],
  scheduledDate: Date,
  completedDate: Date,
  estimatedCost: Number,
  actualCost: Number,
  notes: String,
  resolutionNotes: String,
  permissionToEnter: Boolean (default: false),
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now)
}
```

**Indexes:**
- Index on `propertyId`
- Index on `unitId`
- Index on `tenantId`
- Index on `landlordId`
- Index on `assignedToId`
- Index on `status`
- Index on `priority`
- Index on `createdAt` (for sorting)
- Compound index on `landlordId, status`
- Text index on `title, description` (for search)

**Relationships:**
- Belongs to: Property
- Belongs to: Unit
- Belongs to: User (tenant)
- Belongs to: User (landlord)
- Belongs to: User (assigned worker)
- Has many: MaintenanceUpdates

---

### 7. MaintenanceUpdate Collection

**Collection Name:** `maintenance_updates`

**Description:** Status updates and comments on maintenance requests.

**Schema:**
```typescript
{
  _id: ObjectId,
  requestId: ObjectId (ref: 'MaintenanceRequest', required),
  userId: ObjectId (ref: 'User', required),
  updateType: String (enum: ['status_change', 'comment', 'cost_update', 'scheduled'], required),
  previousStatus: String,
  newStatus: String,
  comment: String,
  images: [String],
  createdAt: Date (default: Date.now)
}
```

**Indexes:**
- Index on `requestId`
- Index on `userId`
- Index on `createdAt`

**Relationships:**
- Belongs to: MaintenanceRequest
- Belongs to: User

---

### 8. Message Collection

**Collection Name:** `messages`

**Description:** Direct messages between users (landlords and tenants).

**Schema:**
```typescript
{
  _id: ObjectId,
  senderId: ObjectId (ref: 'User', required),
  receiverId: ObjectId (ref: 'User', required),
  propertyId: ObjectId (ref: 'Property'),
  leaseId: ObjectId (ref: 'Lease'),
  subject: String,
  content: String (required),
  isRead: Boolean (default: false),
  readAt: Date,
  parentMessageId: ObjectId (ref: 'Message'),
  attachments: [String],
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now)
}
```

**Indexes:**
- Index on `senderId`
- Index on `receiverId`
- Index on `propertyId`
- Index on `leaseId`
- Compound index on `receiverId, isRead`
- Index on `createdAt`
- Text index on `subject, content` (for search)

**Relationships:**
- Belongs to: User (sender)
- Belongs to: User (receiver)
- Belongs to: Property (optional)
- Belongs to: Lease (optional)
- Self-referential: parentMessageId (for threads)

---

### 9. Notification Collection

**Collection Name:** `notifications`

**Description:** System notifications for users.

**Schema:**
```typescript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User', required),
  type: String (enum: ['payment', 'maintenance', 'message', 'lease', 'system', 'reminder'], required),
  title: String (required),
  content: String (required),
  relatedEntityType: String,
  relatedEntityId: ObjectId,
  actionUrl: String,
  isRead: Boolean (default: false),
  readAt: Date,
  priority: String (enum: ['low', 'medium', 'high'], default: 'medium'),
  expiresAt: Date,
  createdAt: Date (default: Date.now)
}
```

**Indexes:**
- Index on `userId`
- Index on `type`
- Compound index on `userId, isRead`
- Index on `createdAt`
- Index on `expiresAt` (for cleanup)

**Relationships:**
- Belongs to: User

---

### 10. Document Collection

**Collection Name:** `documents`

**Description:** Store documents like leases, receipts, reports.

**Schema:**
```typescript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User', required),
  propertyId: ObjectId (ref: 'Property'),
  leaseId: ObjectId (ref: 'Lease'),
  documentType: String (enum: ['lease', 'receipt', 'report', 'identification', 'other'], required),
  title: String (required),
  description: String,
  fileUrl: String (required),
  fileType: String,
  fileSize: Number,
  uploadedBy: ObjectId (ref: 'User', required),
  isPublic: Boolean (default: false),
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now)
}
```

**Indexes:**
- Index on `userId`
- Index on `propertyId`
- Index on `leaseId`
- Index on `documentType`
- Index on `uploadedBy`
- Compound index on `userId, documentType`

**Relationships:**
- Belongs to: User (owner)
- Belongs to: Property (optional)
- Belongs to: Lease (optional)
- Belongs to: User (uploader)

---

### 11. UserSettings Collection

**Collection Name:** `user_settings`

**Description:** User preferences and settings (embedded in User document or separate collection).

**Schema:**
```typescript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User', unique, required),
  // Notification Preferences
  emailNotifications: Boolean (default: true),
  smsNotifications: Boolean (default: false),
  paymentReminders: Boolean (default: true),
  maintenanceUpdates: Boolean (default: true),
  messageNotifications: Boolean (default: true),
  leaseExpirationReminders: Boolean (default: true),
  // Display Preferences
  darkMode: Boolean (default: false),
  language: String (default: 'en'),
  timezone: String (default: 'UTC'),
  dateFormat: String (default: 'MM/DD/YYYY'),
  // Tenant-specific
  autoPayRent: Boolean (default: false),
  autoPayDay: Number,
  // Landlord-specific
  defaultPaymentDueDay: Number (default: 1),
  requireDepositOnBooking: Boolean (default: true),
  // General
  twoFactorEnabled: Boolean (default: false),
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now)
}
```

**Indexes:**
- Unique index on `userId`

**Note:** Consider embedding this directly in the User document for better performance.

**Relationships:**
- Belongs to: User (one-to-one)

---

### 12. ActivityLog Collection

**Collection Name:** `activity_logs`

**Description:** Track user activities for audit trail and recent activity feeds.

**Schema:**
```typescript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User', required),
  activityType: String (enum: ['login', 'payment', 'maintenance', 'message', 'lease', 'profile_update', 'property_update'], required),
  entityType: String,
  entityId: ObjectId,
  description: String (required),
  metadata: Object,
  ipAddress: String,
  userAgent: String,
  createdAt: Date (default: Date.now)
}
```

**Indexes:**
- Index on `userId`
- Index on `activityType`
- Index on `createdAt`
- Compound index on `userId, createdAt`
- TTL index on `createdAt` (expires after 90 days)

**Relationships:**
- Belongs to: User

---

## Embedded vs Referenced Data

MongoDB provides flexibility in structuring data through embedding or referencing. Here's the recommended approach for this application:

### Embedded Documents

**When to Embed:**
- Data is always accessed together with the parent
- Data doesn't need to be queried independently
- One-to-few relationships
- Data changes infrequently

**Recommended Embeddings:**

1. **User Settings in User Document** (Optional)
```typescript
{
  _id: ObjectId,
  email: String,
  // ... other user fields
  settings: {
    emailNotifications: Boolean,
    darkMode: Boolean,
    // ... other settings
  }
}
```

2. **Property Amenities** (Already embedded as array)
```typescript
amenities: ['parking', 'pool', 'gym']
```

3. **Maintenance Updates** (Consider embedding in MaintenanceRequest for small datasets)
```typescript
{
  _id: ObjectId,
  title: String,
  // ... other fields
  updates: [
    {
      userId: ObjectId,
      comment: String,
      createdAt: Date
    }
  ]
}
```

### Referenced Documents

**When to Reference:**
- Data is accessed independently
- Data is shared across documents
- One-to-many or many-to-many relationships
- Data changes frequently
- Document size would exceed 16MB limit

**All main collections use references** for relationships like:
- Property → Landlord (userId)
- Lease → Tenant, Landlord, Property
- Payment → Lease, Tenant
- Message → Sender, Receiver

### PropertyTenant Collection (for historical tracking)

**Collection Name:** `property_tenants`

**Description:** Track tenant history at properties (many-to-many).

**Schema:**
```typescript
{
  _id: ObjectId,
  propertyId: ObjectId (ref: 'Property', required),
  tenantId: ObjectId (ref: 'User', required),
  moveInDate: Date (required),
  moveOutDate: Date,
  isCurrentTenant: Boolean (default: true),
  createdAt: Date (default: Date.now)
}
```

**Indexes:**
- Index on `propertyId`
- Index on `tenantId`
- Compound index on `propertyId, tenantId`
- Index on `isCurrentTenant`

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

MongoDB indexes using Mongoose schema syntax:

```javascript
// User Collection
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });
userSchema.index({ createdAt: 1 });

// Property Collection
propertySchema.index({ landlordId: 1 });
propertySchema.index({ city: 1, state: 1 });
propertySchema.index({ status: 1 });
propertySchema.index({ landlordId: 1, status: 1 });

// Unit Collection
unitSchema.index({ propertyId: 1 });
unitSchema.index({ status: 1 });
unitSchema.index({ propertyId: 1, unitNumber: 1 }, { unique: true });

// Lease Collection
leaseSchema.index({ tenantId: 1 });
leaseSchema.index({ landlordId: 1 });
leaseSchema.index({ propertyId: 1 });
leaseSchema.index({ status: 1 });
leaseSchema.index({ leaseEndDate: 1 });
leaseSchema.index({ tenantId: 1, status: 1 });

// Payment Collection
paymentSchema.index({ leaseId: 1 });
paymentSchema.index({ tenantId: 1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ dueDate: 1 });
paymentSchema.index({ transactionId: 1 }, { unique: true, sparse: true });
paymentSchema.index({ tenantId: 1, status: 1 });
paymentSchema.index({ tenantId: 1, dueDate: 1 });

// MaintenanceRequest Collection
maintenanceRequestSchema.index({ propertyId: 1 });
maintenanceRequestSchema.index({ tenantId: 1 });
maintenanceRequestSchema.index({ landlordId: 1 });
maintenanceRequestSchema.index({ status: 1 });
maintenanceRequestSchema.index({ priority: 1 });
maintenanceRequestSchema.index({ createdAt: -1 });
maintenanceRequestSchema.index({ landlordId: 1, status: 1 });

// MaintenanceUpdate Collection
maintenanceUpdateSchema.index({ requestId: 1 });
maintenanceUpdateSchema.index({ userId: 1 });
maintenanceUpdateSchema.index({ createdAt: -1 });

// Message Collection
messageSchema.index({ senderId: 1 });
messageSchema.index({ receiverId: 1 });
messageSchema.index({ receiverId: 1, isRead: 1 });
messageSchema.index({ createdAt: -1 });

// Notification Collection
notificationSchema.index({ userId: 1 });
notificationSchema.index({ userId: 1, isRead: 1 });
notificationSchema.index({ createdAt: -1 });
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index

// Document Collection
documentSchema.index({ userId: 1 });
documentSchema.index({ propertyId: 1 });
documentSchema.index({ leaseId: 1 });
documentSchema.index({ documentType: 1 });
documentSchema.index({ userId: 1, documentType: 1 });

// ActivityLog Collection
activityLogSchema.index({ userId: 1 });
activityLogSchema.index({ activityType: 1 });
activityLogSchema.index({ createdAt: -1 });
activityLogSchema.index({ userId: 1, createdAt: -1 });
activityLogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7776000 }); // TTL: 90 days

// PropertyTenant Collection
propertyTenantSchema.index({ propertyId: 1 });
propertyTenantSchema.index({ tenantId: 1 });
propertyTenantSchema.index({ propertyId: 1, tenantId: 1 });
propertyTenantSchema.index({ isCurrentTenant: 1 });
```

### Text Search Indexes

MongoDB text indexes for full-text search:

```javascript
// Property Collection - Text Search
propertySchema.index({
  name: 'text',
  address: 'text',
  city: 'text',
  description: 'text'
});

// MaintenanceRequest Collection - Text Search
maintenanceRequestSchema.index({
  title: 'text',
  description: 'text'
});

// Message Collection - Text Search
messageSchema.index({
  subject: 'text',
  content: 'text'
});
```

### Geospatial Indexes (Optional)

For location-based queries on properties:

```javascript
// Add to Property schema
propertySchema.add({
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      index: '2dsphere'
    }
  }
});
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

### Tenant Dashboard Response
```json
{
  "success": true,
  "data": {
    "tenant": {
      "firstName": "string"
    },
    "rentStatus": {
      "status": "Paid" | "Pending" | "Overdue",
      "amount": "number",
      "lastPaidDate": "ISO 8601 datetime",
      "nextDueDate": "ISO 8601 datetime",
      "daysUntilDue": "number"
    },
    "maintenance": {
      "activeCount": "number",
      "requests": [
        {
          "id": "UUID",
          "title": "string",
          "status": "string",
          "statusColor": "string",
          "date": "ISO 8601 datetime"
        }
      ]
    },
    "messages": {
      "unreadCount": "number",
      "latest": {
        "from": "string",
        "preview": "string",
        "date": "ISO 8601 datetime"
      } | null
    },
    "property": {
      "name": "string",
      "address": "string",
      "monthlyRent": "number",
      "leaseEnd": "string",
      "securityDeposit": "number",
      "landlord": {
        "name": "string",
        "fullName": "string",
        "avatar": {
          "name": "string",
          "bg": "string"
        }
      }
    },
    "recentActivity": [
      {
        "icon": "string",
        "color": "string",
        "title": "string",
        "date": "ISO 8601 datetime"
      }
    ]
  },
  "timestamp": "2024-12-15T10:30:00Z"
}
```

**Notes:**
- The dashboard response aggregates data from multiple models (Lease, Payment, MaintenanceRequest, Message)
- `rentStatus.amount` should come from the most recent Payment record
- `maintenance.requests` should be sorted by date descending, limited to most recent active requests
- `messages.latest` should be the most recent unread message or null if none exist
- All currency values should be returned as numbers (backend handles formatting)

### Maintenance Requests Response
```json
{
  "success": true,
  "data": [
    {
      "id": "UUID",
      "propertyId": "UUID",
      "unitId": "UUID | null",
      "tenantId": "UUID",
      "landlordId": "UUID",
      "assignedToId": "UUID | null",
      "title": "string",
      "description": "string",
      "category": "plumbing" | "electrical" | "hvac" | "appliance" | "structural" | "pest" | "other",
      "priority": "low" | "medium" | "high" | "urgent",
      "status": "pending" | "in_progress" | "scheduled" | "completed" | "cancelled",
      "images": ["string"],
      "scheduledDate": "ISO 8601 datetime | null",
      "completedDate": "ISO 8601 datetime | null",
      "estimatedCost": "number | null",
      "actualCost": "number | null",
      "notes": "string | null",
      "resolutionNotes": "string | null",
      "permissionToEnter": "boolean",
      "assignedTo": {
        "id": "UUID",
        "name": "string",
        "avatarUrl": "string | null",
        "avatarBg": "string"
      } | null,
      "createdAt": "ISO 8601 datetime",
      "updatedAt": "ISO 8601 datetime"
    }
  ],
  "timestamp": "2024-12-15T10:30:00Z"
}
```

### Create Maintenance Request
```json
{
  "success": true,
  "data": {
    "id": "UUID",
    "title": "string",
    "description": "string",
    "category": "string",
    "priority": "string",
    "status": "pending",
    "permissionToEnter": "boolean",
    "createdAt": "ISO 8601 datetime"
  },
  "message": "Maintenance request submitted successfully",
  "timestamp": "2024-12-15T10:30:00Z"
}
```

**Notes:**
- Maintenance requests should be filterable by status, priority, and category
- Support search by title and description
- Assigned worker information should be included when available
- Images array contains URLs to uploaded photos of the issue
- `permissionToEnter` indicates if tenant allows entry when not home

---

### Payment Balance Response
```json
{
  "success": true,
  "data": {
    "amount": 1250.00,
    "dueDate": "2025-01-01T00:00:00Z",
    "lateFee": 0,
    "status": "pending",
    "tenantId": "UUID",
    "propertyId": "UUID",
    "leaseId": "UUID"
  },
  "timestamp": "2024-12-15T10:30:00Z"
}
```

### Payment History Response
```json
{
  "success": true,
  "data": {
    "payments": [
      {
        "id": "UUID",
        "tenantId": "UUID",
        "propertyId": "UUID",
        "leaseId": "UUID",
        "amount": 1250.00,
        "lateFee": 0,
        "totalAmount": 1250.00,
        "dueDate": "2024-12-01T00:00:00Z",
        "paidDate": "2024-11-28T14:30:00Z",
        "status": "paid",
        "paymentMethod": "credit_card",
        "transactionId": "TXN-20241128-001",
        "receiptUrl": "https://storage.example.com/receipts/txn-20241128-001.pdf",
        "notes": "string | null",
        "createdAt": "2024-11-28T14:30:00Z",
        "updatedAt": "2024-11-28T14:30:00Z"
      }
    ],
    "stats": {
      "totalPaid": 15000.00,
      "onTimePayments": 12,
      "latePayments": 0,
      "averagePaymentDay": 28,
      "nextDueDate": "2025-01-01T00:00:00Z",
      "nextDueAmount": 1250.00
    },
    "pagination": {
      "page": 1,
      "limit": 12,
      "totalPages": 1,
      "totalItems": 4
    }
  },
  "timestamp": "2024-12-15T10:30:00Z"
}
```

### Process Payment Request
```json
POST /api/payments
{
  "amount": 1250.00,
  "paymentMethod": "credit_card",
  "paymentDetails": {
    "cardNumber": "4242424242424242",
    "cardName": "John Doe",
    "expiryDate": "12/25",
    "cvv": "123"
  },
  "leaseId": "UUID",
  "notes": "string | null"
}
```

### Process Payment Response
```json
{
  "success": true,
  "data": {
    "id": "UUID",
    "transactionId": "TXN-20241215-001",
    "amount": 1250.00,
    "status": "completed",
    "paymentMethod": "credit_card",
    "receiptUrl": "https://storage.example.com/receipts/txn-20241215-001.pdf",
    "paidDate": "2024-12-15T10:30:00Z"
  },
  "message": "Payment processed successfully",
  "timestamp": "2024-12-15T10:30:00Z"
}
```

### Payment Receipt Response
```
GET /api/payments/:id/receipt
Response: PDF file (Content-Type: application/pdf)
```

**Notes:**
- Payment status can be: `pending`, `paid`, `overdue`, `partial`, `failed`, `refunded`
- Payment methods: `credit_card`, `debit_card`, `bank_transfer`, `ach`, `mobile_payment`, `cash`, `check`
- Transaction IDs should be unique and generated server-side
- Receipt generation should happen asynchronously
- Late fees should be calculated based on landlord's late fee policy
- Support filtering by date range, status, and payment method
- Payment security: card details should never be stored; use payment gateway tokenization
- Failed payments should trigger notification to tenant
- Successful payments should update lease balance and trigger receipt generation

---

### Inspections Response
```json
{
  "success": true,
  "data": [
    {
      "id": "UUID",
      "propertyId": "UUID",
      "unitId": "UUID | null",
      "tenantId": "UUID",
      "landlordId": "UUID",
      "inspectorId": "UUID | null",
      "type": "move_in" | "move_out" | "routine" | "maintenance" | "safety",
      "scheduledDate": "ISO 8601 datetime",
      "completedDate": "ISO 8601 datetime | null",
      "status": "scheduled" | "completed" | "pending" | "cancelled" | "failed",
      "notes": "string | null",
      "issues": "number | null",
      "reportUrl": "string | null",
      "inspector": {
        "id": "UUID",
        "name": "string",
        "email": "string",
        "phone": "string",
        "avatarUrl": "string | null",
        "avatarBg": "string"
      } | null,
      "createdAt": "ISO 8601 datetime",
      "updatedAt": "ISO 8601 datetime"
    }
  ],
  "timestamp": "2024-12-15T10:30:00Z"
}
```

### Schedule Inspection Request
```json
POST /api/inspections
{
  "propertyId": "UUID",
  "unitId": "UUID | null",
  "type": "move_in" | "move_out" | "routine" | "maintenance" | "safety",
  "scheduledDate": "ISO 8601 datetime",
  "notes": "string | null"
}
```

### Schedule Inspection Response
```json
{
  "success": true,
  "data": {
    "id": "UUID",
    "type": "string",
    "scheduledDate": "ISO 8601 datetime",
    "status": "scheduled",
    "notes": "string | null",
    "createdAt": "ISO 8601 datetime"
  },
  "message": "Inspection scheduled successfully",
  "timestamp": "2024-12-15T10:30:00Z"
}
```

### Reschedule Inspection
```json
PUT /api/inspections/:id
{
  "scheduledDate": "ISO 8601 datetime",
  "notes": "string | null"
}

Response: Same as Schedule Inspection Response
```

### Cancel Inspection
```json
DELETE /api/inspections/:id
Or: PUT /api/inspections/:id/cancel

Response:
{
  "success": true,
  "message": "Inspection cancelled successfully",
  "timestamp": "2024-12-15T10:30:00Z"
}
```

### Inspection Report Response
```
GET /api/inspections/:id/report
Response: PDF file (Content-Type: application/pdf) or JSON report data
```

**Notes:**
- Inspection types: `move_in`, `move_out`, `routine`, `maintenance`, `safety`
- Inspection status: `scheduled`, `completed`, `pending`, `cancelled`, `failed`
- Support filtering by status, type, and date range
- Inspector assignment can be automatic or manual
- Issues field tracks number of problems found during inspection
- Report generation should happen after inspection completion
- Notifications should be sent 24 hours before scheduled inspection
- Inspections can be rescheduled up to 2 hours before scheduled time
- Completed inspections should include issue count and report URL
- Inspector information includes contact details for coordination

---

## Implementation Notes

### 1. Database Choice
**Selected:** MongoDB
- Flexible schema design for evolving requirements
- Native JSON document storage
- Excellent for rapid development
- Powerful aggregation framework
- Horizontal scaling capabilities
- Built-in replication and sharding

**Version:** MongoDB 5.0+ (for better transaction support)

### 2. ODM (Object Document Mapper)
**Recommended:** 
- **Node.js:** Mongoose (primary choice)
  - Schema validation
  - Middleware support
  - Virtual properties
  - Population (JOIN-like functionality)
  - Built-in validation
  
**Alternative:** Prisma (supports MongoDB from v4+)
- Type-safe queries
- Auto-generated TypeScript types
- Migration support

### 3. Migrations
MongoDB is schema-less, but structured migrations are still valuable:

**Approach:**
- Use migrate-mongo or custom migration scripts
- Version control all migration files
- Handle data transformations during schema changes
- Test migrations on staging before production

**Example migration structure:**
```javascript
// migrations/20250110-add-inspection-model.js
module.exports = {
  async up(db) {
    await db.createCollection('inspections');
    await db.collection('inspections').createIndex({ propertyId: 1 });
  },
  
  async down(db) {
    await db.collection('inspections').drop();
  }
};
```

### 4. Data Validation
Implement validation at multiple levels:

**MongoDB Schema Validation:**
```javascript
db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['email', 'passwordHash', 'role'],
      properties: {
        email: { bsonType: 'string' },
        role: { enum: ['landlord', 'tenant', 'admin'] }
      }
    }
  }
});
```

**Application-level validation:**
- Mongoose schema validation (built-in)
- Additional validation libraries (Joi, Yup, Zod)
- API input validation middleware (express-validator)

### 5. Soft Deletes
Implement soft delete support using Mongoose plugins or custom fields:

```javascript
// Using mongoose-delete plugin
const mongooseDelete = require('mongoose-delete');

const propertySchema = new Schema({
  // ... fields
});

propertySchema.plugin(mongooseDelete, { 
  deletedAt: true,
  overrideMethods: 'all'
});

// Or manual implementation
const propertySchema = new Schema({
  // ... fields
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null }
});
```

**Collections to implement soft deletes:**
- Users (for data retention/compliance)
- Properties
- Leases (for historical records)
- Payments (for audit trail)
- Messages

### 6. Audit Trail
Implement audit logging using:

**Mongoose Middleware:**
```javascript
propertySchema.pre('save', function(next) {
  if (this.isModified()) {
    ActivityLog.create({
      userId: this.modifiedBy,
      activityType: 'property_update',
      entityType: 'property',
      entityId: this._id,
      description: `Property ${this.name} updated`,
      metadata: this.modifiedPaths()
    });
  }
  next();
});
```

**Track operations:**
- Payment transactions
- Lease modifications
- Property changes
- User role changes

### 7. Data Archival
Use MongoDB TTL indexes and archival strategies:

**TTL Indexes for automatic cleanup:**
```javascript
// Activity logs expire after 90 days
activityLogSchema.index(
  { createdAt: 1 }, 
  { expireAfterSeconds: 7776000 }
);

// Expired notifications cleanup
notificationSchema.index(
  { expiresAt: 1 }, 
  { expireAfterSeconds: 0 }
);
```

**Manual archival to separate collections:**
- Move completed maintenance requests to `maintenance_requests_archive`
- Archive old messages to `messages_archive`
- Keep expired leases for 7 years (legal compliance)
- Use MongoDB aggregation pipelines for batch archival

### 8. Caching Strategy
Implement multi-layer caching:

**Redis for hot data:**
```javascript
// User profile caching
const getUserProfile = async (userId) => {
  const cached = await redis.get(`user:${userId}`);
  if (cached) return JSON.parse(cached);
  
  const user = await User.findById(userId);
  await redis.setex(`user:${userId}`, 3600, JSON.stringify(user));
  return user;
};
```

**Cache strategies:**
- User profile data (TTL: 1 hour)
- Property listings (TTL: 5 minutes)
- Dashboard aggregations (TTL: 2 minutes)
- Notification counts (TTL: 30 seconds)
- Active lease data (TTL: 10 minutes)

**Cache invalidation:**
- On document update/delete
- Use Redis pub/sub for distributed cache invalidation

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

### 12. Mongoose Middleware (Hooks)

MongoDB doesn't have triggers, but Mongoose provides powerful middleware:

**Pre/Post Hooks:**
```javascript
// Auto-update updatedAt timestamp
propertySchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Auto-calculate occupiedUnits when lease changes
leaseSchema.post('save', async function(doc) {
  const occupiedCount = await Lease.countDocuments({
    propertyId: doc.propertyId,
    status: 'active'
  });
  await Property.findByIdAndUpdate(doc.propertyId, {
    occupiedUnits: occupiedCount
  });
});

// Create notification on new maintenance request
maintenanceRequestSchema.post('save', async function(doc) {
  if (doc.isNew) {
    await Notification.create({
      userId: doc.landlordId,
      type: 'maintenance',
      title: 'New Maintenance Request',
      content: `New request: ${doc.title}`,
      relatedEntityType: 'maintenance_request',
      relatedEntityId: doc._id
    });
  }
});

// Populate references automatically
maintenanceRequestSchema.pre(/^find/, function(next) {
  this.populate('assignedToId', 'firstName lastName email');
  next();
});
```

**Change Streams for Real-time Updates:**
```javascript
const changeStream = Payment.watch();

changeStream.on('change', async (change) => {
  if (change.operationType === 'update' 
      && change.updateDescription.updatedFields.status === 'overdue') {
    // Send overdue notification
    await sendOverdueNotification(change.documentKey._id);
  }
});
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

## Mongoose Schema Examples

### Example: User Schema
```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8,
    select: false // Don't return password in queries by default
  },
  role: {
    type: String,
    enum: ['landlord', 'tenant', 'admin'],
    required: true
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  phone: String,
  address: String,
  city: String,
  state: String,
  zipCode: String,
  avatarUrl: String,
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLoginAt: Date
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Indexes
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('passwordHash')) return next();
  this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.passwordHash);
};

module.exports = mongoose.model('User', userSchema);
```

### Example: Property Schema
```javascript
const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  landlordId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Landlord ID is required']
  },
  name: {
    type: String,
    required: [true, 'Property name is required'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  state: {
    type: String,
    required: [true, 'State is required'],
    trim: true
  },
  zipCode: {
    type: String,
    required: [true, 'Zip code is required']
  },
  country: {
    type: String,
    default: 'USA'
  },
  propertyType: {
    type: String,
    enum: ['apartment', 'house', 'condo', 'townhouse', 'commercial'],
    required: true
  },
  totalUnits: {
    type: Number,
    required: true,
    default: 1,
    min: [1, 'Total units must be at least 1']
  },
  occupiedUnits: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    validate: {
      validator: function(value) {
        return value <= this.totalUnits;
      },
      message: 'Occupied units cannot exceed total units'
    }
  },
  yearBuilt: {
    type: Number,
    min: 1800,
    max: new Date().getFullYear()
  },
  squareFeet: Number,
  description: String,
  amenities: [String],
  images: [String],
  status: {
    type: String,
    enum: ['active', 'inactive', 'maintenance'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Indexes
propertySchema.index({ landlordId: 1 });
propertySchema.index({ city: 1, state: 1 });
propertySchema.index({ status: 1 });
propertySchema.index({ landlordId: 1, status: 1 });

// Text search index
propertySchema.index({
  name: 'text',
  address: 'text',
  city: 'text',
  description: 'text'
});

// Virtual for occupancy rate
propertySchema.virtual('occupancyRate').get(function() {
  return (this.occupiedUnits / this.totalUnits) * 100;
});

// Virtual for vacant units
propertySchema.virtual('vacantUnits').get(function() {
  return this.totalUnits - this.occupiedUnits;
});

// Ensure virtuals are included in JSON
propertySchema.set('toJSON', { virtuals: true });
propertySchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Property', propertySchema);
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

**Document Version:** 2.0  
**Last Updated:** November 10, 2025  
**Maintainer:** Backend Development Team  
**Database:** MongoDB 5.0+  
**ODM:** Mongoose 7.x+

**Changelog:**
- v2.0 (Nov 10, 2025): **MAJOR UPDATE** - Migrated entire schema from PostgreSQL to MongoDB
  - Updated all schema definitions to use MongoDB/Mongoose syntax
  - Changed from SQL tables to MongoDB collections
  - Updated data types (UUID → ObjectId, VARCHAR → String, etc.)
  - Replaced SQL indexes with MongoDB indexes
  - Added embedded vs referenced data patterns
  - Updated triggers to Mongoose middleware/hooks
  - Added MongoDB-specific features (TTL indexes, Change Streams, text search)
  - Updated implementation examples with Mongoose schemas
  - Added MongoDB best practices and optimization strategies
- v1.4 (Nov 10, 2025): Added Inspections API response patterns including scheduling, rescheduling, cancellation, and inspection reports. Documented inspection types, status tracking, inspector assignment, issue tracking, and notification requirements
- v1.3 (Nov 10, 2025): Added Payments API response patterns including current balance, payment history with statistics and pagination, payment processing, and receipt generation. Documented payment security requirements, status types, and payment methods
- v1.2 (Nov 10, 2025): Added Maintenance Requests API response patterns including list view, create request, filtering, and search capabilities. Documented assignedTo relationship and permissionToEnter field
- v1.1 (Nov 10, 2025): Added Tenant Dashboard API response pattern with aggregated data from multiple models to support enhanced UI tooltips and metric cards

