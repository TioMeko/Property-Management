import {
  Container,
  Heading,
  Text,
  Badge,
  SimpleGrid,
  VStack,
  HStack,
  Flex,
  Icon,
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";
import { Star } from "lucide-react";
import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Property Manager",
      company: "Urban Living Properties",
      content:
        "Conglomo transformed how we manage our 200+ units. Maintenance requests are resolved 3x faster and tenant satisfaction has never been higher.",
      rating: 5,
    },
    {
      name: "James Chen",
      role: "Portfolio Director",
      company: "Skyline Residential",
      content:
        "The automated rent collection and reporting features saved us countless hours. Our team can now focus on growth instead of admin work.",
      rating: 5,
    },
    {
      name: "Maria Rodriguez",
      role: "Operations Lead",
      company: "Cornerstone PM",
      content:
        "Implementing Conglomo was seamless. The platform is intuitive, powerful, and our tenants love the communication features. Highly recommend!",
      rating: 5,
    },
  ];

  return (
    <Flex as="section" id="testimonials" py={24}>
      <Container maxW="container.xl">
        <VStack spacing={16}>
          <VStack textAlign="center" spacing={4}>
            <Badge
              colorScheme="rose"
              fontSize="xs"
              px={3}
              py={1}
              borderRadius="full"
            >
              Testimonials
            </Badge>
            <Heading
              as="h2"
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="bold"
            >
              Loved by property managers worldwide
            </Heading>
          </VStack>
          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            spacing={6}
            w="full"
            maxW="6xl"
          >
            {testimonials.map((testimonial, i) => (
              <Card
                key={i}
                borderRadius="lg"
                borderWidth="1px"
                borderColor="gray.200"
                bg="white"
                _dark={{
                  borderColor: "gray.700",
                  bg: "gray.800",
                }}
              >
                <CardHeader>
                  <VStack align="start" spacing={3}>
                    <HStack spacing={1}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Icon
                          key={i}
                          as={Star}
                          boxSize={4}
                          fill="rose.500"
                          color="rose.500"
                        />
                      ))}
                    </HStack>
                    <Text
                      lineHeight="tall"
                      fontSize="base"
                      color="gray.700"
                      _dark={{ color: "gray.300" }}
                    >
                      {testimonial.content}
                    </Text>
                  </VStack>
                </CardHeader>
                <CardBody
                  borderTop="1px"
                  borderColor="gray.200"
                  _dark={{ borderColor: "gray.700" }}
                >
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="semibold">{testimonial.name}</Text>
                    <Text
                      fontSize="sm"
                      color="gray.600"
                      _dark={{ color: "gray.400" }}
                    >
                      {testimonial.role}
                    </Text>
                    <Text
                      fontSize="xs"
                      color="gray.500"
                      _dark={{ color: "gray.500" }}
                      mt={1}
                    >
                      {testimonial.company}
                    </Text>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Flex>
  );
};

export default Testimonials;
