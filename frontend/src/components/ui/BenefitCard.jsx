import { VStack, Flex, Icon, Heading, Text } from '@chakra-ui/react'

const BenefitCard = ({ icon, title, description }) => {
  return (
    <VStack textAlign="center" spacing={4}>
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
          as={icon}
          boxSize={8}
          color="brand.500"
        />
      </Flex>
      <Heading as="h3" size="lg">
        {title}
      </Heading>
      <Text
        color="gray.600"
        lineHeight="tall"
        _dark={{ color: 'gray.400' }}
      >
        {description}
      </Text>
    </VStack>
  )
}

export default BenefitCard

