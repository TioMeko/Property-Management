import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Icon,
  Flex,
  Heading,
  SimpleGrid,
  Badge,
  useDisclosure,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { DollarSign, TrendingUp, Calendar, AlertCircle } from 'lucide-react'
import React, { useState } from 'react'
import DashboardLayout from '../components/layout/DashboardLayout'
import PaymentCard from '../components/payments/PaymentCard'
import PaymentModal from '../components/payments/PaymentModal'
import MetricCard from '../components/ui/MetricCard'

const Payments = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedPayment, setSelectedPayment] = useState(null)

  // Mock data - replace with API calls
  const [currentBalance] = useState({
    amount: 1250,
    dueDate: '2025-01-01',
    lateFee: 0,
    status: 'pending',
  })

  const [paymentHistory] = useState([
    {
      id: '1',
      amount: 1250,
      dueDate: '2024-12-01',
      paidDate: '2024-11-28',
      status: 'paid',
      paymentMethod: 'credit_card',
      transactionId: 'TXN-20241128-001',
    },
    {
      id: '2',
      amount: 1250,
      dueDate: '2024-11-01',
      paidDate: '2024-10-30',
      status: 'paid',
      paymentMethod: 'bank_transfer',
      transactionId: 'TXN-20241030-002',
    },
    {
      id: '3',
      amount: 1250,
      dueDate: '2024-10-01',
      paidDate: '2024-09-29',
      status: 'paid',
      paymentMethod: 'credit_card',
      transactionId: 'TXN-20240929-003',
    },
    {
      id: '4',
      amount: 1250,
      dueDate: '2024-09-01',
      paidDate: '2024-08-31',
      status: 'paid',
      paymentMethod: 'mobile_payment',
      transactionId: 'TXN-20240831-004',
    },
  ])

  const [paymentStats] = useState({
    totalPaid: 15000,
    onTimePayments: 12,
    averagePaymentDay: 28,
  })

  const handlePayNow = () => {
    setSelectedPayment({
      ...currentBalance,
      id: 'current',
    })
    onOpen()
  }

  const handleSubmitPayment = async (paymentData) => {
    console.log('Processing payment:', paymentData)
    // TODO: API call to process payment
    // await fetch('/api/payments', { method: 'POST', body: paymentData })
  }

  const handleDownloadReceipt = (payment) => {
    console.log('Downloading receipt for payment:', payment.id)
    // TODO: API call to download receipt
    // window.open(`/api/payments/${payment.id}/receipt`, '_blank')
  }

  const formatCurrency = (amount) => 
    `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getDaysUntilDue = (dueDate) => {
    const due = new Date(dueDate)
    const today = new Date()
    const diffTime = due - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const daysUntilDue = getDaysUntilDue(currentBalance.dueDate)
  const isOverdue = daysUntilDue < 0

  return (
    <DashboardLayout userType="tenant">
      <PaymentModal
        isOpen={isOpen}
        onClose={onClose}
        paymentInfo={selectedPayment}
        onSubmit={handleSubmitPayment}
      />

      <VStack align="stretch" spacing={6} w="full" p={{ base: 4, md: 6, lg: 8 }}>
        {/* Header */}
        <Flex justify="space-between" align="center" flexWrap="wrap" gap={4}>
          <Box>
            <Heading size="lg" mb={1}>
              Rent & Payments
            </Heading>
            <Text color="gray.600" _dark={{ color: 'gray.400' }}>
              Manage your rent payments and view payment history
            </Text>
          </Box>
        </Flex>

        {/* Current Balance Alert */}
        {currentBalance.status === 'pending' && (
          <Alert
            status={isOverdue ? 'error' : 'warning'}
            variant="left-accent"
            borderRadius="xl"
            minH="100px"
          >
            <AlertIcon as={isOverdue ? AlertCircle : Calendar} boxSize={5} />
            <Flex
              direction={{ base: 'column', md: 'row' }}
              align={{ base: 'start', md: 'center' }}
              justify="space-between"
              flex={1}
              gap={4}
            >
              <Box flex={1}>
                <AlertTitle fontSize="lg" mb={1}>
                  {isOverdue ? 'Payment Overdue' : 'Payment Due Soon'}
                </AlertTitle>
                <AlertDescription display="block" fontSize="md">
                  {isOverdue 
                    ? `Your payment is ${Math.abs(daysUntilDue)} days overdue. Please pay as soon as possible.`
                    : `Your rent payment of ${formatCurrency(currentBalance.amount)} is due on ${formatDate(currentBalance.dueDate)} (${daysUntilDue} days)`
                  }
                </AlertDescription>
              </Box>
              <Button
                colorScheme={isOverdue ? 'error' : 'warning'}
                size="md"
                onClick={handlePayNow}
                flexShrink={0}
              >
                Pay Now
              </Button>
            </Flex>
          </Alert>
        )}

        {/* Payment Stats */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <MetricCard
            title="Current Balance"
            value={formatCurrency(currentBalance.amount)}
            subValue={`Due: ${formatDate(currentBalance.dueDate)}`}
            icon={DollarSign}
            iconColor="brand.500"
            onClick={currentBalance.status === 'pending' ? handlePayNow : undefined}
          />
          <MetricCard
            title="Total Paid (This Year)"
            value={formatCurrency(paymentStats.totalPaid)}
            subValue={`${paymentStats.onTimePayments} on-time payments`}
            icon={TrendingUp}
            iconColor="success.500"
          />
          <MetricCard
            title="Average Payment Day"
            value={`Day ${paymentStats.averagePaymentDay}`}
            subValue="of the month"
            icon={Calendar}
            iconColor="info.500"
          />
        </SimpleGrid>

        {/* Payment History */}
        <Box>
          <HStack justify="space-between" mb={4}>
            <Heading size="md">Payment History</Heading>
            <Badge colorScheme="green" fontSize="sm" px={3} py={1} borderRadius="full">
              {paymentHistory.length} Payments
            </Badge>
          </HStack>

          {paymentHistory.length > 0 ? (
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
              {paymentHistory.map((payment) => (
                <PaymentCard
                  key={payment.id}
                  payment={payment}
                  onDownloadReceipt={handleDownloadReceipt}
                />
              ))}
            </SimpleGrid>
          ) : (
            <Flex
              direction="column"
              align="center"
              justify="center"
              py={16}
              px={4}
              borderRadius="xl"
              borderWidth="2px"
              borderStyle="dashed"
              borderColor="gray.300"
              _dark={{ borderColor: 'gray.600' }}
            >
              <Icon as={DollarSign} boxSize={12} color="gray.400" mb={4} />
              <Heading size="md" color="gray.600" _dark={{ color: 'gray.400' }} mb={2}>
                No payment history
              </Heading>
              <Text color="gray.500" textAlign="center" maxW="md">
                Your payment history will appear here once you make your first payment
              </Text>
            </Flex>
          )}
        </Box>
      </VStack>
    </DashboardLayout>
  )
}

export default Payments

