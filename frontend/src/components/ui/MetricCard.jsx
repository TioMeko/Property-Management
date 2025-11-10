import { Box, Flex, Text, Icon, HStack, VStack, Tooltip } from "@chakra-ui/react";
import { TrendingUp, TrendingDown } from "lucide-react";
import React from "react";

const MetricCard = ({
  title,
  value,
  subValue,
  icon,
  iconColor = "brand.500",
  trend,
  trendValue,
  bgGradient,
  onClick,
  tooltipLabel,
}) => {
  const showTrend = trend && trendValue;

  return (
    <Box
      p={6}
      borderRadius="2xl"
      borderWidth="1px"
      borderColor="gray.200"
      bg={bgGradient || "white"}
      cursor={onClick ? "pointer" : "default"}
      transition="all 0.3s"
      onClick={onClick}
      _hover={
        onClick
          ? {
              transform: "translateY(-4px)",
              shadow: "lg",
              borderColor: "gray.300",
            }
          : {}
      }
      _dark={{
        borderColor: "gray.700",
        bg: bgGradient ? undefined : "gray.800",
        _hover: onClick
          ? {
              borderColor: "gray.600",
            }
          : {},
      }}
    >
      <VStack align="stretch" spacing={4}>
        <Flex justify="space-between" align="start">
          <VStack align="start" spacing={1}>
            <Text
              fontSize="sm"
              fontWeight="medium"
              color="gray.600"
              _dark={{ color: "gray.400" }}
            >
              {title}
            </Text>
            <Text fontSize="3xl" fontWeight="bold">
              {value}
            </Text>
            {subValue && (
              <Text
                fontSize="xs"
                color="gray.500"
                _dark={{ color: "gray.500" }}
              >
                {subValue}
              </Text>
            )}
          </VStack>
          {icon && (
            <Tooltip 
              label={tooltipLabel} 
              hasArrow 
              placement="top"
              isDisabled={!tooltipLabel}
              bg="gray.700"
              color="white"
              fontSize="sm"
              px={3}
              py={2}
              borderRadius="md"
              _dark={{
                bg: "gray.600",
              }}
            >
              <Flex
                align="center"
                justify="center"
                w={12}
                h={12}
                borderRadius="xl"
                bg={`${iconColor.split(".")[0]}.100`}
                _dark={{ bg: `${iconColor.split(".")[0]}.900` }}
                cursor={tooltipLabel ? "help" : "default"}
                transition="all 0.2s"
                _hover={tooltipLabel ? {
                  transform: "scale(1.05)",
                  shadow: "md",
                } : {}}
              >
                <Icon as={icon} boxSize={6} color={iconColor} />
              </Flex>
            </Tooltip>
          )}
        </Flex>

        {showTrend && (
          <HStack spacing={2}>
            <Flex
              align="center"
              gap={1}
              px={2}
              py={1}
              borderRadius="full"
              bg={trend === "up" ? "success.100" : "error.100"}
              _dark={{
                bg: trend === "up" ? "success.900" : "error.900",
              }}
            >
              <Icon
                as={trend === "up" ? TrendingUp : TrendingDown}
                boxSize={3}
                color={trend === "up" ? "success.600" : "error.600"}
              />
              <Text
                fontSize="xs"
                fontWeight="semibold"
                color={trend === "up" ? "success.700" : "error.700"}
                _dark={{
                  color: trend === "up" ? "success.300" : "error.300",
                }}
              >
                {trendValue}
              </Text>
            </Flex>
            <Text fontSize="xs" color="gray.500">
              vs last month
            </Text>
          </HStack>
        )}
      </VStack>
    </Box>
  );
};

export default MetricCard;
