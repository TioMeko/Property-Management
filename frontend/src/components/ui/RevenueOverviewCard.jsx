import {
  Box,
  VStack,
  HStack,
  Flex,
  Text,
  Heading,
  Badge,
  SimpleGrid,
  Icon,
} from '@chakra-ui/react'
import { TrendingUp } from 'lucide-react'

const RevenueOverviewCard = ({
  title = 'Monthly Revenue',
  totalRevenue,
  trendAmount,
  period = 'December 2024',
  stats = [],
  bgGradient = 'linear(to-br, brand.500, brand.700)',
}) => {
  return (
    <Box
      p={8}
      borderRadius="2xl"
      bgGradient={bgGradient}
      color="white"
    >
      <VStack align="stretch" spacing={6}>
        <Flex justify="space-between" align="start">
          <VStack align="start" spacing={2}>
            <Text fontSize="sm" opacity={0.9}>
              {title}
            </Text>
            <Heading size="2xl">{totalRevenue}</Heading>
            {trendAmount && (
              <HStack spacing={2}>
                <Icon as={TrendingUp} boxSize={4} />
                <Text fontSize="sm" opacity={0.9}>
                  {trendAmount} from last month
                </Text>
              </HStack>
            )}
          </VStack>
          <Badge
            bg="white"
            color="brand.600"
            fontSize="xs"
            px={3}
            py={1}
            borderRadius="full"
          >
            {period}
          </Badge>
        </Flex>

        <SimpleGrid columns={{ base: 2, md: 4 }} gap={6} pt={4}>
          {stats.map((stat, index) => (
            <VStack key={index} align="start" spacing={1}>
              <Text fontSize="xs" opacity={0.8}>
                {stat.label}
              </Text>
              <Text fontSize="xl" fontWeight="bold">
                {stat.value}
              </Text>
              <Text fontSize="xs" opacity={0.7}>
                {stat.description}
              </Text>
            </VStack>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  )
}

export default RevenueOverviewCard

