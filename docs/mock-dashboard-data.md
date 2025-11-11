# Mock Dashboard Data

This document contains the hardcoded data that was previously used in the dashboard components before implementing the Context API and backend integration.

## Tenant Dashboard Mock Data

```javascript
const tenantDashboardMockData = {
  tenant: {
    firstName: 'John',
  },
  rentStatus: {
    status: 'Paid',
    amount: 1250,
    lastPaidDate: 'Dec 1, 2024',
    nextDueDate: 'Jan 1, 2025',
    daysUntilDue: 12,
  },
  maintenance: {
    activeCount: 2,
    requests: [
      {
        id: 1,
        title: 'Leaky Kitchen Faucet',
        status: 'In Progress',
        statusColor: 'warning',
        icon: 'Clock',
        date: 'Dec 10, 2024',
      },
      {
        id: 2,
        title: 'AC Unit Inspection',
        status: 'Scheduled',
        statusColor: 'info',
        icon: 'Calendar',
        date: 'Dec 15, 2024',
      },
    ],
  },
  messages: {
    unreadCount: 3,
    latest: {
      from: 'Landlord',
      preview: 'New Message from Landlord',
      date: 'Nov 28, 2024',
    },
  },
  property: {
    name: 'Apartment 24B',
    address: '123 Main Street, Downtown',
    monthlyRent: 1250,
    leaseEnd: 'Dec 2025',
    securityDeposit: 1250,
    landlord: {
      name: 'Sarah J.',
      fullName: 'Sarah Johnson',
      avatar: {
        name: 'Sarah Johnson',
        bg: 'rose.400',
      },
    },
  },
  recentActivity: [
    {
      icon: 'CheckCircle2',
      color: 'success.500',
      title: 'Rent Payment Received',
      date: 'Dec 1, 2024',
    },
    {
      icon: 'MessageSquare',
      color: 'brand.500',
      title: 'New Message from Landlord',
      date: 'Nov 28, 2024',
    },
    {
      icon: 'Wrench',
      color: 'teal.500',
      title: 'Maintenance Request Completed',
      date: 'Nov 25, 2024',
    },
  ],
}
```

## Landlord Dashboard Mock Data

```javascript
const landlordDashboardMockData = {
  portfolioOverview: {
    totalProperties: 12,
    managedLocations: 3,
    description: 'Managing 12 properties across 3 locations'
  },
  metrics: {
    totalRevenue: {
      value: '$24,750',
      subValue: 'This month',
      trend: 'up',
      trendValue: '+12.5%',
    },
    properties: {
      total: 12,
      occupied: 8,
      vacant: 4,
      display: '12',
      subValue: '8 occupied, 4 vacant',
    },
    tenants: {
      active: 28,
      total: 28,
      display: '28',
      subValue: 'Across all properties',
      trend: 'up',
      trendValue: '+3',
    },
    maintenance: {
      pending: 5,
      display: '5',
      subValue: 'Pending requests',
    },
  },
  revenueOverview: {
    title: 'Monthly Revenue',
    totalRevenue: '$24,750.00',
    trendAmount: '+$2,750',
    period: 'December 2024',
    stats: [
      {
        label: 'Collected',
        value: '$22,500',
        description: '90.9% of total',
      },
      {
        label: 'Pending',
        value: '$2,250',
        description: '3 tenants',
      },
      {
        label: 'Occupancy Rate',
        value: '87%',
        description: '26 of 30 units',
      },
      {
        label: 'Avg. Rent',
        value: '$1,250',
        description: 'Per unit/month',
      },
    ],
  },
  performanceMetrics: {
    rentCollection: {
      title: 'Rent Collection',
      description: 'Monthly rent collected',
      current: 22500,
      total: 24750,
      unit: 'USD',
      colorScheme: 'success',
    },
    occupancy: {
      title: 'Occupancy Rate',
      description: 'Units currently occupied',
      current: 26,
      total: 30,
      unit: 'units',
      colorScheme: 'brand',
    },
    maintenanceBudget: {
      title: 'Maintenance Budget',
      description: 'Monthly maintenance spending',
      current: 3200,
      total: 5000,
      unit: 'USD',
      colorScheme: 'teal',
    },
    leaseRenewals: {
      title: 'Lease Renewals',
      description: 'Leases renewed this quarter',
      current: 18,
      total: 24,
      unit: 'leases',
      colorScheme: 'rose',
    },
  },
  properties: [
    {
      name: 'Sunset Apartments',
      units: '12 units',
      occupancy: 92,
      tenants: ['John Doe', 'Jane Smith', 'Bob Wilson'],
    },
    {
      name: 'Downtown Plaza',
      units: '8 units',
      occupancy: 87,
      tenants: ['Alice Brown', 'Charlie Davis'],
    },
    {
      name: 'Riverside Complex',
      units: '10 units',
      occupancy: 80,
      tenants: ['Emma Johnson', 'Mike Williams'],
    },
  ],
  maintenanceRequests: [
    {
      title: 'HVAC Repair - Unit 4B',
      property: 'Sunset Apartments',
      status: 'Urgent',
      statusColor: 'error',
      icon: 'AlertCircle',
      date: '2 hours ago',
    },
    {
      title: 'Plumbing Issue - Unit 12A',
      property: 'Downtown Plaza',
      status: 'In Progress',
      statusColor: 'warning',
      icon: 'Clock',
      date: '1 day ago',
    },
    {
      title: 'Painting - Unit 7C',
      property: 'Riverside Complex',
      status: 'Scheduled',
      statusColor: 'info',
      icon: 'CheckCircle2',
      date: '3 days ago',
    },
  ],
}
```

## Notes

- This data was replaced with API calls through the AppContext provider
- The data structure matches the expected backend response format as documented in `frontend-data-schema.md`
- Icon names are strings in this mock data but should be actual icon components from `lucide-react` in the real implementation

