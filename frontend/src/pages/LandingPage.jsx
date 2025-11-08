import {
  Container,
  Heading,
  Text,
  Button,
  Badge,
  Grid,
  GridItem,
  SimpleGrid,
  VStack,
  HStack,
  Flex,
  Icon,
  Card,
  CardHeader,
  CardBody,
  Link,
} from '@chakra-ui/react'
import {
  Building2,
  MessageSquare,
  Wrench,
  DollarSign,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Users,
  TrendingUp,
} from 'lucide-react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Testimonials from '../components/Testimonials'
import BackToTop from '../components/BackToTop'

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
                <Card
                  key={i}
                  borderRadius="lg"
                  borderWidth="1px"
                  borderColor="gray.200"
                  bg="white"
                  transition="all 0.3s"
                  _hover={{
                    borderColor: 'gray.300',
                    transform: 'translateY(-4px)',
                    shadow: 'lg',
                  }}
                  _dark={{
                    borderColor: 'gray.700',
                    bg: 'gray.800',
                    _hover: {
                      borderColor: 'gray.600',
                    },
                  }}
                >
                  <CardHeader>
                    <VStack align="start" spacing={4}>
                      <Icon
                        as={feature.icon}
                        boxSize={10}
                        color={feature.color}
                        transition="transform 0.3s"
                        _groupHover={{ transform: 'scale(1.1)' }}
                      />
                      <Heading as="h3" size="md">
                        {feature.title}
                      </Heading>
                    </VStack>
                  </CardHeader>
                  <CardBody pt={0}>
                    <Text
                      color="gray.600"
                      lineHeight="tall"
                      _dark={{ color: 'gray.400' }}
                    >
                      {feature.description}
                    </Text>
                  </CardBody>
                </Card>
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
      <Flex
        as="section"
        py={24}
        bgGradient="linear(to-br, brand.50, gray.50, teal.50)"
        _dark={{
          bgGradient: 'linear(to-br, brand.900, gray.900, teal.900)',
        }}
      >
        <Container maxW="container.xl">
          <VStack maxW="3xl" mx="auto" textAlign="center" spacing={8}>
            <Heading
              as="h2"
              fontSize={{ base: '3xl', md: '5xl' }}
              fontWeight="bold"
            >
              Ready to streamline your property management?
            </Heading>
            <Text
              fontSize="lg"
              color="gray.600"
              _dark={{ color: 'gray.400' }}
            >
              Join hundreds of property managers who trust Conglomo to run
              their business efficiently.
            </Text>
            <Flex
              direction={{ base: 'column', sm: 'row' }}
              gap={4}
            >
              <Button
                size="lg"
                colorScheme="brand"
                h={12}
                px={8}
                rightIcon={<Icon as={ArrowRight} boxSize={4} />}
              >
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" h={12} px={8}>
                Schedule Demo
              </Button>
            </Flex>
            <Flex
              direction={{ base: 'column', sm: 'row' }}
              gap={6}
              fontSize="sm"
              color="gray.600"
              _dark={{ color: 'gray.400' }}
            >
              <HStack spacing={2}>
                <Icon as={CheckCircle2} boxSize={4} color="teal.500" />
                <Text>Free 14-day trial</Text>
              </HStack>
              <HStack spacing={2}>
                <Icon as={CheckCircle2} boxSize={4} color="teal.500" />
                <Text>No credit card required</Text>
              </HStack>
              <HStack spacing={2}>
                <Icon as={CheckCircle2} boxSize={4} color="teal.500" />
                <Text>Cancel anytime</Text>
              </HStack>
            </Flex>
          </VStack>
        </Container>
      </Flex>

      {/* Footer */}
      <Flex
        as="footer"
        borderTop="1px"
        borderColor="gray.200"
        py={12}
        bg="whiteAlpha.500"
        _dark={{
          borderColor: 'gray.700',
          bg: 'gray.800',
        }}
      >
        <Container maxW="container.xl">
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }}
            gap={8}
            mb={8}
          >
            <GridItem>
              <VStack align="start" spacing={4}>
                <HStack spacing={2}>
                  <Icon as={Building2} boxSize={6} color="brand.500" />
                  <Text fontWeight="semibold">Conglomo</Text>
                </HStack>
                <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
                  Modern property management software for forward-thinking
                  teams.
                </Text>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack align="start" spacing={4}>
                <Heading as="h3" size="sm">
                  Product
                </Heading>
                <VStack align="start" spacing={2} fontSize="sm">
                  <Link
                    href="#"
                    color="gray.600"
                    _hover={{ color: 'gray.900' }}
                    _dark={{ color: 'gray.400', _hover: { color: 'gray.50' } }}
                  >
                    Features
                  </Link>
                  <Link
                    href="#"
                    color="gray.600"
                    _hover={{ color: 'gray.900' }}
                    _dark={{ color: 'gray.400', _hover: { color: 'gray.50' } }}
                  >
                    Pricing
                  </Link>
                  <Link
                    href="#"
                    color="gray.600"
                    _hover={{ color: 'gray.900' }}
                    _dark={{ color: 'gray.400', _hover: { color: 'gray.50' } }}
                  >
                    Security
                  </Link>
                  <Link
                    href="#"
                    color="gray.600"
                    _hover={{ color: 'gray.900' }}
                    _dark={{ color: 'gray.400', _hover: { color: 'gray.50' } }}
                  >
                    Roadmap
                  </Link>
                </VStack>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack align="start" spacing={4}>
                <Heading as="h3" size="sm">
                  Company
                </Heading>
                <VStack align="start" spacing={2} fontSize="sm">
                  <Link
                    href="#"
                    color="gray.600"
                    _hover={{ color: 'gray.900' }}
                    _dark={{ color: 'gray.400', _hover: { color: 'gray.50' } }}
                  >
                    About
                  </Link>
                  <Link
                    href="#"
                    color="gray.600"
                    _hover={{ color: 'gray.900' }}
                    _dark={{ color: 'gray.400', _hover: { color: 'gray.50' } }}
                  >
                    Blog
                  </Link>
                  <Link
                    href="#"
                    color="gray.600"
                    _hover={{ color: 'gray.900' }}
                    _dark={{ color: 'gray.400', _hover: { color: 'gray.50' } }}
                  >
                    Careers
                  </Link>
                  <Link
                    href="#"
                    color="gray.600"
                    _hover={{ color: 'gray.900' }}
                    _dark={{ color: 'gray.400', _hover: { color: 'gray.50' } }}
                  >
                    Contact
                  </Link>
                </VStack>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack align="start" spacing={4}>
                <Heading as="h3" size="sm">
                  Resources
                </Heading>
                <VStack align="start" spacing={2} fontSize="sm">
                  <Link
                    href="#"
                    color="gray.600"
                    _hover={{ color: 'gray.900' }}
                    _dark={{ color: 'gray.400', _hover: { color: 'gray.50' } }}
                  >
                    Documentation
                  </Link>
                  <Link
                    href="#"
                    color="gray.600"
                    _hover={{ color: 'gray.900' }}
                    _dark={{ color: 'gray.400', _hover: { color: 'gray.50' } }}
                  >
                    Help Center
                  </Link>
                  <Link
                    href="#"
                    color="gray.600"
                    _hover={{ color: 'gray.900' }}
                    _dark={{ color: 'gray.400', _hover: { color: 'gray.50' } }}
                  >
                    API Reference
                  </Link>
                  <Link
                    href="#"
                    color="gray.600"
                    _hover={{ color: 'gray.900' }}
                    _dark={{ color: 'gray.400', _hover: { color: 'gray.50' } }}
                  >
                    Community
                  </Link>
                </VStack>
              </VStack>
            </GridItem>
          </Grid>
          <Flex
            borderTop="1px"
            borderColor="gray.200"
            pt={8}
            direction={{ base: 'column', sm: 'row' }}
            justify="space-between"
            align="center"
            gap={4}
            fontSize="sm"
            color="gray.600"
            _dark={{
              borderColor: 'gray.700',
              color: 'gray.400',
            }}
          >
            <Text>&copy; 2025 Conglomo, Inc. | All rights reserved.</Text>
            <Flex gap={6}>
              <Link
                href="#"
                _hover={{ color: 'gray.900' }}
                _dark={{ _hover: { color: 'gray.50' } }}
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                _hover={{ color: 'gray.900' }}
                _dark={{ _hover: { color: 'gray.50' } }}
              >
                Terms of Service
              </Link>
            </Flex>
          </Flex>
        </Container>
      </Flex>
      <BackToTop />
    </Flex>
  )
}

export default LandingPage

