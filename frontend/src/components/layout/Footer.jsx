import {
  Container,
  Flex,
  Text,
  Heading,
  Grid,
  GridItem,
  VStack,
  HStack,
  Link,
  Icon,
} from '@chakra-ui/react'
import { Building2 } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
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
  )
}

export default Footer

