# Maintenance Components

Modern, user-friendly maintenance request management components for the Property Management application.

## Components

### MaintenanceRequestCard
Displays individual maintenance requests with status, priority, and action buttons.

**Props:**
- `request` - Request object containing all request details
- `onClick` - Callback when card is clicked
- `onEdit` - Callback for edit action
- `onDelete` - Callback for delete/cancel action
- `onMessage` - Callback for messaging about the request

**Request Object Structure:**
```javascript
{
  id: string,
  title: string,
  description: string,
  status: 'pending' | 'in_progress' | 'scheduled' | 'completed' | 'cancelled',
  priority: 'low' | 'medium' | 'high' | 'urgent',
  category: 'plumbing' | 'electrical' | 'hvac' | 'appliance' | 'structural' | 'pest' | 'other',
  createdAt: ISO 8601 datetime string,
  scheduledDate: ISO 8601 datetime string | null,
  assignedTo: {
    name: string,
    avatarUrl: string | null,
    avatarBg: string
  } | null
}
```

**Features:**
- Color-coded status indicators with appropriate icons
- Priority badges (Low, Medium, High, Urgent)
- Category badges
- Action menu (Edit, Message, Cancel)
- Assigned worker avatar
- Scheduled date display
- Submission date
- Hover effects and animations
- Click to view details
- Dark mode support

**Status Configuration:**
- **Pending**: Orange/yellow with clock icon
- **In Progress**: Blue with alert icon
- **Scheduled**: Brand color with calendar icon
- **Completed**: Green with checkmark icon
- **Cancelled**: Gray with trash icon

**Priority Configuration:**
- **Low**: Gray badge
- **Medium**: Blue badge
- **High**: Orange badge
- **Urgent**: Red badge

---

### NewRequestModal
Modal dialog for submitting new maintenance requests.

**Props:**
- `isOpen` - Boolean to control modal visibility
- `onClose` - Callback to close the modal
- `onSubmit` - Callback when form is submitted with form data

**Form Fields:**
- **Title** (required): Brief description of the issue
- **Category** (required): Type of maintenance (Plumbing, Electrical, HVAC, etc.)
- **Priority** (required): Urgency level (Low, Medium, High, Urgent)
- **Description** (optional): Detailed explanation of the issue
- **Permission to Enter** (checkbox): Allow entry when tenant is not home

**Features:**
- Clean, modern form design
- Interactive priority selection with descriptions
- Category dropdown with common options
- Form validation
- Toast notifications for success/error
- Loading state during submission
- Auto-reset on successful submission
- Backdrop blur effect
- Responsive design
- Dark mode support

**Priority Options:**
1. **Low**: "Can wait a few days"
2. **Medium**: "Should be addressed soon"
3. **High**: "Needs attention within 24 hours"
4. **Urgent**: "Emergency - immediate attention" (with alert icon)

**Category Options:**
- Plumbing
- Electrical
- HVAC
- Appliance
- Structural
- Pest Control
- Other

---

## Maintenance Page

### Features

**Status Summary:**
- Visual overview cards showing counts for:
  - All Requests
  - Pending
  - In Progress
  - Scheduled
  - Completed
- Click to filter by status
- Active status highlighted with color

**Filtering & Search:**
- Search bar for title and description
- Status filter (click summary cards)
- Priority filter dropdown
- Real-time filtering
- Empty state with helpful messages

**Request Grid:**
- Responsive grid layout (1 column mobile, 2 columns desktop)
- All requests displayed as cards
- Click card to view full details
- Quick actions menu on each card

**Actions:**
- Create new request (modal)
- Edit existing request
- Cancel request
- Send message about request
- View request details

---

## Usage Example

```jsx
import Maintenance from './pages/Maintenance'
import { useNavigate } from 'react-router-dom'

// Navigate to maintenance page
const navigate = useNavigate()
navigate('/tenant/maintenance')  // For tenants
navigate('/landlord/maintenance') // For landlords

// Use components individually
import MaintenanceRequestCard from './components/maintenance/MaintenanceRequestCard'
import NewRequestModal from './components/maintenance/NewRequestModal'

<MaintenanceRequestCard
  request={requestData}
  onClick={handleViewDetails}
  onEdit={handleEdit}
  onDelete={handleCancel}
  onMessage={handleMessage}
/>

<NewRequestModal
  isOpen={isOpen}
  onClose={onClose}
  onSubmit={handleSubmit}
/>
```

---

## Responsive Behavior

### Desktop (lg and up)
- 2-column grid for request cards
- Status summary in 5 columns
- Full-width filters
- Spacious padding

### Tablet (md)
- 2-column grid maintained
- Status summary in 5 columns
- Adjusted spacing

### Mobile (base)
- Single column layout
- 2-column status summary
- Stacked filters
- Compact padding

---

## Styling Features

### Modern Design
- Rounded corners (xl, 2xl)
- Subtle shadows on hover
- Color-coded status system
- Badge components for categories
- Icon integration
- Smooth transitions

### Dark Mode Support
- All components adapt to dark theme
- Proper contrast ratios
- Themed borders and backgrounds
- Icon color adjustments

### Interactions
- Hover effects on cards
- Click feedback
- Loading states
- Toast notifications
- Smooth animations
- Card lift on hover

---

## API Integration

### Required Endpoints

```javascript
// Get all maintenance requests
GET /api/maintenance/requests
Response: { success: true, data: [requests] }

// Create new request
POST /api/maintenance/requests
Body: {
  title: string,
  description: string,
  category: string,
  priority: string,
  permissionToEnter: boolean
}
Response: { success: true, data: request }

// Update request
PUT /api/maintenance/requests/:id
Body: { ...updates }
Response: { success: true, data: request }

// Cancel request
DELETE /api/maintenance/requests/:id
Response: { success: true, message: string }

// Get request details
GET /api/maintenance/requests/:id
Response: { success: true, data: request }
```

### State Management

The page uses local state for:
- Requests list
- Search query
- Status filter
- Priority filter
- Modal open/close

When integrating with backend:
```javascript
useEffect(() => {
  fetchMaintenanceRequests().then(setRequests)
}, [])
```

---

## Implemented Features

- [x] Request list with filtering
- [x] Status-based filtering (click cards)
- [x] Priority filtering
- [x] Search functionality
- [x] Create new request modal
- [x] Form validation
- [x] Toast notifications
- [x] Color-coded statuses
- [x] Priority badges
- [x] Category tags
- [x] Action menus
- [x] Assigned worker display
- [x] Date formatting
- [x] Empty states
- [x] Responsive design
- [x] Dark mode support
- [x] Hover effects
- [x] Click interactions

## Future Enhancements

- [ ] Request details modal/page
- [ ] Edit request functionality
- [ ] Photo upload for issues
- [ ] Before/after photos
- [ ] Status history/timeline
- [ ] Comments/notes section
- [ ] Rating system for completed work
- [ ] Push notifications for status changes
- [ ] Export requests to PDF
- [ ] Bulk actions
- [ ] Advanced filtering (date range, assignee)
- [ ] Sort options (date, priority, status)
- [ ] Request templates
- [ ] Recurring maintenance scheduling

---

## Notes

1. **Mock Data**: Currently uses static data. Replace with API calls.

2. **Status Flow**: 
   - pending → in_progress → completed
   - pending → scheduled → in_progress → completed
   - Any status → cancelled

3. **Priority Levels**: Should guide response times in backend:
   - Urgent: < 24 hours
   - High: 1-2 days
   - Medium: 3-7 days
   - Low: 1-2 weeks

4. **Permissions**: Permission to enter should be stored and displayed to workers.

5. **Notifications**: Consider real-time updates via WebSocket for status changes.

---

**Document Version:** 1.0  
**Last Updated:** November 10, 2025  
**Maintainer:** Development Team

