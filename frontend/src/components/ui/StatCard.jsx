import { VStack, Text } from '@chakra-ui/react'
import React from 'react'

const StatCard = ({ label, value, company }) => {
  return (
    <VStack spacing={1}>
      <Text
        fontSize={{ base: '3xl', md: '4xl' }}
        fontWeight="bold"
      >
        {value}
      </Text>
      <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
        {label}
      </Text>
      <Text fontSize="xs" color="gray.500" _dark={{ color: 'gray.500' }}>
        {company}
      </Text>
    </VStack>
  )
}

export default StatCard

