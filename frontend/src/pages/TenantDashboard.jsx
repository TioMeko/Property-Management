import {
  Box,
  VStack,
  HStack,
  Text,
  SimpleGrid,
  Heading,
  Badge,
  Flex,
  Avatar,
  Icon,
  Button,
} from '@chakra-ui/react'
import {
  DollarSign,
  Wrench,
  MessageSquare,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Clock,
} from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../components/layout/DashboardLayout'
import MetricCard from '../components/ui/MetricCard'
import ProgressCard from '../components/ui/ProgressCard'
import QuickActionCard from '../components/ui/QuickActionCard'
import PropertyOverviewCard from '../components/ui/PropertyOverviewCard'

const TenantDashboard = () => {
  const navigate = useNavigate()
  
  // eslint-disable-next-line no-unused-vars
  const [dashboardData, setDashboardData] = useState({
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
          icon: Clock,
          date: 'Dec 10, 2024',
        },
        {
          id: 2,
          title: 'AC Unit Inspection',
          status: 'Scheduled',
          statusColor: 'info',
          icon: Calendar,
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
        icon: CheckCircle2,
        color: 'success.500',
        title: 'Rent Payment Received',
        date: 'Dec 1, 2024',
      },
      {
        icon: MessageSquare,
        color: 'brand.500',
        title: 'New Message from Landlord',
        date: 'Nov 28, 2024',
      },
      {
        icon: Wrench,
        color: 'teal.500',
        title: 'Maintenance Request Completed',
        date: 'Nov 25, 2024',
      },
    ],
  })

  // In the future, fetch data from API
  useEffect(() => {
    // TODO: Replace with actual API call
    // fetchTenantDashboardData().then(data => setDashboardData(data))
  }, [])

  const formatCurrency = (amount) => `$${amount.toLocaleString()}`
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  })
  return (
    <DashboardLayout userType="tenant">
      <Flex w="full" direction="column">
        <VStack align="stretch" spacing={8} w="full" maxW="none" p={{ base: 4, md: 6, lg: 8 }}>
          {/* Welcome Section */}
          <Box>
          <Heading size="lg" mb={2}>
            Welcome back, {dashboardData.tenant.firstName}! 👋
          </Heading>
          <Text color="gray.600" _dark={{ color: 'gray.400' }}>
            Here's what's happening with your property today
          </Text>
        </Box>

        {/* Key Metrics */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
          <MetricCard
            title="Rent Status"
            value={dashboardData.rentStatus.status}
            subValue={`Due: ${dashboardData.rentStatus.nextDueDate}`}
            icon={CheckCircle2}
            iconColor="success.500"
            tooltipLabel={`Amount Paid: ${formatCurrency(dashboardData.rentStatus.amount)}`}
          />
          <MetricCard
            title="Next Payment"
            value={formatCurrency(dashboardData.rentStatus.amount)}
            subValue={`Due in ${dashboardData.rentStatus.daysUntilDue} days`}
            icon={DollarSign}
            iconColor="brand.500"
            tooltipLabel={`Due Date: ${formatDate(dashboardData.rentStatus.nextDueDate)}`}
          />
          <MetricCard
            title="Maintenance"
            value={dashboardData.maintenance.activeCount}
            subValue="Active requests"
            icon={Wrench}
            iconColor="teal.500"
            tooltipLabel={dashboardData.maintenance.requests.length > 0 
              ? `Latest: ${dashboardData.maintenance.requests[0].title}` 
              : 'No active requests'}
            onClick={() => navigate('/tenant/maintenance')}
          />
          <MetricCard
            title="Messages"
            value={dashboardData.messages.unreadCount}
            subValue="Unread messages"
            icon={MessageSquare}
            iconColor="rose.500"
            tooltipLabel={dashboardData.messages.latest 
              ? `Latest: ${dashboardData.messages.latest.preview}` 
              : 'No new messages'}
          />
        </SimpleGrid>

        {/* Rent Overview Card */}
        <PropertyOverviewCard
          title="Your Property"
          propertyName={dashboardData.property.name}
          propertyAddress={dashboardData.property.address}
          badgeText="Active Lease"
          badgeColorScheme="green"
          stats={[
            {
              label: 'Monthly Rent',
              value: formatCurrency(dashboardData.property.monthlyRent),
            },
            {
              label: 'Lease End',
              value: dashboardData.property.leaseEnd,
            },
            {
              label: 'Security Deposit',
              value: formatCurrency(dashboardData.property.securityDeposit),
            },
            {
              label: 'Landlord',
              value: dashboardData.property.landlord.name,
              avatar: dashboardData.property.landlord.avatar,
            },
          ]}
        />

        {/* Quick Actions */}
        <Box>
          <Heading size="md" mb={4}>
            Quick Actions
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <QuickActionCard
              icon={DollarSign}
              title="Pay Rent"
              description="Make your monthly payment"
              colorScheme="brand"
              onClick={() => navigate('/tenant/payments')}
            />
            <QuickActionCard
              icon={Wrench}
              title="Submit Maintenance Request"
              description="Report an issue with your property"
              colorScheme="teal"
              onClick={() => navigate('/tenant/maintenance')}
            />
            <QuickActionCard
              icon={MessageSquare}
              title="Message Landlord"
              description="Contact your property manager"
              colorScheme="rose"
              onClick={() => navigate('/tenant/messages')}
            />
            <QuickActionCard
              icon={Calendar}
              title="Schedule Inspection"
              description="Book a property inspection"
              colorScheme="slate"
              onClick={() => console.log('Schedule')}
            />
          </SimpleGrid>
        </Box>

        {/* Recent Activity & Maintenance Requests */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
          {/* Recent Activity */}
          <Box
            p={6}
            borderRadius="xl"
            borderWidth="1px"
            borderColor="gray.200"
            bg="white"
            _dark={{
              borderColor: 'gray.700',
              bg: 'gray.800',
            }}
          >
            <Heading size="md" mb={4}>
              Recent Activity
            </Heading>
            <VStack align="stretch" spacing={4}>
              {dashboardData.recentActivity.map((activity, i) => (
                <Flex key={i} gap={3} align="center">
                  <Flex
                    align="center"
                    justify="center"
                    w={10}
                    h={10}
                    borderRadius="lg"
                    bg={`${activity.color.split('.')[0]}.100`}
                    _dark={{ bg: `${activity.color.split('.')[0]}.900` }}
                  >
                    <Icon as={activity.icon} boxSize={5} color={activity.color} />
                  </Flex>
                  <VStack align="start" spacing={0} flex={1}>
                    <Text fontSize="sm" fontWeight="medium">
                      {activity.title}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {activity.date}
                    </Text>
                  </VStack>
                </Flex>
              ))}
            </VStack>
          </Box>

          {/* Active Maintenance Requests */}
          <Box
            p={6}
            borderRadius="xl"
            borderWidth="1px"
            borderColor="gray.200"
            bg="white"
            _dark={{
              borderColor: 'gray.700',
              bg: 'gray.800',
            }}
          >
            <Heading size="md" mb={4}>
              Maintenance Requests
            </Heading>
            <VStack align="stretch" spacing={4}>
              {dashboardData.maintenance.requests.map((request) => (
                <Flex
                  key={request.id}
                  gap={3}
                  align="center"
                  p={4}
                  borderRadius="lg"
                  bg="gray.50"
                  _dark={{ bg: 'gray.700' }}
                >
                  <Flex
                    align="center"
                    justify="center"
                    w={10}
                    h={10}
                    borderRadius="lg"
                    bg="teal.100"
                    _dark={{ bg: 'teal.900' }}
                  >
                    <Icon as={request.icon} boxSize={5} color="teal.500" />
                  </Flex>
                  <VStack align="start" spacing={0} flex={1}>
                    <Text fontSize="sm" fontWeight="medium">
                      {request.title}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {request.date}
                    </Text>
                  </VStack>
                  <Badge colorScheme={request.statusColor}>
                    {request.status}
                  </Badge>
                </Flex>
              ))}
            </VStack>
          </Box>
        </SimpleGrid>
      </VStack>
      </Flex>
    </DashboardLayout>
  )
}

export default TenantDashboard

