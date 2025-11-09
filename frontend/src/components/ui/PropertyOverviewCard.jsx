import {
  Box,
  VStack,
  HStack,
  Flex,
  Text,
  Heading,
  Badge,
  SimpleGrid,
  Avatar,
} from "@chakra-ui/react";
import React from "react";

const PropertyOverviewCard = ({
  title = "Your Property",
  propertyName,
  propertyAddress,
  badgeText = "Active Lease",
  badgeColorScheme = "green",
  stats = [],
  bgGradient = "linear(to-br, brand.500, teal.500)",
}) => {
  return (
    <Box p={8} borderRadius="2xl" bgGradient={bgGradient} color="white">
      <VStack align="stretch" spacing={4}>
        <Flex justify="space-between" align="start">
          <VStack align="start" spacing={2}>
            <Text fontSize="sm" opacity={0.9}>
              {title}
            </Text>
            <Heading size="lg">{propertyName}</Heading>
            <Text fontSize="sm" opacity={0.9}>
              {propertyAddress}
            </Text>
          </VStack>
          <Badge
            colorScheme={badgeColorScheme}
            fontSize="xs"
            px={3}
            py={1}
            borderRadius="full"
          >
            {badgeText}
          </Badge>
        </Flex>

        <SimpleGrid columns={{ base: 2, md: 4 }} gap={6} pt={4}>
          {stats.map((stat, index) => (
            <VStack key={index} align="start" spacing={1}>
              <Text fontSize="xs" opacity={0.8}>
                {stat.label}
              </Text>
              {stat.avatar ? (
                <HStack spacing={2} pt={1}>
                  <Avatar
                    size="xs"
                    name={stat.avatar.name}
                    bg={stat.avatar.bg || "rose.400"}
                  />
                  <Text fontSize="sm" fontWeight="semibold">
                    {stat.value}
                  </Text>
                </HStack>
              ) : (
                <Text fontSize="2xl" fontWeight="bold">
                  {stat.value}
                </Text>
              )}
            </VStack>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default PropertyOverviewCard;
