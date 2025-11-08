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
} from '@chakra-ui/react'
import {
  MessageSquare,
  Wrench,
  DollarSign,
  BarChart3,
  CheckCircle2,
  Users,
  TrendingUp,
} from 'lucide-react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Testimonials from '../components/Testimonials'
import CTA from '../components/CTA'
import Footer from '../components/Footer'
import BackToTop from '../components/BackToTop'
import FeatureCard from '../components/FeatureCard'

const LandingPage = () => {
  return (
    <Flex 
      direction="column" 
      minH="100vh" 
      w="100%" 
      maxW="none"
      bg="gray.50" 
      _dark={{ bg: 'gray.900' }}
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
          borderColor: 'gray.700',
          bg: 'gray.800',
        }}
      >
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8}>
            {[
              {
                label: 'Properties Managed',
                value: '2,500+',
                company: 'Leading PMCs',
              },
              {
                label: 'Time Saved',
                value: '98%',
                company: 'On Admin Tasks',
              },
              {
                label: 'Tenant Satisfaction',
                value: '4.9/5',
                company: 'Average Rating',
              },
              {
                label: 'Response Time',
                value: '6x',
                company: 'Faster Resolution',
              },
            ].map((stat, i) => (
              <VStack key={i} spacing={1}>
                <Text
                  fontSize={{ base: '3xl', md: '4xl' }}
                  fontWeight="bold"
                >
                  {stat.value}
                </Text>
                <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
                  {stat.label}
                </Text>
                <Text fontSize="xs" color="gray.500" _dark={{ color: 'gray.500' }}>
                  {stat.company}
                </Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Container>
      </Flex>

      {/* Features Section */}
      <Flex as="section" id="features" py={24}>
        <Container maxW="container.xl">
          <VStack spacing={16}>
            <VStack textAlign="center" spacing={4}>
              <Badge colorScheme="teal" fontSize="xs" px={3} py={1} borderRadius="full">
                Features
              </Badge>
              <Heading
                as="h2"
                fontSize={{ base: '3xl', md: '5xl' }}
                fontWeight="bold"
              >
                Everything you need to manage properties efficiently
              </Heading>
              <Text
                fontSize="lg"
                color="gray.600"
                maxW="2xl"
                _dark={{ color: 'gray.400' }}
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
                  title: 'Tenant Communication',
                  description:
                    'Seamless messaging, automated notifications, and real-time updates keep everyone connected.',
                  color: 'brand.500',
                },
                {
                  icon: Wrench,
                  title: 'Maintenance Tracking',
                  description:
                    'Submit, track, and resolve maintenance requests with complete visibility and status updates.',
                  color: 'teal.500',
                },
                {
                  icon: DollarSign,
                  title: 'Rent Collection',
                  description:
                    'Automated payment processing, payment history tracking, and instant receipt generation.',
                  color: 'rose.500',
                },
                {
                  icon: BarChart3,
                  title: 'Reporting & Analytics',
                  description:
                    'Comprehensive insights, financial reports, and performance metrics at your fingertips.',
                  color: 'brand.600',
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
      <Flex
        as="section"
        py={24}
        bg="whiteAlpha.500"
        _dark={{ bg: 'gray.800' }}
      >
        <Container maxW="container.xl">
          <VStack spacing={16}>
            <VStack textAlign="center" spacing={4}>
              <Heading
                as="h2"
                fontSize={{ base: '3xl', md: '5xl' }}
                fontWeight="bold"
              >
                Built for modern property management
              </Heading>
              <Text
                fontSize="lg"
                color="gray.600"
                _dark={{ color: 'gray.400' }}
              >
                The platform for rapid progress. Focus on managing properties,
                not paperwork.
              </Text>
            </VStack>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
              {[
                {
                  icon: Users,
                  title: 'Centralized Platform',
                  description:
                    'All your property data, communications, and operations in one unified dashboard.',
                },
                {
                  icon: TrendingUp,
                  title: 'Automated Workflows',
                  description:
                    'Save hours every week with intelligent automation and streamlined processes.',
                },
                {
                  icon: CheckCircle2,
                  title: '99.9% Uptime',
                  description:
                    'Enterprise-grade reliability ensures your business runs without interruption.',
                },
              ].map((benefit, i) => (
                <VStack key={i} textAlign="center" spacing={4}>
                  <Flex
                    align="center"
                    justify="center"
                    w={16}
                    h={16}
                    borderRadius="2xl"
                    bg="brand.100"
                    _dark={{ bg: 'brand.900' }}
                  >
                    <Icon
                      as={benefit.icon}
                      boxSize={8}
                      color="brand.500"
                    />
                  </Flex>
                  <Heading as="h3" size="lg">
                    {benefit.title}
                  </Heading>
                  <Text
                    color="gray.600"
                    lineHeight="tall"
                    _dark={{ color: 'gray.400' }}
                  >
                    {benefit.description}
                  </Text>
                </VStack>
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
  )
}

export default LandingPage

