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
import DashboardLayout from "../components/layout/DashboardLayout";
import MetricCard from "../components/ui/MetricCard";
import ProgressCard from "../components/ui/ProgressCard";
import QuickActionCard from "../components/ui/QuickActionCard";
import RevenueOverviewCard from "../components/ui/RevenueOverviewCard";
import RevenueChart from "../components/ui/RevenueChart";
import React from "react";

const LandlordDashboard = () => {
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
              Managing 12 properties across 3 locations
            </Text>
          </Box>

          {/* Key Metrics */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            <MetricCard
              title="Total Revenue"
              value="$24,750"
              subValue="This month"
              icon={DollarSign}
              iconColor="success.500"
              trend="up"
              trendValue="+12.5%"
            />
            <MetricCard
              title="Properties"
              value="12"
              subValue="8 occupied, 4 vacant"
              icon={Building2}
              iconColor="brand.500"
            />
            <MetricCard
              title="Active Tenants"
              value="28"
              subValue="Across all properties"
              icon={Users}
              iconColor="teal.500"
              trend="up"
              trendValue="+3"
            />
            <MetricCard
              title="Maintenance"
              value="5"
              subValue="Pending requests"
              icon={Wrench}
              iconColor="warning.500"
            />
          </SimpleGrid>

          {/* Revenue Overview Card */}
          <RevenueOverviewCard
            title="Monthly Revenue"
            totalRevenue="$24,750.00"
            trendAmount="+$2,750"
            period="December 2024"
            stats={[
              {
                label: "Collected",
                value: "$22,500",
                description: "90.9% of total",
              },
              {
                label: "Pending",
                value: "$2,250",
                description: "3 tenants",
              },
              {
                label: "Occupancy Rate",
                value: "87%",
                description: "26 of 30 units",
              },
              {
                label: "Avg. Rent",
                value: "$1,250",
                description: "Per unit/month",
              },
            ]}
          />

          {/* Revenue Chart */}
          <RevenueChart title="Revenue Trend" />

          {/* Progress Metrics */}
          <Box>
            <Heading size="md" mb={4}>
              Performance Metrics
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <ProgressCard
                title="Rent Collection"
                description="Monthly rent collected"
                current={22500}
                total={24750}
                unit="USD"
                colorScheme="success"
              />
              <ProgressCard
                title="Occupancy Rate"
                description="Units currently occupied"
                current={26}
                total={30}
                unit="units"
                colorScheme="brand"
              />
              <ProgressCard
                title="Maintenance Budget"
                description="Monthly maintenance spending"
                current={3200}
                total={5000}
                unit="USD"
                colorScheme="teal"
              />
              <ProgressCard
                title="Lease Renewals"
                description="Leases renewed this quarter"
                current={18}
                total={24}
                unit="leases"
                colorScheme="rose"
              />
            </SimpleGrid>
          </Box>

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
                {[
                  {
                    name: "Sunset Apartments",
                    units: "12 units",
                    occupancy: 92,
                    tenants: ["John Doe", "Jane Smith", "Bob Wilson"],
                  },
                  {
                    name: "Downtown Plaza",
                    units: "8 units",
                    occupancy: 87,
                    tenants: ["Alice Brown", "Charlie Davis"],
                  },
                  {
                    name: "Riverside Complex",
                    units: "10 units",
                    occupancy: 80,
                    tenants: ["Emma Johnson", "Mike Williams"],
                  },
                ].map((property, i) => (
                  <Flex
                    key={i}
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
                        {property.units} • {property.occupancy}% occupied
                      </Text>
                      <AvatarGroup size="xs" max={3} mt={1}>
                        {property.tenants.map((tenant, j) => (
                          <Avatar key={j} name={tenant} bg="teal.400" />
                        ))}
                      </AvatarGroup>
                    </VStack>
                    <Badge
                      colorScheme={
                        property.occupancy > 85 ? "success" : "warning"
                      }
                    >
                      {property.occupancy}%
                    </Badge>
                  </Flex>
                ))}
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
                {[
                  {
                    title: "HVAC Repair - Unit 4B",
                    property: "Sunset Apartments",
                    status: "Urgent",
                    statusColor: "error",
                    icon: AlertCircle,
                    date: "2 hours ago",
                  },
                  {
                    title: "Plumbing Issue - Unit 12A",
                    property: "Downtown Plaza",
                    status: "In Progress",
                    statusColor: "warning",
                    icon: Clock,
                    date: "1 day ago",
                  },
                  {
                    title: "Painting - Unit 7C",
                    property: "Riverside Complex",
                    status: "Scheduled",
                    statusColor: "info",
                    icon: CheckCircle2,
                    date: "3 days ago",
                  },
                ].map((request, i) => (
                  <Flex
                    key={i}
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
                        as={request.icon}
                        boxSize={5}
                        color={`${request.statusColor}.500`}
                      />
                    </Flex>
                    <VStack align="start" spacing={0} flex={1}>
                      <Text fontSize="sm" fontWeight="medium">
                        {request.title}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {request.property} • {request.date}
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
  );
};

export default LandlordDashboard;
