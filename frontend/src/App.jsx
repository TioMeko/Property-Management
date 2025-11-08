import { Box, Heading, Button, Text, VStack, HStack, Badge, useColorMode, IconButton, SimpleGrid } from '@chakra-ui/react'
import { Home, Moon, Sun } from 'lucide-react'

const App = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box 
      p={8} 
      maxW="1200px" 
      w="100%"
      mx="auto"
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <VStack spacing={6} align="stretch" w="100%">
        <HStack justify="space-between" align="center">
          <Box>
            <Heading size="2xl" mb={2}>Property Management SaaS</Heading>
          </Box>
          <IconButton
            icon={colorMode === 'light' ? <Moon /> : <Sun />}
            onClick={toggleColorMode}
            aria-label="Toggle color mode"
            variant="ghost"
          />
        </HStack>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <Box
            borderRadius="lg"
            boxShadow="sm"
            border="1px solid"
            borderColor="gray.200"
            bg="white"
            _dark={{ borderColor: 'gray.700', bg: 'gray.800' }}
            p={6}
          >
            <VStack spacing={4} align="stretch">
              <Heading size="md">Color Palette</Heading>
              <Text>
                Tokyo Neon inspired design with full light/dark mode support.
              </Text>
              
              <VStack spacing={2} align="stretch">
                <Text fontSize="sm" fontWeight="semibold">Primary Colors</Text>
                <HStack spacing={2}>
                  <Badge colorScheme="brand">Brand</Badge>
                  <Badge colorScheme="teal">Teal</Badge>
                  <Badge colorScheme="rose">Rose</Badge>
                  <Badge colorScheme="slate">Slate</Badge>
                </HStack>
              </VStack>

              <VStack spacing={2} align="stretch">
                <Text fontSize="sm" fontWeight="semibold">Semantic Colors</Text>
                <HStack spacing={2}>
                  <Badge colorScheme="success">Success</Badge>
                  <Badge colorScheme="warning">Warning</Badge>
                  <Badge colorScheme="error">Error</Badge>
                  <Badge colorScheme="info">Info</Badge>
                </HStack>
              </VStack>
            </VStack>
          </Box>

          <Box
            borderRadius="lg"
            boxShadow="sm"
            border="1px solid"
            borderColor="gray.200"
            bg="white"
            _dark={{ borderColor: 'gray.700', bg: 'gray.800' }}
            p={6}
          >
            <VStack spacing={4} align="stretch">
              <Heading size="md">Components</Heading>
              <Text>
                Button variants and interactive elements.
              </Text>
              
              <VStack spacing={3} align="stretch">
                <HStack spacing={4}>
                  <Button leftIcon={<Home />} colorScheme="brand">
                    Primary
                  </Button>
                  <Button variant="outline" colorScheme="brand">
                    Outline
                  </Button>
                  <Button variant="ghost" colorScheme="brand">
                    Ghost
                  </Button>
                </HStack>

                <HStack spacing={4}>
                  <Button colorScheme="teal" size="sm">Teal</Button>
                  <Button colorScheme="rose" size="sm">Rose</Button>
                  <Button colorScheme="slate" size="sm">Slate</Button>
                </HStack>
              </VStack>
            </VStack>
          </Box>
        </SimpleGrid>
      </VStack>
    </Box>
  )
}

export default App