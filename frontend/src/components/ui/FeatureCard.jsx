import {
  Card,
  CardHeader,
  CardBody,
  VStack,
  Heading,
  Text,
  Icon,
} from '@chakra-ui/react'

const FeatureCard = ({ icon, title, description, color = 'brand.500' }) => {
  return (
    <Card
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
            as={icon}
            boxSize={10}
            color={color}
            transition="transform 0.3s"
            _groupHover={{ transform: 'scale(1.1)' }}
          />
          <Heading as="h3" size="md">
            {title}
          </Heading>
        </VStack>
      </CardHeader>
      <CardBody pt={0}>
        <Text
          color="gray.600"
          lineHeight="tall"
          _dark={{ color: 'gray.400' }}
        >
          {description}
        </Text>
      </CardBody>
    </Card>
  )
}

export default FeatureCard

