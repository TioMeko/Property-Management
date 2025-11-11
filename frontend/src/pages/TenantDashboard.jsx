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
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
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
import { useApp } from '../context/useApp'

const TenantDashboard = () => {
  const navigate = useNavigate()
  const { user, dashboardData, loading, error, fetchDashboardData } = useApp()

  // Fetch dashboard data when component mounts
  useEffect(() => {
    if (user && user.role === 'tenant') {
      fetchDashboardData()
    }
  }, [user])

  const formatCurrency = (amount) => `$${amount.toLocaleString()}`
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  })

  // Get icon component from string name
  const getIcon = (iconName) => {
    const icons = {
      Clock,
      Calendar,
      CheckCircle2,
      MessageSquare,
      Wrench,
      AlertCircle,
    }
    return icons[iconName] || Clock
  }

  // Loading state
  if (loading && !dashboardData) {
    return (
      <DashboardLayout userType="tenant">
        <Flex w="full" h="60vh" align="center" justify="center">
          <VStack spacing={4}>
            <Spinner size="xl" color="brand.500" thickness="4px" />
            <Text color="gray.600">Loading your dashboard...</Text>
          </VStack>
        </Flex>
      </DashboardLayout>
    )
  }

  // Error state
  if (error && !dashboardData) {
    return (
      <DashboardLayout userType="tenant">
        <Flex w="full" direction="column" p={{ base: 4, md: 6, lg: 8 }}>
          <Alert status="error" borderRadius="lg">
            <AlertIcon />
            <Box>
              <AlertTitle>Error Loading Dashboard</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Box>
          </Alert>
          <Button mt={4} onClick={fetchDashboardData} colorScheme="brand">
            Retry
          </Button>
        </Flex>
      </DashboardLayout>
    )
  }

  // No data state
  if (!dashboardData) {
    return (
      <DashboardLayout userType="tenant">
        <Flex w="full" h="60vh" align="center" justify="center">
          <VStack spacing={4}>
            <Text color="gray.600">No dashboard data available</Text>
            <Button onClick={fetchDashboardData} colorScheme="brand">
              Load Dashboard
            </Button>
          </VStack>
        </Flex>
      </DashboardLayout>
    )
  }

  const { metrics, property, recentActivity, maintenanceRequests } = dashboardData

  return (
    <DashboardLayout userType="tenant">
      <Flex w="full" direction="column">
        <VStack align="stretch" spacing={8} w="full" maxW="none" p={{ base: 4, md: 6, lg: 8 }}>
          {/* Welcome Section */}
          <Box>
          <Heading size="lg" mb={2}>
            Welcome back, {user?.firstName || user?.name || 'Tenant'}! 👋
          </Heading>
          <Text color="gray.600" _dark={{ color: 'gray.400' }}>
            Here's what's happening with your property today
          </Text>
        </Box>

        {/* Key Metrics */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
          <MetricCard
            title="Rent Status"
            value={metrics?.rentStatus?.status || 'Unknown'}
            subValue={metrics?.rentStatus?.dueDate ? `Due: ${new Date(metrics.rentStatus.dueDate).toLocaleDateString()}` : ''}
            icon={CheckCircle2}
            iconColor="success.500"
            tooltipLabel={metrics?.rentStatus?.formatted ? `Amount: ${metrics.rentStatus.formatted}` : ''}
          />
          <MetricCard
            title="Next Payment"
            value={metrics?.nextPayment?.formatted || '$0'}
            subValue={metrics?.nextPayment?.daysUntilDue ? `Due in ${metrics.nextPayment.daysUntilDue} days` : ''}
            icon={DollarSign}
            iconColor="brand.500"
            tooltipLabel={metrics?.nextPayment?.dueDate ? `Due Date: ${formatDate(metrics.nextPayment.dueDate)}` : ''}
          />
          <MetricCard
            title="Maintenance"
            value={metrics?.maintenance?.activeRequests || 0}
            subValue="Active requests"
            icon={Wrench}
            iconColor="teal.500"
            tooltipLabel={metrics?.maintenance?.latestRequest 
              ? `Latest: ${metrics.maintenance.latestRequest.title}` 
              : 'No active requests'}
            onClick={() => navigate('/tenant/maintenance')}
          />
          <MetricCard
            title="Messages"
            value={metrics?.messages?.unread || 0}
            subValue="Unread messages"
            icon={MessageSquare}
            iconColor="rose.500"
            tooltipLabel={metrics?.messages?.latestMessage 
              ? `Latest: ${metrics.messages.latestMessage.preview}` 
              : 'No new messages'}
          />
        </SimpleGrid>

        {/* Rent Overview Card */}
        {property && (
          <PropertyOverviewCard
            title="Your Property"
            propertyName={property.name || 'Your Property'}
            propertyAddress={property.address || ''}
            badgeText={property.leaseStatus || 'Active Lease'}
            badgeColorScheme={property.leaseStatusColor || 'green'}
            stats={[
              {
                label: 'Monthly Rent',
                value: property.stats?.monthlyRent?.formatted || '$0',
              },
              {
                label: 'Lease End',
                value: property.stats?.leaseEnd?.formatted || 'N/A',
              },
              {
                label: 'Security Deposit',
                value: property.stats?.securityDeposit?.formatted || '$0',
              },
              {
                label: 'Landlord',
                value: property.stats?.landlord?.displayName || property.stats?.landlord?.name || 'N/A',
                avatar: property.stats?.landlord ? {
                  name: property.stats.landlord.name,
                  bg: 'rose.400',
                } : undefined,
              },
            ]}
          />
        )}

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
              onClick={() => navigate('/tenant/inspections')}
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
              {recentActivity && recentActivity.length > 0 ? (
                recentActivity.map((activity, i) => (
                  <Flex key={activity.id || i} gap={3} align="center">
                    <Flex
                      align="center"
                      justify="center"
                      w={10}
                      h={10}
                      borderRadius="lg"
                      bg={`${activity.color.split('.')[0]}.100`}
                      _dark={{ bg: `${activity.color.split('.')[0]}.900` }}
                    >
                      <Icon as={getIcon(activity.icon)} boxSize={5} color={activity.color} />
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
                ))
              ) : (
                <Text fontSize="sm" color="gray.500">
                  No recent activity
                </Text>
              )}
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
              {maintenanceRequests && maintenanceRequests.length > 0 ? (
                maintenanceRequests.map((request) => (
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
                      <Icon as={Wrench} boxSize={5} color="teal.500" />
                    </Flex>
                    <VStack align="start" spacing={0} flex={1}>
                      <Text fontSize="sm" fontWeight="medium">
                        {request.title}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {request.date || new Date(request.timestamp).toLocaleDateString()}
                      </Text>
                    </VStack>
                    <Badge colorScheme={request.statusColor || 'gray'}>
                      {request.status}
                    </Badge>
                  </Flex>
                ))
              ) : (
                <Text fontSize="sm" color="gray.500">
                  No active maintenance requests
                </Text>
              )}
            </VStack>
          </Box>
        </SimpleGrid>
      </VStack>
      </Flex>
    </DashboardLayout>
  )
}

export default TenantDashboard

