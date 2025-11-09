# Frontend Data Schema Documentation

This document outlines all the data requirements for each component and page in the Property Management frontend application. This schema defines what information needs to be fetched from the backend API to populate each component.

## Table of Contents
1. [Pages](#pages)
   - [Landlord Dashboard](#landlord-dashboard)
   - [Tenant Dashboard](#tenant-dashboard)
   - [Settings Page](#settings-page)
   - [Landing Page](#landing-page)
2. [Layout Components](#layout-components)
3. [UI Components](#ui-components)
4. [API Endpoints Summary](#api-endpoints-summary)

---

## Pages

### Landlord Dashboard

**Endpoint:** `GET /api/landlord/dashboard`

**Required Data:**
```json
{
  "user": {
    "id": "string",
    "name": "string",
    "role": "landlord"
  },
  "portfolioOverview": {
    "totalProperties": "number",
    "managedLocations": "number",
    "portfolioDescription": "string"
  },
  "metrics": {
    "totalRevenue": {
      "value": "number",
      "formatted": "string",
      "period": "string",
      "trend": "up" | "down" | null,
      "trendValue": "string",
      "trendPercentage": "number"
    },
    "properties": {
      "total": "number",
      "occupied": "number",
      "vacant": "number"
    },
    "tenants": {
      "active": "number",
      "total": "number",
      "trend": "up" | "down" | null,
      "trendValue": "string"
    },
    "maintenance": {
      "pending": "number",
      "inProgress": "number",
      "total": "number"
    }
  },
  "revenue": {
    "monthly": {
      "total": "number",
      "formatted": "string",
      "trendAmount": "string",
      "period": "string",
      "stats": {
        "collected": {
          "amount": "number",
          "formatted": "string",
          "percentage": "number",
          "description": "string"
        },
        "pending": {
          "amount": "number",
          "formatted": "string",
          "tenantCount": "number",
          "description": "string"
        },
        "occupancyRate": {
          "percentage": "number",
          "occupiedUnits": "number",
          "totalUnits": "number",
          "description": "string"
        },
        "averageRent": {
          "amount": "number",
          "formatted": "string",
          "description": "string"
        }
      }
    },
    "chartData": {
      "monthly": [
        {
          "period": "string",
          "revenue": "number"
        }
      ],
      "yearly": [
        {
          "period": "string",
          "revenue": "number"
        }
      ]
    }
  },
  "performanceMetrics": {
    "rentCollection": {
      "current": "number",
      "total": "number",
      "unit": "USD"
    },
    "occupancy": {
      "current": "number",
      "total": "number",
      "unit": "units"
    },
    "maintenanceBudget": {
      "current": "number",
      "total": "number",
      "unit": "USD"
    },
    "leaseRenewals": {
      "current": "number",
      "total": "number",
      "unit": "leases"
    }
  },
  "properties": [
    {
      "id": "string",
      "name": "string",
      "units": "number",
      "unitsLabel": "string",
      "occupancy": "number",
      "tenants": [
        {
          "id": "string",
          "name": "string",
          "avatarUrl": "string"
        }
      ]
    }
  ],
  "maintenanceRequests": [
    {
      "id": "string",
      "title": "string",
      "property": "string",
      "propertyId": "string",
      "unit": "string",
      "status": "Urgent" | "In Progress" | "Scheduled" | "Completed",
      "statusColor": "error" | "warning" | "info" | "success",
      "priority": "high" | "medium" | "low",
      "date": "string",
      "timestamp": "ISO 8601 datetime"
    }
  ]
}
```

---

### Tenant Dashboard

**Endpoint:** `GET /api/tenant/dashboard`

**Required Data:**
```json
{
  "user": {
    "id": "string",
    "name": "string",
    "firstName": "string",
    "role": "tenant"
  },
  "metrics": {
    "rentStatus": {
      "status": "Paid" | "Pending" | "Overdue",
      "dueDate": "string",
      "timestamp": "ISO 8601 datetime"
    },
    "nextPayment": {
      "amount": "number",
      "formatted": "string",
      "dueDate": "string",
      "daysUntilDue": "number"
    },
    "maintenance": {
      "activeRequests": "number",
      "pendingRequests": "number"
    },
    "messages": {
      "unread": "number"
    }
  },
  "property": {
    "id": "string",
    "name": "string",
    "unit": "string",
    "address": "string",
    "leaseStatus": "Active" | "Expiring Soon" | "Expired",
    "leaseStatusColor": "green" | "yellow" | "red",
    "stats": {
      "monthlyRent": {
        "amount": "number",
        "formatted": "string"
      },
      "leaseEnd": {
        "date": "string",
        "formatted": "string"
      },
      "securityDeposit": {
        "amount": "number",
        "formatted": "string"
      },
      "landlord": {
        "id": "string",
        "name": "string",
        "firstName": "string",
        "avatarUrl": "string",
        "displayName": "string"
      }
    }
  },
  "recentActivity": [
    {
      "id": "string",
      "type": "payment" | "message" | "maintenance" | "lease",
      "icon": "string",
      "color": "string",
      "title": "string",
      "date": "string",
      "timestamp": "ISO 8601 datetime"
    }
  ],
  "maintenanceRequests": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "status": "Pending" | "In Progress" | "Scheduled" | "Completed",
      "statusColor": "warning" | "info" | "success",
      "priority": "high" | "medium" | "low",
      "date": "string",
      "scheduledDate": "string",
      "timestamp": "ISO 8601 datetime"
    }
  ]
}
```

---

### Settings Page

**Endpoint:** `GET /api/user/settings`

**Required Data:**
```json
{
  "user": {
    "id": "string",
    "fullName": "string",
    "email": "string",
    "phone": "string",
    "address": "string",
    "avatarUrl": "string",
    "role": "tenant" | "landlord"
  },
  "notifications": {
    "email": "boolean",
    "sms": "boolean",
    "paymentReminders": "boolean",
    "maintenanceUpdates": "boolean"
  },
  "preferences": {
    "darkMode": "boolean",
    "autoPayRent": "boolean",
    "language": "string",
    "timezone": "string"
  }
}
```

**Update Endpoints:**
- `PUT /api/user/profile` - Update profile information
- `PUT /api/user/password` - Update password
- `PUT /api/user/notifications` - Update notification settings
- `PUT /api/user/preferences` - Update preferences
- `POST /api/user/avatar` - Upload avatar image
- `DELETE /api/user/account` - Delete account

---

### Landing Page

**Endpoint:** Static content (no dynamic data required)

**Optional Dynamic Data (if showing real stats):**
```json
{
  "stats": {
    "propertiesManaged": "string",
    "timeSaved": "string",
    "tenantSatisfaction": "string",
    "responseTime": "string"
  },
  "testimonials": [
    {
      "id": "string",
      "name": "string",
      "role": "string",
      "company": "string",
      "content": "string",
      "rating": "number",
      "avatarUrl": "string"
    }
  ]
}
```

---

## Layout Components

### DashboardHeader

**Required Data:**
```json
{
  "user": {
    "id": "string",
    "name": "string",
    "role": "tenant" | "landlord",
    "avatarUrl": "string"
  },
  "notifications": {
    "unread": "number",
    "hasUnread": "boolean"
  }
}
```

---

### Sidebar

**Required Data:**
```json
{
  "user": {
    "id": "string",
    "name": "string",
    "role": "tenant" | "landlord",
    "avatarUrl": "string"
  },
  "navigation": {
    "currentPath": "string"
  }
}
```

---

### UserMenu

**Required Data:**
```json
{
  "user": {
    "id": "string",
    "name": "string",
    "role": "tenant" | "landlord",
    "avatarUrl": "string"
  }
}
```

---

### Header (Landing Page)

**Required Data:**
```json
{
  "isAuthenticated": "boolean",
  "user": {
    "id": "string",
    "name": "string"
  } | null
}
```

---

## UI Components

### MetricCard

**Props Schema:**
```typescript
{
  title: string;              // e.g., "Total Revenue"
  value: string | number;     // e.g., "$24,750" or 12
  subValue?: string;          // e.g., "This month"
  icon: IconComponent;        // Lucide icon component
  iconColor?: string;         // e.g., "success.500"
  trend?: "up" | "down";      // Trend direction
  trendValue?: string;        // e.g., "+12.5%"
  bgGradient?: string;        // Optional gradient background
  onClick?: () => void;       // Optional click handler
}
```

---

### ProgressCard

**Props Schema:**
```typescript
{
  title: string;              // e.g., "Rent Collection"
  description: string;        // e.g., "Monthly rent collected"
  current: number;            // Current value
  total: number;              // Total/goal value
  unit?: string;              // e.g., "USD", "units", "leases"
  showPercentage?: boolean;   // Default: true
  colorScheme?: string;       // e.g., "brand", "success", "teal"
}
```

---

### QuickActionCard

**Props Schema:**
```typescript
{
  icon: IconComponent;        // Lucide icon component
  title: string;              // e.g., "Add Property"
  description: string;        // e.g., "List a new property"
  colorScheme?: string;       // e.g., "brand", "teal", "success"
  onClick: () => void;        // Click handler
}
```

---

### RevenueOverviewCard

**Props Schema:**
```typescript
{
  title?: string;             // Default: "Monthly Revenue"
  totalRevenue: string;       // e.g., "$24,750.00"
  trendAmount?: string;       // e.g., "+$2,750"
  period?: string;            // e.g., "December 2024"
  stats: Array<{
    label: string;            // e.g., "Collected"
    value: string;            // e.g., "$22,500"
    description: string;      // e.g., "90.9% of total"
  }>;
  bgGradient?: string;        // Optional gradient
}
```

---

### RevenueChart

**Props Schema:**
```typescript
{
  title?: string;             // Default: "Revenue Overview"
  monthlyData?: Array<{
    period: string;           // e.g., "Jan", "Feb"
    revenue: number;          // Amount in dollars
  }>;
  yearlyData?: Array<{
    period: string;           // e.g., "2023", "2024"
    revenue: number;          // Amount in dollars
  }>;
  dataKey?: string;           // Default: "revenue"
  height?: number;            // Default: 400
}
```

---

### PropertyOverviewCard

**Props Schema:**
```typescript
{
  title?: string;             // Default: "Your Property"
  propertyName: string;       // e.g., "Apartment 24B"
  propertyAddress: string;    // e.g., "123 Main Street, Downtown"
  badgeText?: string;         // e.g., "Active Lease"
  badgeColorScheme?: string;  // e.g., "green"
  stats: Array<{
    label: string;            // e.g., "Monthly Rent"
    value: string;            // e.g., "$1,250"
    avatar?: {                // Optional avatar for landlord
      name: string;
      bg?: string;
    };
  }>;
  bgGradient?: string;        // Optional gradient
}
```

---

### FeatureCard

**Props Schema:**
```typescript
{
  icon: IconComponent;        // Lucide icon component
  title: string;              // e.g., "Tenant Communication"
  description: string;        // Feature description
  color?: string;             // e.g., "brand.500"
}
```

---

### StatCard

**Props Schema:**
```typescript
{
  label: string;              // e.g., "Properties Managed"
  value: string;              // e.g., "2,500+"
  company: string;            // e.g., "Leading PMCs"
}
```

---

### BenefitCard

**Props Schema:**
```typescript
{
  icon: IconComponent;        // Lucide icon component
  title: string;              // e.g., "Centralized Platform"
  description: string;        // Benefit description
}
```

---

### Breadcrumbs

**Props Schema:**
```typescript
{
  items: Array<{
    label: string;            // e.g., "Dashboard"
    href?: string;            // Optional link URL
    icon?: IconComponent;     // Optional icon
  }>;
}
```

---

### Testimonials

**Props Schema:**
```typescript
{
  testimonials?: Array<{
    id: string;
    name: string;             // e.g., "Sarah Mitchell"
    role: string;             // e.g., "Property Manager"
    company: string;          // e.g., "Urban Living Properties"
    content: string;          // Testimonial text
    rating: number;           // 1-5 stars
    avatarUrl?: string;       // Optional avatar
  }>;
}
```

---

## API Endpoints Summary

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Request password reset
- `GET /api/auth/verify-token` - Verify JWT token

### Landlord
- `GET /api/landlord/dashboard` - Get landlord dashboard data
- `GET /api/landlord/properties` - Get all properties
- `POST /api/landlord/properties` - Create new property
- `GET /api/landlord/properties/:id` - Get property details
- `PUT /api/landlord/properties/:id` - Update property
- `DELETE /api/landlord/properties/:id` - Delete property
- `GET /api/landlord/tenants` - Get all tenants
- `POST /api/landlord/tenants` - Add new tenant
- `GET /api/landlord/finances` - Get financial overview
- `GET /api/landlord/revenue/chart` - Get revenue chart data

### Tenant
- `GET /api/tenant/dashboard` - Get tenant dashboard data
- `GET /api/tenant/property` - Get current property details
- `GET /api/tenant/payments` - Get payment history
- `POST /api/tenant/payments` - Make payment
- `GET /api/tenant/lease` - Get lease details

### Maintenance
- `GET /api/maintenance/requests` - Get all maintenance requests
- `POST /api/maintenance/requests` - Create maintenance request
- `GET /api/maintenance/requests/:id` - Get request details
- `PUT /api/maintenance/requests/:id` - Update request
- `DELETE /api/maintenance/requests/:id` - Delete request

### Messages
- `GET /api/messages` - Get all messages
- `POST /api/messages` - Send message
- `GET /api/messages/:id` - Get message thread
- `PUT /api/messages/:id/read` - Mark as read

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile
- `POST /api/user/avatar` - Upload avatar
- `GET /api/user/settings` - Get user settings
- `PUT /api/user/settings` - Update settings
- `PUT /api/user/password` - Change password
- `DELETE /api/user/account` - Delete account

### Notifications
- `GET /api/notifications` - Get all notifications
- `GET /api/notifications/unread` - Get unread count
- `PUT /api/notifications/:id/read` - Mark notification as read
- `PUT /api/notifications/read-all` - Mark all as read

---

## Data Type Definitions

### Common Types

```typescript
// User
interface User {
  id: string;
  email: string;
  fullName: string;
  firstName: string;
  lastName: string;
  role: "landlord" | "tenant" | "admin";
  phone?: string;
  address?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// Property
interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  totalUnits: number;
  occupiedUnits: number;
  landlordId: string;
  createdAt: string;
  updatedAt: string;
}

// Tenant
interface Tenant {
  id: string;
  userId: string;
  propertyId: string;
  unit: string;
  leaseStart: string;
  leaseEnd: string;
  monthlyRent: number;
  securityDeposit: number;
  status: "active" | "pending" | "expired";
}

// Maintenance Request
interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  propertyId: string;
  unit?: string;
  tenantId: string;
  status: "pending" | "in_progress" | "scheduled" | "completed" | "cancelled";
  priority: "low" | "medium" | "high" | "urgent";
  createdAt: string;
  updatedAt: string;
  scheduledDate?: string;
  completedDate?: string;
}

// Payment
interface Payment {
  id: string;
  tenantId: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: "pending" | "paid" | "overdue" | "partial";
  paymentMethod?: string;
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
}

// Message
interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  subject: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

// Notification
interface Notification {
  id: string;
  userId: string;
  type: "payment" | "maintenance" | "message" | "lease" | "system";
  title: string;
  content: string;
  isRead: boolean;
  actionUrl?: string;
  createdAt: string;
}
```

---

## Notes

1. **Date Formats**: All dates should be returned in ISO 8601 format (e.g., `2024-12-15T10:30:00Z`) from the API.

2. **Currency**: All currency values should be stored as numbers (in cents) in the database and formatted on the frontend. For display, formatted strings are provided (e.g., `"$1,250.00"`).

3. **Authentication**: All authenticated endpoints require a JWT token in the Authorization header: `Authorization: Bearer <token>`

4. **Error Handling**: All API responses should follow a consistent error format:
```json
{
  "success": false,
  "error": {
    "code": "string",
    "message": "string",
    "details": {}
  }
}
```

5. **Success Responses**: All successful API responses should follow this format:
```json
{
  "success": true,
  "data": {},
  "message": "string"
}
```

6. **Pagination**: List endpoints should support pagination with query parameters:
   - `?page=1&limit=10`
   - Response should include: `{ data: [], total: number, page: number, totalPages: number }`

7. **Filtering & Sorting**: List endpoints should support:
   - Filtering: `?status=active&propertyId=123`
   - Sorting: `?sortBy=createdAt&order=desc`

8. **File Uploads**: Avatar and document uploads should use multipart/form-data and return:
```json
{
  "success": true,
  "data": {
    "fileUrl": "string",
    "fileId": "string"
  }
}
```

---

## Implementation Priority

### Phase 1 - Core Dashboard Functionality
1. Authentication endpoints
2. User profile and settings
3. Landlord dashboard data
4. Tenant dashboard data

### Phase 2 - Property & Tenant Management
1. Property CRUD operations
2. Tenant management
3. Lease management

### Phase 3 - Payments & Maintenance
1. Payment processing
2. Payment history
3. Maintenance requests CRUD

### Phase 4 - Communication & Notifications
1. Messaging system
2. Notifications
3. Real-time updates (WebSocket/Socket.io)

### Phase 5 - Analytics & Reporting
1. Revenue charts and analytics
2. Performance metrics
3. Export functionality
4. Advanced filtering and reporting

---

**Document Version:** 1.0  
**Last Updated:** November 9, 2025  
**Maintainer:** Development Team

