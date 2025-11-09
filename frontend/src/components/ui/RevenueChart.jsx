import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  HStack,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import React from "react";

const RevenueChart = ({
  title = "Revenue Overview",
  monthlyData,
  yearlyData,
  dataKey = "revenue",
  height = 400,
}) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const [viewMode, setViewMode] = useState("monthly");

  // Default monthly data (12 months)
  const defaultMonthlyData = [
    { period: "Jan", revenue: 25700 },
    { period: "Feb", revenue: 26000 },
    { period: "Mar", revenue: 27500 },
    { period: "Apr", revenue: 27500 },
    { period: "May", revenue: 30000 },
    { period: "Jun", revenue: 30000 },
    { period: "Jul", revenue: 30000 },
    { period: "Aug", revenue: 35000 },
    { period: "Sep", revenue: 39000 },
    { period: "Oct", revenue: 39000 },
    { period: "Nov", revenue: 41000 },
    { period: "Dec", revenue: 45000 },
  ];

  // Default yearly data (5 years)
  const defaultYearlyData = [
    { period: "2020", revenue: 0 },
    { period: "2021", revenue: 0 },
    { period: "2022", revenue: 0 },
    { period: "2023", revenue: 125000 },
    { period: "2024", revenue: 257000 },
    { period: "2025", revenue: 300000 },
  ];

  const chartData =
    viewMode === "monthly"
      ? monthlyData || defaultMonthlyData
      : yearlyData || defaultYearlyData;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          bg={isDark ? "gray.800" : "white"}
          p={3}
          borderRadius="md"
          borderWidth="1px"
          borderColor={isDark ? "gray.700" : "gray.200"}
          shadow="lg"
        >
          <Text fontSize="sm" fontWeight="semibold">
            {payload[0].payload.period}
          </Text>
          <Text fontSize="lg" fontWeight="bold" color="brand.500">
            ${payload[0].value.toLocaleString()}
          </Text>
        </Box>
      );
    }
    return null;
  };

  const formatYAxis = (value) => {
    if (viewMode === "yearly") {
      return `$${(value / 1000).toFixed(0)}k`;
    }
    return `$${(value / 1000).toFixed(0)}k`;
  };

  return (
    <Box
      p={6}
      borderRadius="xl"
      borderWidth="1px"
      borderColor={isDark ? "gray.700" : "gray.200"}
      bg={isDark ? "gray.800" : "white"}
    >
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="md">{title}</Heading>
        <HStack spacing={2}>
          <Button
            size="sm"
            variant={viewMode === "monthly" ? "solid" : "ghost"}
            colorScheme="brand"
            onClick={() => setViewMode("monthly")}
          >
            Monthly
          </Button>
          <Button
            size="sm"
            variant={viewMode === "yearly" ? "solid" : "ghost"}
            colorScheme="brand"
            onClick={() => setViewMode("yearly")}
          >
            Yearly
          </Button>
        </HStack>
      </Flex>

      <ResponsiveContainer width="100%" height={height}>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3c81bd" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3c81bd" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "#4A5568" : "#E2E8F0"}
          />
          <XAxis
            dataKey="period"
            stroke={isDark ? "#A0AEC0" : "#4A5568"}
            style={{ fontSize: "12px" }}
          />
          <YAxis
            stroke={isDark ? "#A0AEC0" : "#4A5568"}
            style={{ fontSize: "12px" }}
            tickFormatter={formatYAxis}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke="#3c81bd"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorRevenue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default RevenueChart;
