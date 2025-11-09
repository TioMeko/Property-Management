import {
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Flex,
  Icon,
} from '@chakra-ui/react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const CTA = () => {
  return (
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
  )
}

export default CTA

