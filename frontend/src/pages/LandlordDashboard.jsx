import {
  Box,
  VStack,
  HStack,
  Text,
  SimpleGrid,
  Heading,
  Flex,
  Icon,
  Avatar,
  AvatarGroup,
  Badge,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
} from "@chakra-ui/react";
import {
  Building2,
  DollarSign,
  Users,
  Wrench,
  AlertCircle,
  CheckCircle2,
  Clock,
  Home,
} from "lucide-react";
import React, { useEffect } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import MetricCard from "../components/ui/MetricCard";
import ProgressCard from "../components/ui/ProgressCard";
import QuickActionCard from "../components/ui/QuickActionCard";
import RevenueOverviewCard from "../components/ui/RevenueOverviewCard";
import RevenueChart from "../components/ui/RevenueChart";
import { useApp } from "../context/useApp";

const LandlordDashboard = () => {
  const { user, dashboardData, loading, error, fetchDashboardData } = useApp()

  // Fetch dashboard data when component mounts
  useEffect(() => {
    if (user && user.role === 'landlord') {
      fetchDashboardData()
    }
  }, [user])

  // Get icon component from string name
  const getIcon = (iconName) => {
    const icons = {
      Clock,
      AlertCircle,
      CheckCircle2,
      Home,
    }
    return icons[iconName] || Clock
  }

  // Loading state
  if (loading && !dashboardData) {
    return (
      <DashboardLayout userType="landlord">
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
      <DashboardLayout userType="landlord">
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
      <DashboardLayout userType="landlord">
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

  const { 
    portfolioOverview, 
    metrics, 
    revenue, 
    performanceMetrics, 
    properties, 
    maintenanceRequests 
  } = dashboardData

  return (
    <DashboardLayout userType="landlord">
      <Flex w="full" direction="column">
        <VStack
          align="stretch"
          spacing={8}
          w="full"
          maxW="none"
          p={{ base: 4, md: 6, lg: 8 }}
        >
          {/* Welcome Section */}
          <Box>
            <Heading size="lg" mb={2}>
              Property Portfolio Overview
            </Heading>
            <Text color="gray.600" _dark={{ color: "gray.400" }}>
              {portfolioOverview?.portfolioDescription || `Managing ${portfolioOverview?.totalProperties || 0} properties`}
            </Text>
          </Box>

          {/* Key Metrics */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            <MetricCard
              title="Total Revenue"
              value={metrics?.totalRevenue?.formatted || '$0'}
              subValue={metrics?.totalRevenue?.period || 'This month'}
              icon={DollarSign}
              iconColor="success.500"
              trend={metrics?.totalRevenue?.trend}
              trendValue={metrics?.totalRevenue?.trendValue}
            />
            <MetricCard
              title="Properties"
              value={metrics?.properties?.total || 0}
              subValue={`${metrics?.properties?.occupied || 0} occupied, ${metrics?.properties?.vacant || 0} vacant`}
              icon={Building2}
              iconColor="brand.500"
            />
            <MetricCard
              title="Active Tenants"
              value={metrics?.tenants?.active || 0}
              subValue="Across all properties"
              icon={Users}
              iconColor="teal.500"
              trend={metrics?.tenants?.trend}
              trendValue={metrics?.tenants?.trendValue}
            />
            <MetricCard
              title="Maintenance"
              value={metrics?.maintenance?.pending || 0}
              subValue="Pending requests"
              icon={Wrench}
              iconColor="warning.500"
            />
          </SimpleGrid>

          {/* Revenue Overview Card */}
          {revenue?.monthly && (
            <RevenueOverviewCard
              title="Monthly Revenue"
              totalRevenue={revenue.monthly.formatted || '$0'}
              trendAmount={revenue.monthly.trendAmount}
              period={revenue.monthly.period}
              stats={[
                {
                  label: "Collected",
                  value: revenue.monthly.stats?.collected?.formatted || '$0',
                  description: revenue.monthly.stats?.collected?.description || '',
                },
                {
                  label: "Pending",
                  value: revenue.monthly.stats?.pending?.formatted || '$0',
                  description: revenue.monthly.stats?.pending?.description || '',
                },
                {
                  label: "Occupancy Rate",
                  value: `${revenue.monthly.stats?.occupancyRate?.percentage || 0}%`,
                  description: revenue.monthly.stats?.occupancyRate?.description || '',
                },
                {
                  label: "Avg. Rent",
                  value: revenue.monthly.stats?.averageRent?.formatted || '$0',
                  description: revenue.monthly.stats?.averageRent?.description || '',
                },
              ]}
            />
          )}

          {/* Revenue Chart */}
          {revenue?.chartData && (
            <RevenueChart 
              title="Revenue Trend" 
              monthlyData={revenue.chartData.monthly}
              yearlyData={revenue.chartData.yearly}
            />
          )}

          {/* Progress Metrics */}
          {performanceMetrics && (
            <Box>
              <Heading size="md" mb={4}>
                Performance Metrics
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                {performanceMetrics.rentCollection && (
                  <ProgressCard
                    title="Rent Collection"
                    description="Monthly rent collected"
                    current={performanceMetrics.rentCollection.current}
                    total={performanceMetrics.rentCollection.total}
                    unit={performanceMetrics.rentCollection.unit}
                    colorScheme="success"
                  />
                )}
                {performanceMetrics.occupancy && (
                  <ProgressCard
                    title="Occupancy Rate"
                    description="Units currently occupied"
                    current={performanceMetrics.occupancy.current}
                    total={performanceMetrics.occupancy.total}
                    unit={performanceMetrics.occupancy.unit}
                    colorScheme="brand"
                  />
                )}
                {performanceMetrics.maintenanceBudget && (
                  <ProgressCard
                    title="Maintenance Budget"
                    description="Monthly maintenance spending"
                    current={performanceMetrics.maintenanceBudget.current}
                    total={performanceMetrics.maintenanceBudget.total}
                    unit={performanceMetrics.maintenanceBudget.unit}
                    colorScheme="teal"
                  />
                )}
                {performanceMetrics.leaseRenewals && (
                  <ProgressCard
                    title="Lease Renewals"
                    description="Leases renewed this quarter"
                    current={performanceMetrics.leaseRenewals.current}
                    total={performanceMetrics.leaseRenewals.total}
                    unit={performanceMetrics.leaseRenewals.unit}
                    colorScheme="rose"
                  />
                )}
              </SimpleGrid>
            </Box>
          )}

          {/* Quick Actions */}
          <Box>
            <Heading size="md" mb={4}>
              Quick Actions
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
              <QuickActionCard
                icon={Building2}
                title="Add Property"
                description="List a new property"
                colorScheme="brand"
                onClick={() => console.log("Add property")}
              />
              <QuickActionCard
                icon={Users}
                title="Add Tenant"
                description="Register new tenant"
                colorScheme="teal"
                onClick={() => console.log("Add tenant")}
              />
              <QuickActionCard
                icon={DollarSign}
                title="Record Payment"
                description="Log rent payment"
                colorScheme="success"
                onClick={() => console.log("Payment")}
              />
              <QuickActionCard
                icon={Wrench}
                title="Create Work Order"
                description="Schedule maintenance"
                colorScheme="warning"
                onClick={() => console.log("Work order")}
              />
            </SimpleGrid>
          </Box>

          {/* Properties & Requests */}
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
            {/* Recent Properties */}
            <Box
              p={6}
              borderRadius="xl"
              borderWidth="1px"
              borderColor="gray.200"
              bg="white"
              _dark={{
                borderColor: "gray.700",
                bg: "gray.800",
              }}
            >
              <Heading size="md" mb={4}>
                Property Status
              </Heading>
              <VStack align="stretch" spacing={4}>
                {properties && properties.length > 0 ? (
                  properties.map((property, i) => (
                    <Flex
                      key={property.id || i}
                      gap={4}
                      align="center"
                      p={4}
                      borderRadius="lg"
                      bg="gray.50"
                      _dark={{ bg: "gray.700" }}
                    >
                      <Flex
                        align="center"
                        justify="center"
                        w={12}
                        h={12}
                        borderRadius="lg"
                        bg="brand.100"
                        _dark={{ bg: "brand.900" }}
                      >
                        <Icon as={Home} boxSize={6} color="brand.500" />
                      </Flex>
                      <VStack align="start" spacing={1} flex={1}>
                        <Text fontSize="sm" fontWeight="semibold">
                          {property.name}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          {property.unitsLabel || property.units} • {property.occupancy}% occupied
                        </Text>
                        {property.tenants && property.tenants.length > 0 && (
                          <AvatarGroup size="xs" max={3} mt={1}>
                            {property.tenants.map((tenant, j) => (
                              <Avatar key={tenant.id || j} name={tenant.name} bg="teal.400" />
                            ))}
                          </AvatarGroup>
                        )}
                      </VStack>
                      <Badge
                        colorScheme={
                          property.occupancy > 85 ? "success" : "warning"
                        }
                      >
                        {property.occupancy}%
                      </Badge>
                    </Flex>
                  ))
                ) : (
                  <Text fontSize="sm" color="gray.500">
                    No properties available
                  </Text>
                )}
              </VStack>
            </Box>

            {/* Active Maintenance */}
            <Box
              p={6}
              borderRadius="xl"
              borderWidth="1px"
              borderColor="gray.200"
              bg="white"
              _dark={{
                borderColor: "gray.700",
                bg: "gray.800",
              }}
            >
              <Heading size="md" mb={4}>
                Maintenance Requests
              </Heading>
              <VStack align="stretch" spacing={4}>
                {maintenanceRequests && maintenanceRequests.length > 0 ? (
                  maintenanceRequests.map((request, i) => (
                    <Flex
                      key={request.id || i}
                      gap={3}
                      align="center"
                      p={4}
                      borderRadius="lg"
                      bg="gray.50"
                      _dark={{ bg: "gray.700" }}
                    >
                      <Flex
                        align="center"
                        justify="center"
                        w={10}
                        h={10}
                        borderRadius="lg"
                        bg={`${request.statusColor}.100`}
                        _dark={{ bg: `${request.statusColor}.900` }}
                      >
                        <Icon
                          as={getIcon(request.icon)}
                          boxSize={5}
                          color={`${request.statusColor}.500`}
                        />
                      </Flex>
                      <VStack align="start" spacing={0} flex={1}>
                        <Text fontSize="sm" fontWeight="medium">
                          {request.title}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          {request.property} • {request.date || new Date(request.timestamp).toLocaleDateString()}
                        </Text>
                      </VStack>
                      <Badge colorScheme={request.statusColor}>
                        {request.status}
                      </Badge>
                    </Flex>
                  ))
                ) : (
                  <Text fontSize="sm" color="gray.500">
                    No maintenance requests
                  </Text>
                )}
              </VStack>
            </Box>
          </SimpleGrid>
        </VStack>
      </Flex>
    </DashboardLayout>
  );
};

export default LandlordDashboard;
