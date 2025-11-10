# Inspection Components

Components for scheduling and managing property inspections in the Property Management application.

## Components

### InspectionCard
Displays a single inspection with its details, status, inspector information, and action menu.

**Props:**
- `inspection` - Object containing inspection details
- `onClick` - Callback when the card is clicked (e.g., to view details)
- `onEdit` - Callback when the edit/reschedule action is selected
- `onCancel` - Callback when the cancel action is selected
- `onViewReport` - Callback when viewing report for completed inspection

**Inspection Object Structure:**
```javascript
{
  id: string,
  type: string, // e.g., "Routine Inspection", "Move-In Inspection"
  scheduledDate: string, // ISO 8601 datetime
  completedDate?: string, // ISO 8601 datetime
  status: 'scheduled' | 'completed' | 'pending' | 'cancelled' | 'failed',
  inspector?: {
    name: string,
    avatarUrl?: string,
    avatarBg: string,
  },
  notes?: string,
  issues?: number, // Number of issues found (for completed inspections)
}
```

**Features:**
- Color-coded status indicators with icons
- Date and time formatting
- Inspector avatar with tooltip
- Action menu (Reschedule, Cancel, View Report)
- Issue count display for completed inspections
- Notes preview
- Hover effects and smooth animations
- Dark mode support

---

### ScheduleInspectionModal
A modal form for scheduling new inspections or rescheduling existing ones.

**Props:**
- `isOpen` - Boolean to control modal visibility
- `onClose` - Callback to close the modal
- `onSubmit` - Async callback function to handle form submission
- `editInspection` - Optional inspection object for rescheduling (if provided, modal enters edit mode)

**Form Data Structure (passed to `onSubmit`):**
```javascript
{
  id?: string, // Present only when rescheduling
  type: string, // Inspection type ID
  scheduledDate: string, // ISO 8601 datetime (combined date + time)
  notes: string,
}
```

**Inspection Types:**
- `move_in` - Move-In Inspection
- `move_out` - Move-Out Inspection
- `routine` - Routine Inspection
- `maintenance` - Maintenance Inspection
- `safety` - Safety Inspection

**Available Time Slots:**
- 9:00 AM through 5:00 PM (hourly slots)

**Features:**
- Interactive inspection type selection cards
- Date picker with minimum date validation (can't select past dates)
- Time slot dropdown selection
- Optional notes textarea
- Information box with inspection details
- Edit mode for rescheduling
- Form validation for required fields
- Loading states during submission
- Toast notifications for success/failure
- Auto-reset form on successful submission
- Backdrop blur effect
- Responsive design

---

## Usage Example (Inspections Page)

```jsx
import {
  Box, VStack, HStack, Text, Button, Icon, Heading, SimpleGrid,
  Flex, Badge, Select, useDisclosure, useToast
} from '@chakra-ui/react'
import { Plus, Calendar, CheckCircle2, AlertTriangle } from 'lucide-react'
import React, { useState } from 'react'
import DashboardLayout from '../components/layout/DashboardLayout'
import InspectionCard from '../components/inspections/InspectionCard'
import ScheduleInspectionModal from '../components/inspections/ScheduleInspectionModal'
import MetricCard from '../components/ui/MetricCard'

const Inspections = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const [editInspection, setEditInspection] = useState(null)

  const [inspections, setInspections] = useState([
    {
      id: 'insp1',
      type: 'Routine Inspection',
      scheduledDate: '2025-01-15T10:00:00Z',
      status: 'scheduled',
      inspector: { name: 'John Smith', avatarBg: 'blue.400' },
      notes: 'Annual routine inspection.',
    },
    // ... more inspections
  ])

  const [filterStatus, setFilterStatus] = useState('all')

  // Calculate stats
  const stats = {
    upcoming: inspections.filter(i => i.status === 'scheduled').length,
    completed: inspections.filter(i => i.status === 'completed').length,
    issues: inspections
      .filter(i => i.status === 'completed')
      .reduce((sum, i) => sum + (i.issues || 0), 0),
  }

  const handleScheduleInspection = () => {
    setEditInspection(null)
    onOpen()
  }

  const handleSubmitInspection = async (inspectionData) => {
    // API call to schedule/reschedule
    if (inspectionData.id) {
      // Update existing
      setInspections(prev => 
        prev.map(insp => 
          insp.id === inspectionData.id 
            ? { ...insp, ...inspectionData }
            : insp
        )
      )
    } else {
      // Create new
      const newInspection = {
        id: `insp${Date.now()}`,
        ...inspectionData,
        status: 'scheduled',
      }
      setInspections(prev => [newInspection, ...prev])
    }
  }

  const handleEditInspection = (inspection) => {
    setEditInspection(inspection)
    onOpen()
  }

  const handleCancelInspection = (inspection) => {
    setInspections(prev =>
      prev.map(insp =>
        insp.id === inspection.id ? { ...insp, status: 'cancelled' } : insp
      )
    )
    toast({
      title: 'Inspection Cancelled',
      status: 'success',
    })
  }

  return (
    <DashboardLayout userType="tenant">
      <ScheduleInspectionModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmitInspection}
        editInspection={editInspection}
      />

      <VStack align="stretch" spacing={6}>
        {/* Header */}
        <Flex justify="space-between" align="center">
          <Heading size="lg">Property Inspections</Heading>
          <Button
            leftIcon={<Icon as={Plus} />}
            colorScheme="brand"
            onClick={handleScheduleInspection}
          >
            Schedule Inspection
          </Button>
        </Flex>

        {/* Stats */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <MetricCard
            title="Upcoming Inspections"
            value={stats.upcoming.toString()}
            icon={Calendar}
          />
          <MetricCard
            title="Completed Inspections"
            value={stats.completed.toString()}
            icon={CheckCircle2}
          />
          <MetricCard
            title="Issues Found"
            value={stats.issues.toString()}
            icon={AlertTriangle}
          />
        </SimpleGrid>

        {/* Filter */}
        <HStack justify="space-between">
          <Heading size="md">All Inspections</Heading>
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            maxW="200px"
          >
            <option value="all">All Inspections</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
          </Select>
        </HStack>

        {/* Inspections List */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
          {filteredInspections.map((inspection) => (
            <InspectionCard
              key={inspection.id}
              inspection={inspection}
              onClick={handleCardClick}
              onEdit={handleEditInspection}
              onCancel={handleCancelInspection}
              onViewReport={handleViewReport}
            />
          ))}
        </SimpleGrid>
      </VStack>
    </DashboardLayout>
  )
}

export default Inspections
```

---

## API Integration Points

### Get Inspections
```javascript
GET /api/inspections
Query params: ?status=scheduled
Response: {
  success: true,
  data: Inspection[]
}
```

### Schedule Inspection
```javascript
POST /api/inspections
Body: {
  type: string,
  scheduledDate: string,
  notes: string
}
Response: {
  success: true,
  data: Inspection,
  message: "Inspection scheduled successfully"
}
```

### Reschedule Inspection
```javascript
PUT /api/inspections/:id
Body: {
  scheduledDate: string,
  notes: string
}
Response: {
  success: true,
  data: Inspection
}
```

### Cancel Inspection
```javascript
DELETE /api/inspections/:id
Or:
PUT /api/inspections/:id/cancel
Response: {
  success: true,
  message: "Inspection cancelled"
}
```

### Get Inspection Report
```javascript
GET /api/inspections/:id/report
Response: PDF file or report data
```

---

## Implemented Features
- ✅ Schedule new inspections
- ✅ Reschedule existing inspections
- ✅ Cancel inspections
- ✅ View inspection history
- ✅ Filter by status
- ✅ Inspection type selection
- ✅ Date and time slot selection
- ✅ Inspector information display
- ✅ Issue tracking for completed inspections
- ✅ Notes and additional information
- ✅ Statistics and metrics
- ✅ Empty states
- ✅ Responsive design
- ✅ Dark mode support

## Future Enhancements
- 🔲 Inspection reminders
- 🔲 Upload photos during inspection
- 🔲 Digital inspection checklists
- 🔲 In-app report viewing
- 🔲 Signature capture
- 🔲 Inspection history timeline
- 🔲 Export inspection reports
- 🔲 Calendar integration
- 🔲 Recurring inspection scheduling
- 🔲 Inspector ratings and feedback

