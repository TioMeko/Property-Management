import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Icon,
  Heading,
  SimpleGrid,
  Flex,
  Badge,
  Select,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { Plus, Calendar, CheckCircle2, Clock, XCircle, AlertTriangle } from 'lucide-react'
import React, { useState } from 'react'
import DashboardLayout from '../components/layout/DashboardLayout'
import InspectionCard from '../components/inspections/InspectionCard'
import ScheduleInspectionModal from '../components/inspections/ScheduleInspectionModal'
import MetricCard from '../components/ui/MetricCard'

const Inspections = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const [editInspection, setEditInspection] = useState(null)

  // Mock data - replace with API calls
  const [inspections, setInspections] = useState([
    {
      id: 'insp1',
      type: 'Routine Inspection',
      scheduledDate: '2025-01-15T10:00:00Z',
      status: 'scheduled',
      inspector: {
        name: 'John Smith',
        avatarBg: 'blue.400',
      },
      notes: 'Annual routine inspection. Please ensure all areas are accessible.',
    },
    {
      id: 'insp2',
      type: 'Maintenance Inspection',
      scheduledDate: '2024-12-18T14:00:00Z',
      status: 'completed',
      completedDate: '2024-12-18T15:30:00Z',
      inspector: {
        name: 'Sarah Johnson',
        avatarBg: 'rose.400',
      },
      notes: 'Follow-up inspection for HVAC repair.',
      issues: 0,
    },
    {
      id: 'insp3',
      type: 'Safety Inspection',
      scheduledDate: '2024-11-05T09:00:00Z',
      status: 'completed',
      completedDate: '2024-11-05T10:15:00Z',
      inspector: {
        name: 'Mike Chen',
        avatarBg: 'green.400',
      },
      notes: 'Smoke detector and carbon monoxide alarm inspection.',
      issues: 1,
    },
    {
      id: 'insp4',
      type: 'Move-In Inspection',
      scheduledDate: '2024-09-01T11:00:00Z',
      status: 'completed',
      completedDate: '2024-09-01T12:30:00Z',
      inspector: {
        name: 'John Smith',
        avatarBg: 'blue.400',
      },
      notes: 'Initial move-in inspection. All items documented.',
      issues: 0,
    },
  ])

  const [filterStatus, setFilterStatus] = useState('all')

  // Calculate stats
  const stats = {
    upcoming: inspections.filter((i) => i.status === 'scheduled').length,
    completed: inspections.filter((i) => i.status === 'completed').length,
    issues: inspections
      .filter((i) => i.status === 'completed')
      .reduce((sum, i) => sum + (i.issues || 0), 0),
  }

  // Filter inspections
  const filteredInspections = inspections.filter((inspection) => {
    if (filterStatus === 'all') return true
    return inspection.status === filterStatus
  })

  // Sort by date (newest first for completed, soonest first for scheduled)
  const sortedInspections = [...filteredInspections].sort((a, b) => {
    if (a.status === 'scheduled' && b.status === 'scheduled') {
      return new Date(a.scheduledDate) - new Date(b.scheduledDate)
    }
    return new Date(b.scheduledDate) - new Date(a.scheduledDate)
  })

  const handleScheduleInspection = () => {
    setEditInspection(null)
    onOpen()
  }

  const handleSubmitInspection = async (inspectionData) => {
    // TODO: API call to schedule/reschedule inspection
    return new Promise((resolve) => {
      setTimeout(() => {
        if (inspectionData.id) {
          // Reschedule existing
          setInspections((prev) =>
            prev.map((insp) =>
              insp.id === inspectionData.id
                ? {
                    ...insp,
                    type: inspectionData.type,
                    scheduledDate: inspectionData.scheduledDate,
                    notes: inspectionData.notes,
                  }
                : insp
            )
          )
        } else {
          // Create new
          const newInspection = {
            id: `insp${Date.now()}`,
            type: inspectionData.type,
            scheduledDate: inspectionData.scheduledDate,
            status: 'scheduled',
            notes: inspectionData.notes,
            inspector: null,
          }
          setInspections((prev) => [newInspection, ...prev])
        }
        resolve()
      }, 1000)
    })
  }

  const handleCardClick = (inspection) => {
    console.log('View inspection details:', inspection)
    // TODO: Implement navigation to detailed inspection view
    toast({
      title: 'Viewing Inspection',
      description: `Details for "${inspection.type}"`,
      status: 'info',
      duration: 1500,
      isClosable: true,
    })
  }

  const handleEditInspection = (inspection) => {
    setEditInspection(inspection)
    onOpen()
  }

  const handleCancelInspection = (inspection) => {
    // TODO: Implement cancel confirmation and API call
    setInspections((prev) =>
      prev.map((insp) =>
        insp.id === inspection.id ? { ...insp, status: 'cancelled' } : insp
      )
    )
    toast({
      title: 'Inspection Cancelled',
      description: `"${inspection.type}" has been cancelled.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  const handleViewReport = (inspection) => {
    console.log('View inspection report:', inspection)
    // TODO: Open report in new window or modal
    toast({
      title: 'Opening Report',
      description: `Viewing report for "${inspection.type}"`,
      status: 'info',
      duration: 1500,
      isClosable: true,
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

      <VStack align="stretch" spacing={6} w="full" p={{ base: 4, md: 6, lg: 8 }}>
        {/* Header */}
        <Flex justify="space-between" align="center" flexWrap="wrap" gap={4}>
          <Box>
            <Heading size="lg" mb={1}>
              Property Inspections
            </Heading>
            <Text color="gray.600" _dark={{ color: 'gray.400' }}>
              Schedule and manage property inspections
            </Text>
          </Box>
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
            subValue="Scheduled"
            icon={Calendar}
            iconColor="brand.500"
          />
          <MetricCard
            title="Completed Inspections"
            value={stats.completed.toString()}
            subValue="This year"
            icon={CheckCircle2}
            iconColor="success.500"
          />
          <MetricCard
            title="Issues Found"
            value={stats.issues.toString()}
            subValue="Requiring attention"
            icon={AlertTriangle}
            iconColor={stats.issues > 0 ? 'warning.500' : 'success.500'}
          />
        </SimpleGrid>

        {/* Filter */}
        <HStack justify="space-between" align="center">
          <Heading size="md">All Inspections</Heading>
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            maxW="200px"
            borderRadius="lg"
            bg="gray.50"
            _dark={{ bg: 'gray.800' }}
            border="none"
          >
            <option value="all">All Inspections</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </Select>
        </HStack>

        {/* Inspections List */}
        {sortedInspections.length > 0 ? (
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
            {sortedInspections.map((inspection) => (
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
        ) : (
          <Flex
            direction="column"
            align="center"
            justify="center"
            py={16}
            px={4}
            borderRadius="xl"
            borderWidth="2px"
            borderStyle="dashed"
            borderColor="gray.300"
            _dark={{ borderColor: 'gray.600' }}
          >
            <Icon as={Calendar} boxSize={12} color="gray.400" mb={4} />
            <Heading size="md" color="gray.600" _dark={{ color: 'gray.400' }} mb={2}>
              No inspections found
            </Heading>
            <Text color="gray.500" textAlign="center" maxW="md" mb={4}>
              {filterStatus === 'all'
                ? "You don't have any scheduled inspections yet"
                : `No ${filterStatus} inspections to display`}
            </Text>
            {filterStatus === 'all' && (
              <Button
                leftIcon={<Icon as={Plus} />}
                colorScheme="brand"
                onClick={handleScheduleInspection}
              >
                Schedule First Inspection
              </Button>
            )}
          </Flex>
        )}
      </VStack>
    </DashboardLayout>
  )
}

export default Inspections

