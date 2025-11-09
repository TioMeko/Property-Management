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
import DashboardLayout from '../components/layout/DashboardLayout'
import MetricCard from '../components/ui/MetricCard'
import ProgressCard from '../components/ui/ProgressCard'
import QuickActionCard from '../components/ui/QuickActionCard'
import PropertyOverviewCard from '../components/ui/PropertyOverviewCard'

const TenantDashboard = () => {
  return (
    <DashboardLayout userType="tenant">
      <Flex w="full" direction="column">
        <VStack align="stretch" spacing={8} w="full" maxW="none" p={{ base: 4, md: 6, lg: 8 }}>
          {/* Welcome Section */}
          <Box>
          <Heading size="lg" mb={2}>
            Welcome back, John! 👋
          </Heading>
          <Text color="gray.600" _dark={{ color: 'gray.400' }}>
            Here's what's happening with your property today
          </Text>
        </Box>

        {/* Key Metrics */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
          <MetricCard
            title="Rent Status"
            value="Paid"
            subValue="Due: Jan 1, 2025"
            icon={CheckCircle2}
            iconColor="success.500"
          />
          <MetricCard
            title="Next Payment"
            value="$1,250"
            subValue="Due in 12 days"
            icon={DollarSign}
            iconColor="brand.500"
          />
          <MetricCard
            title="Maintenance"
            value="2"
            subValue="Active requests"
            icon={Wrench}
            iconColor="teal.500"
          />
          <MetricCard
            title="Messages"
            value="3"
            subValue="Unread messages"
            icon={MessageSquare}
            iconColor="rose.500"
          />
        </SimpleGrid>

        {/* Rent Overview Card */}
        <PropertyOverviewCard
          title="Your Property"
          propertyName="Apartment 24B"
          propertyAddress="123 Main Street, Downtown"
          badgeText="Active Lease"
          badgeColorScheme="green"
          stats={[
            {
              label: 'Monthly Rent',
              value: '$1,250',
            },
            {
              label: 'Lease End',
              value: 'Dec 2025',
            },
            {
              label: 'Security Deposit',
              value: '$1,250',
            },
            {
              label: 'Landlord',
              value: 'Sarah J.',
              avatar: {
                name: 'Sarah Johnson',
                bg: 'rose.400',
              },
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
              onClick={() => console.log('Pay rent')}
            />
            <QuickActionCard
              icon={Wrench}
              title="Submit Maintenance Request"
              description="Report an issue with your property"
              colorScheme="teal"
              onClick={() => console.log('Maintenance')}
            />
            <QuickActionCard
              icon={MessageSquare}
              title="Message Landlord"
              description="Contact your property manager"
              colorScheme="rose"
              onClick={() => console.log('Message')}
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
              {[
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
              ].map((activity, i) => (
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
              {[
                {
                  title: 'Leaky Kitchen Faucet',
                  status: 'In Progress',
                  statusColor: 'warning',
                  icon: Clock,
                  date: 'Dec 10, 2024',
                },
                {
                  title: 'AC Unit Inspection',
                  status: 'Scheduled',
                  statusColor: 'info',
                  icon: Calendar,
                  date: 'Dec 15, 2024',
                },
              ].map((request, i) => (
                <Flex
                  key={i}
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

