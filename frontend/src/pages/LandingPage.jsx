import {
  Container,
  Heading,
  Text,
  Button,
  Badge,
  SimpleGrid,
  VStack,
  HStack,
  Flex,
  Icon,
} from "@chakra-ui/react";
import {
  MessageSquare,
  Wrench,
  DollarSign,
  BarChart3,
  CheckCircle2,
  Users,
  TrendingUp,
} from "lucide-react";
import Header from "../components/layout/Header";
import Hero from "../components/layout/Hero";
import Testimonials from "../components/Testimonials";
import CTA from "../components/layout/CTA";
import Footer from "../components/layout/Footer";
import BackToTop from "../components/BackToTop";
import FeatureCard from "../components/ui/FeatureCard";
import StatCard from "../components/ui/StatCard";
import BenefitCard from "../components/ui/BenefitCard";
import React from "react";

const LandingPage = () => {
  return (
    <Flex
      direction="column"
      minH="100vh"
      w="100%"
      maxW="none"
      bg="gray.50"
      _dark={{ bg: "gray.900" }}
    >
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Stats Section */}
      <Flex
        as="section"
        py={16}
        borderY="1px"
        borderColor="gray.200"
        bg="whiteAlpha.500"
        _dark={{
          borderColor: "gray.700",
          bg: "gray.800",
        }}
      >
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8}>
            {[
              {
                label: "Properties Managed",
                value: "2,500+",
                company: "Leading PMCs",
              },
              {
                label: "Time Saved",
                value: "98%",
                company: "On Admin Tasks",
              },
              {
                label: "Tenant Satisfaction",
                value: "4.9/5",
                company: "Average Rating",
              },
              {
                label: "Response Time",
                value: "6x",
                company: "Faster Resolution",
              },
            ].map((stat, i) => (
              <StatCard
                key={i}
                label={stat.label}
                value={stat.value}
                company={stat.company}
              />
            ))}
          </SimpleGrid>
        </Container>
      </Flex>

      {/* Features Section */}
      <Flex as="section" id="features" py={24}>
        <Container maxW="container.xl">
          <VStack spacing={16}>
            <VStack textAlign="center" spacing={4}>
              <Badge
                colorScheme="teal"
                fontSize="xs"
                px={3}
                py={1}
                borderRadius="full"
              >
                Features
              </Badge>
              <Heading
                as="h2"
                fontSize={{ base: "3xl", md: "5xl" }}
                fontWeight="bold"
              >
                Everything you need to manage properties efficiently
              </Heading>
              <Text
                fontSize="lg"
                color="gray.600"
                maxW="2xl"
                _dark={{ color: "gray.400" }}
              >
                Powerful tools designed for property managers, landlords, and
                real estate professionals
              </Text>
            </VStack>
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 4 }}
              spacing={6}
              w="full"
            >
              {[
                {
                  icon: MessageSquare,
                  title: "Tenant Communication",
                  description:
                    "Seamless messaging, automated notifications, and real-time updates keep everyone connected.",
                  color: "brand.500",
                },
                {
                  icon: Wrench,
                  title: "Maintenance Tracking",
                  description:
                    "Submit, track, and resolve maintenance requests with complete visibility and status updates.",
                  color: "teal.500",
                },
                {
                  icon: DollarSign,
                  title: "Rent Collection",
                  description:
                    "Automated payment processing, payment history tracking, and instant receipt generation.",
                  color: "rose.500",
                },
                {
                  icon: BarChart3,
                  title: "Reporting & Analytics",
                  description:
                    "Comprehensive insights, financial reports, and performance metrics at your fingertips.",
                  color: "brand.600",
                },
              ].map((feature, i) => (
                <FeatureCard
                  key={i}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  color={feature.color}
                />
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Flex>

      {/* Benefits Section */}
      <Flex as="section" py={24} bg="whiteAlpha.500" _dark={{ bg: "gray.800" }}>
        <Container maxW="container.xl">
          <VStack spacing={16}>
            <VStack textAlign="center" spacing={4}>
              <Heading
                as="h2"
                fontSize={{ base: "3xl", md: "5xl" }}
                fontWeight="bold"
              >
                Built for modern property management
              </Heading>
              <Text
                fontSize="lg"
                color="gray.600"
                _dark={{ color: "gray.400" }}
              >
                The platform for rapid progress. Focus on managing properties,
                not paperwork.
              </Text>
            </VStack>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
              {[
                {
                  icon: Users,
                  title: "Centralized Platform",
                  description:
                    "All your property data, communications, and operations in one unified dashboard.",
                },
                {
                  icon: TrendingUp,
                  title: "Automated Workflows",
                  description:
                    "Save hours every week with intelligent automation and streamlined processes.",
                },
                {
                  icon: CheckCircle2,
                  title: "99.9% Uptime",
                  description:
                    "Enterprise-grade reliability ensures your business runs without interruption.",
                },
              ].map((benefit, i) => (
                <BenefitCard
                  key={i}
                  icon={benefit.icon}
                  title={benefit.title}
                  description={benefit.description}
                />
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Flex>

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <CTA />

      {/* Footer */}
      <Footer />
      <BackToTop />
    </Flex>
  );
};

export default LandingPage;
