import {
  Box,
  VStack,
  Text,
  Progress,
  Flex,
  HStack,
  Icon,
} from '@chakra-ui/react'
import { Info } from 'lucide-react'

const ProgressCard = ({
  title,
  description,
  current,
  total,
  unit = '',
  showPercentage = true,
  colorScheme = 'brand',
}) => {
  const percentage = (current / total) * 100
  const isNearLimit = percentage > 80

  return (
    <Box
      p={6}
      borderRadius="xl"
      borderWidth="1px"
      borderColor="gray.200"
      bg="white"
      _dark={{
        borderColor: 'gray.700',
        bg: 'gray.800',
      }}
    >
      <VStack align="stretch" spacing={4}>
        <Flex justify="space-between" align="start">
          <VStack align="start" spacing={1}>
            <HStack spacing={2}>
              <Text fontWeight="semibold" fontSize="md">
                {title}
              </Text>
              {description && (
                <Icon
                  as={Info}
                  boxSize={4}
                  color="gray.400"
                  cursor="help"
                  title={description}
                />
              )}
            </HStack>
            <Text fontSize="xs" color="gray.500">
              {description}
            </Text>
          </VStack>
          {showPercentage && (
            <Text
              fontSize="sm"
              fontWeight="medium"
              color={isNearLimit ? 'warning.600' : 'gray.600'}
              _dark={{
                color: isNearLimit ? 'warning.400' : 'gray.400',
              }}
            >
              {percentage.toFixed(1)}%
            </Text>
          )}
        </Flex>

        <VStack align="stretch" spacing={2}>
          <Progress
            value={percentage}
            size="sm"
            borderRadius="full"
            colorScheme={isNearLimit ? 'warning' : colorScheme}
            bg="gray.200"
            _dark={{ bg: 'gray.700' }}
          />
          <Flex justify="space-between" fontSize="xs" color="gray.500">
            <Text>
              {current.toLocaleString()} {unit}
            </Text>
            <Text>
              {total.toLocaleString()} {unit}
            </Text>
          </Flex>
        </VStack>
      </VStack>
    </Box>
  )
}

export default ProgressCard

