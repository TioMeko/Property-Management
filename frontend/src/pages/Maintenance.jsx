import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Icon,
  Flex,
  Heading,
  Badge,
  Select,
  InputGroup,
  InputLeftElement,
  Input,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react'
import { Plus, Search, Filter } from 'lucide-react'
import React, { useState } from 'react'
import DashboardLayout from '../components/layout/DashboardLayout'
import MaintenanceRequestCard from '../components/maintenance/MaintenanceRequestCard'
import NewRequestModal from '../components/maintenance/NewRequestModal'

const Maintenance = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')

  // Mock data - replace with API calls
  const [requests] = useState([
    {
      id: '1',
      title: 'Leaky Kitchen Faucet',
      description: 'The kitchen faucet has been dripping constantly for the past few days. It seems to be getting worse.',
      status: 'in_progress',
      priority: 'high',
      category: 'plumbing',
      createdAt: '2024-12-10T10:00:00Z',
      scheduledDate: '2024-12-15T10:00:00Z',
      assignedTo: {
        name: 'Mike Chen',
        avatarUrl: null,
        avatarBg: 'blue.400',
      },
    },
    {
      id: '2',
      title: 'AC Unit Inspection',
      description: 'Annual AC unit inspection and maintenance as per lease agreement.',
      status: 'scheduled',
      priority: 'medium',
      category: 'hvac',
      createdAt: '2024-12-08T14:30:00Z',
      scheduledDate: '2024-12-20T09:00:00Z',
      assignedTo: {
        name: 'John Smith',
        avatarUrl: null,
        avatarBg: 'green.400',
      },
    },
    {
      id: '3',
      title: 'Broken Bedroom Window Lock',
      description: 'The lock on the bedroom window is broken and won\'t secure properly. Security concern.',
      status: 'pending',
      priority: 'urgent',
      category: 'structural',
      createdAt: '2024-12-12T16:45:00Z',
      scheduledDate: null,
      assignedTo: null,
    },
    {
      id: '4',
      title: 'Dishwasher Not Draining',
      description: 'Water remains at the bottom of the dishwasher after each cycle.',
      status: 'pending',
      priority: 'medium',
      category: 'appliance',
      createdAt: '2024-12-11T11:20:00Z',
      scheduledDate: null,
      assignedTo: null,
    },
    {
      id: '5',
      title: 'Light Bulb Replacement',
      description: 'Several light bulbs in the hallway need replacement.',
      status: 'completed',
      priority: 'low',
      category: 'electrical',
      createdAt: '2024-12-05T09:00:00Z',
      scheduledDate: '2024-12-07T14:00:00Z',
      assignedTo: {
        name: 'Mike Chen',
        avatarUrl: null,
        avatarBg: 'blue.400',
      },
    },
  ])

  // Filter requests
  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || request.priority === priorityFilter
    
    return matchesSearch && matchesStatus && matchesPriority
  })

  // Count requests by status
  const statusCounts = {
    all: requests.length,
    pending: requests.filter((r) => r.status === 'pending').length,
    in_progress: requests.filter((r) => r.status === 'in_progress').length,
    scheduled: requests.filter((r) => r.status === 'scheduled').length,
    completed: requests.filter((r) => r.status === 'completed').length,
  }

  const handleSubmitRequest = async (formData) => {
    console.log('Submitting request:', formData)
    // TODO: API call to create maintenance request
    // await fetch('/api/maintenance/requests', { method: 'POST', body: formData })
  }

  const handleEditRequest = (request) => {
    console.log('Edit request:', request)
    // TODO: Implement edit functionality
  }

  const handleDeleteRequest = (request) => {
    console.log('Delete request:', request)
    // TODO: Implement delete/cancel functionality
  }

  const handleMessageAboutRequest = (request) => {
    console.log('Message about request:', request)
    // TODO: Navigate to messages or open message modal
  }

  const handleCardClick = (request) => {
    console.log('View request details:', request)
    // TODO: Open request details modal or navigate to details page
  }

  return (
    <DashboardLayout userType="tenant">
      <NewRequestModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmitRequest}
      />

      <VStack align="stretch" spacing={6} w="full" p={{ base: 4, md: 6, lg: 8 }}>
        {/* Header */}
        <Flex justify="space-between" align="center" flexWrap="wrap" gap={4}>
          <Box>
            <Heading size="lg" mb={1}>
              Maintenance Requests
            </Heading>
            <Text color="gray.600" _dark={{ color: 'gray.400' }}>
              View and manage your property maintenance requests
            </Text>
          </Box>
          <Button
            leftIcon={<Icon as={Plus} />}
            colorScheme="brand"
            size="lg"
            onClick={onOpen}
          >
            New Request
          </Button>
        </Flex>

        {/* Status Summary */}
        <SimpleGrid columns={{ base: 2, md: 5 }} spacing={4}>
          {[
            { key: 'all', label: 'All Requests', color: 'gray' },
            { key: 'pending', label: 'Pending', color: 'warning' },
            { key: 'in_progress', label: 'In Progress', color: 'info' },
            { key: 'scheduled', label: 'Scheduled', color: 'brand' },
            { key: 'completed', label: 'Completed', color: 'success' },
          ].map((status) => (
            <Box
              key={status.key}
              p={4}
              borderRadius="xl"
              borderWidth="2px"
              borderColor={
                statusFilter === status.key ? `${status.color}.500` : 'gray.200'
              }
              bg={statusFilter === status.key ? `${status.color}.50` : 'white'}
              cursor="pointer"
              transition="all 0.2s"
              onClick={() => setStatusFilter(status.key)}
              _hover={{
                borderColor: `${status.color}.300`,
                shadow: 'sm',
              }}
              _dark={{
                borderColor:
                  statusFilter === status.key ? `${status.color}.500` : 'gray.700',
                bg: statusFilter === status.key ? `${status.color}.900` : 'gray.800',
              }}
            >
              <VStack spacing={1}>
                <Text fontSize="2xl" fontWeight="bold">
                  {statusCounts[status.key]}
                </Text>
                <Text fontSize="xs" color="gray.600" _dark={{ color: 'gray.400' }}>
                  {status.label}
                </Text>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>

        {/* Filters */}
        <HStack spacing={4} flexWrap="wrap">
          <InputGroup maxW="400px">
            <InputLeftElement pointerEvents="none">
              <Icon as={Search} color="gray.400" boxSize={5} />
            </InputLeftElement>
            <Input
              placeholder="Search requests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>

          <Select
            maxW="200px"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            icon={<Icon as={Filter} />}
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </Select>
        </HStack>

        {/* Request List */}
        {filteredRequests.length > 0 ? (
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
            {filteredRequests.map((request) => (
              <MaintenanceRequestCard
                key={request.id}
                request={request}
                onClick={handleCardClick}
                onEdit={handleEditRequest}
                onDelete={handleDeleteRequest}
                onMessage={handleMessageAboutRequest}
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
            <Icon as={Search} boxSize={12} color="gray.400" mb={4} />
            <Heading size="md" color="gray.600" _dark={{ color: 'gray.400' }} mb={2}>
              No requests found
            </Heading>
            <Text color="gray.500" textAlign="center" maxW="md">
              {searchQuery || statusFilter !== 'all' || priorityFilter !== 'all'
                ? 'Try adjusting your filters to see more results'
                : 'You haven\'t submitted any maintenance requests yet'}
            </Text>
            {!searchQuery && statusFilter === 'all' && priorityFilter === 'all' && (
              <Button
                mt={4}
                leftIcon={<Icon as={Plus} />}
                colorScheme="brand"
                onClick={onOpen}
              >
                Submit Your First Request
              </Button>
            )}
          </Flex>
        )}
      </VStack>
    </DashboardLayout>
  )
}

export default Maintenance

