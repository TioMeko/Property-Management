import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  Icon,
  Flex,
  Button,
} from '@chakra-ui/react'
import { 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  XCircle,
  Download,
} from 'lucide-react'
import React from 'react'

const statusConfig = {
  paid: {
    icon: CheckCircle2,
    color: 'success',
    bg: 'success.50',
    iconBg: 'success.100',
    iconColor: 'success.500',
    darkBg: 'success.900',
    darkIconBg: 'success.800',
    label: 'Paid',
  },
  pending: {
    icon: Clock,
    color: 'warning',
    bg: 'warning.50',
    iconBg: 'warning.100',
    iconColor: 'warning.500',
    darkBg: 'warning.900',
    darkIconBg: 'warning.800',
    label: 'Pending',
  },
  overdue: {
    icon: XCircle,
    color: 'error',
    bg: 'error.50',
    iconBg: 'error.100',
    iconColor: 'error.500',
    darkBg: 'error.900',
    darkIconBg: 'error.800',
    label: 'Overdue',
  },
  partial: {
    icon: Clock,
    color: 'info',
    bg: 'blue.50',
    iconBg: 'blue.100',
    iconColor: 'blue.500',
    darkBg: 'blue.900',
    darkIconBg: 'blue.800',
    label: 'Partial',
  },
}

const PaymentCard = ({ payment, onDownloadReceipt }) => {
  const {
    amount,
    dueDate,
    paidDate,
    status,
    paymentMethod,
    transactionId,
  } = payment

  const config = statusConfig[status] || statusConfig.pending

  const formatCurrency = (amount) => `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

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
        {/* Header */}
        <HStack justify="space-between">
          <HStack spacing={3}>
            <Flex
              align="center"
              justify="center"
              w={12}
              h={12}
              borderRadius="xl"
              bg={config.iconBg}
              _dark={{ bg: config.darkIconBg }}
            >
              <Icon as={config.icon} boxSize={6} color={config.iconColor} />
            </Flex>
            <VStack align="start" spacing={0}>
              <Text fontSize="2xl" fontWeight="bold">
                {formatCurrency(amount)}
              </Text>
              <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
                Monthly Rent
              </Text>
            </VStack>
          </HStack>
          
          <Badge colorScheme={config.color} fontSize="sm" px={3} py={1} borderRadius="full">
            {config.label}
          </Badge>
        </HStack>

        {/* Details */}
        <VStack align="stretch" spacing={2} pt={2} borderTopWidth="1px" borderColor="gray.100" _dark={{ borderColor: 'gray.700' }}>
          <HStack justify="space-between">
            <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
              Due Date:
            </Text>
            <Text fontSize="sm" fontWeight="medium">
              {formatDate(dueDate)}
            </Text>
          </HStack>
          
          {paidDate && (
            <HStack justify="space-between">
              <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
                Paid Date:
              </Text>
              <Text fontSize="sm" fontWeight="medium">
                {formatDate(paidDate)}
              </Text>
            </HStack>
          )}

          {paymentMethod && (
            <HStack justify="space-between">
              <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
                Payment Method:
              </Text>
              <Text fontSize="sm" fontWeight="medium" textTransform="capitalize">
                {paymentMethod.replace('_', ' ')}
              </Text>
            </HStack>
          )}

          {transactionId && (
            <HStack justify="space-between">
              <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
                Transaction ID:
              </Text>
              <Text fontSize="xs" fontFamily="mono" color="gray.500">
                {transactionId}
              </Text>
            </HStack>
          )}
        </VStack>

        {/* Actions */}
        {status === 'paid' && onDownloadReceipt && (
          <Button
            leftIcon={<Icon as={Download} />}
            variant="outline"
            size="sm"
            onClick={() => onDownloadReceipt(payment)}
          >
            Download Receipt
          </Button>
        )}
      </VStack>
    </Box>
  )
}

export default PaymentCard

