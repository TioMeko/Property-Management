import { Box, Flex, Text, Icon, VStack } from "@chakra-ui/react";
import { ChevronRight } from "lucide-react";
import React from "react";

const QuickActionCard = ({
  icon,
  title,
  description,
  onClick,
  colorScheme = "brand",
}) => {
  return (
    <Box
      p={5}
      borderRadius="xl"
      borderWidth="1px"
      borderColor="gray.200"
      bg="white"
      cursor="pointer"
      transition="all 0.2s"
      onClick={onClick}
      _hover={{
        borderColor: `${colorScheme}.300`,
        transform: "translateY(-2px)",
        shadow: "md",
      }}
      _dark={{
        borderColor: "gray.700",
        bg: "gray.800",
        _hover: {
          borderColor: `${colorScheme}.600`,
        },
      }}
    >
      <Flex justify="space-between" align="center">
        <Flex gap={4} align="center">
          <Flex
            align="center"
            justify="center"
            w={12}
            h={12}
            borderRadius="xl"
            bg={`${colorScheme}.100`}
            _dark={{ bg: `${colorScheme}.900` }}
          >
            <Icon as={icon} boxSize={6} color={`${colorScheme}.500`} />
          </Flex>
          <VStack align="start" spacing={0}>
            <Text fontWeight="semibold" fontSize="md">
              {title}
            </Text>
            <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
              {description}
            </Text>
          </VStack>
        </Flex>
        <Icon
          as={ChevronRight}
          boxSize={5}
          color="gray.400"
          _dark={{ color: "gray.500" }}
        />
      </Flex>
    </Box>
  );
};

export default QuickActionCard;
