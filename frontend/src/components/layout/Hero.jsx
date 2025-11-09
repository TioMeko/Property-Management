import {
  Container,
  Heading,
  Text,
  Button,
  Badge,
  VStack,
  HStack,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import React from "react";

const Hero = () => {
  return (
    <Flex
      as="section"
      position="relative"
      py={{ base: 24, md: 32 }}
      overflow="hidden"
    >
      <Flex
        position="absolute"
        inset={0}
        bgGradient="linear(to-br, brand.50, gray.50, teal.50)"
        _dark={{
          bgGradient: "linear(to-br, brand.900, gray.900, teal.900)",
        }}
      />
      <Container maxW="container.xl" position="relative">
        <VStack maxW="4xl" mx="auto" textAlign="center" spacing={6}>
          <Badge
            colorScheme="brand"
            fontSize="xs"
            px={3}
            py={1}
            borderRadius="full"
            textTransform="uppercase"
          >
            Trusted by 500+ Property Managers
          </Badge>
          <Heading
            as="h1"
            fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
            fontWeight="bold"
            lineHeight="shorter"
          >
            The complete platform to manage your properties
          </Heading>
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            color="gray.600"
            maxW="2xl"
            lineHeight="tall"
            _dark={{ color: "gray.400" }}
          >
            Streamline tenant communication, automate rent collection, and track
            maintenance requests in one powerful platform. Stop configuring and
            start innovating.
          </Text>
          <Flex direction={{ base: "column", sm: "row" }} gap={4} pt={2}>
            <Button
              size="lg"
              colorScheme="brand"
              h={12}
              px={8}
              rightIcon={<Icon as={ArrowRight} boxSize={4} />}
            >
              Get a Demo
            </Button>
            <Button size="lg" variant="outline" h={12} px={8}>
              Start Free Trial
            </Button>
          </Flex>
          <Flex
            direction={{ base: "column", sm: "row" }}
            gap={{ base: 4, sm: 8 }}
            pt={6}
            fontSize="sm"
            color="gray.600"
            _dark={{ color: "gray.400" }}
          >
            <HStack spacing={2}>
              <Icon as={CheckCircle2} boxSize={4} color="teal.500" />
              <Text>No credit card required</Text>
            </HStack>
            <HStack spacing={2}>
              <Icon as={CheckCircle2} boxSize={4} color="teal.500" />
              <Text>14-day free trial</Text>
            </HStack>
          </Flex>
        </VStack>
      </Container>
    </Flex>
  );
};

export default Hero;
