import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Text,
  Radio,
  RadioGroup,
  Stack,
  Flex,
  Box,
  Icon,
  Divider,
  useToast,
} from '@chakra-ui/react'
import { CreditCard, Building2, Smartphone, CheckCircle2 } from 'lucide-react'
import React, { useState } from 'react'

const paymentMethods = [
  {
    id: 'credit_card',
    label: 'Credit / Debit Card',
    icon: CreditCard,
    description: 'Visa, Mastercard, Amex',
  },
  {
    id: 'bank_transfer',
    label: 'Bank Transfer (ACH)',
    icon: Building2,
    description: 'Direct from your bank account',
  },
  {
    id: 'mobile_payment',
    label: 'Mobile Payment',
    icon: Smartphone,
    description: 'Apple Pay, Google Pay',
  },
]

const PaymentModal = ({ isOpen, onClose, paymentInfo, onSubmit }) => {
  const toast = useToast()
  const [selectedMethod, setSelectedMethod] = useState('credit_card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    amount: paymentInfo?.amount || '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    setIsProcessing(true)
    
    try {
      // TODO: API call to process payment
      await onSubmit({
        ...formData,
        paymentMethod: selectedMethod,
        paymentId: paymentInfo?.id,
      })
      
      toast({
        title: 'Payment successful',
        description: 'Your rent payment has been processed successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      
      handleClose()
    } catch {
      toast({
        title: 'Payment failed',
        description: 'There was an error processing your payment. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleClose = () => {
    setFormData({
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
      amount: paymentInfo?.amount || '',
    })
    setSelectedMethod('credit_card')
    onClose()
  }

  const formatCurrency = (amount) => 
    `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="xl" isCentered>
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent>
        <ModalHeader>Pay Rent</ModalHeader>
        <ModalCloseButton />
        
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <VStack spacing={6} align="stretch">
              {/* Payment Summary */}
              <Box
                p={4}
                borderRadius="lg"
                bg="brand.50"
                borderWidth="1px"
                borderColor="brand.200"
                _dark={{ bg: 'brand.900', borderColor: 'brand.700' }}
              >
                <VStack spacing={2}>
                  <HStack justify="space-between" w="full">
                    <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
                      Monthly Rent
                    </Text>
                    <Text fontSize="sm" fontWeight="medium">
                      {formatCurrency(paymentInfo?.amount || 0)}
                    </Text>
                  </HStack>
                  {paymentInfo?.lateFee > 0 && (
                    <HStack justify="space-between" w="full">
                      <Text fontSize="sm" color="error.500">
                        Late Fee
                      </Text>
                      <Text fontSize="sm" fontWeight="medium" color="error.500">
                        {formatCurrency(paymentInfo.lateFee)}
                      </Text>
                    </HStack>
                  )}
                  <Divider />
                  <HStack justify="space-between" w="full">
                    <Text fontSize="lg" fontWeight="bold">
                      Total Amount
                    </Text>
                    <Text fontSize="2xl" fontWeight="bold" color="brand.600">
                      {formatCurrency((paymentInfo?.amount || 0) + (paymentInfo?.lateFee || 0))}
                    </Text>
                  </HStack>
                </VStack>
              </Box>

              {/* Payment Method Selection */}
              <FormControl isRequired>
                <FormLabel fontSize="sm" fontWeight="medium">
                  Payment Method
                </FormLabel>
                <RadioGroup value={selectedMethod} onChange={setSelectedMethod}>
                  <VStack align="stretch" spacing={3}>
                    {paymentMethods.map((method) => (
                      <Box
                        key={method.id}
                        p={4}
                        borderWidth="2px"
                        borderRadius="lg"
                        borderColor={
                          selectedMethod === method.id
                            ? 'brand.500'
                            : 'gray.200'
                        }
                        bg={
                          selectedMethod === method.id
                            ? 'brand.50'
                            : 'transparent'
                        }
                        cursor="pointer"
                        transition="all 0.2s"
                        onClick={() => setSelectedMethod(method.id)}
                        _hover={{ borderColor: 'brand.300' }}
                        _dark={{
                          borderColor:
                            selectedMethod === method.id
                              ? 'brand.500'
                              : 'gray.600',
                          bg:
                            selectedMethod === method.id
                              ? 'brand.900'
                              : 'transparent',
                        }}
                      >
                        <HStack justify="space-between">
                          <HStack spacing={3}>
                            <Flex
                              align="center"
                              justify="center"
                              w={10}
                              h={10}
                              borderRadius="lg"
                              bg="gray.100"
                              _dark={{ bg: 'gray.700' }}
                            >
                              <Icon as={method.icon} boxSize={5} />
                            </Flex>
                            <VStack align="start" spacing={0}>
                              <Text fontSize="sm" fontWeight="medium">
                                {method.label}
                              </Text>
                              <Text fontSize="xs" color="gray.500">
                                {method.description}
                              </Text>
                            </VStack>
                          </HStack>
                          <Radio value={method.id} colorScheme="brand" />
                        </HStack>
                      </Box>
                    ))}
                  </VStack>
                </RadioGroup>
              </FormControl>

              {/* Payment Details (for credit card) */}
              {selectedMethod === 'credit_card' && (
                <VStack spacing={4} align="stretch">
                  <FormControl isRequired>
                    <FormLabel fontSize="sm">Card Number</FormLabel>
                    <Input
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel fontSize="sm">Cardholder Name</FormLabel>
                    <Input
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      placeholder="John Doe"
                    />
                  </FormControl>

                  <HStack spacing={4}>
                    <FormControl isRequired>
                      <FormLabel fontSize="sm">Expiry Date</FormLabel>
                      <Input
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel fontSize="sm">CVV</FormLabel>
                      <Input
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="123"
                        maxLength={4}
                        type="password"
                      />
                    </FormControl>
                  </HStack>
                </VStack>
              )}

              {/* Bank Transfer Instructions */}
              {selectedMethod === 'bank_transfer' && (
                <Box
                  p={4}
                  borderRadius="lg"
                  bg="blue.50"
                  _dark={{ bg: 'blue.900' }}
                >
                  <VStack align="start" spacing={2}>
                    <Text fontSize="sm" fontWeight="medium">
                      ACH Transfer will be initiated from your linked bank account
                    </Text>
                    <Text fontSize="xs" color="gray.600" _dark={{ color: 'gray.400' }}>
                      Processing time: 1-3 business days
                    </Text>
                  </VStack>
                </Box>
              )}

              {/* Mobile Payment Instructions */}
              {selectedMethod === 'mobile_payment' && (
                <Box
                  p={4}
                  borderRadius="lg"
                  bg="purple.50"
                  _dark={{ bg: 'purple.900' }}
                >
                  <VStack align="start" spacing={2}>
                    <Text fontSize="sm" fontWeight="medium">
                      You'll be redirected to complete payment with your mobile wallet
                    </Text>
                    <Text fontSize="xs" color="gray.600" _dark={{ color: 'gray.400' }}>
                      Instant processing
                    </Text>
                  </VStack>
                </Box>
              )}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={handleClose}>
              Cancel
            </Button>
            <Button
              colorScheme="brand"
              type="submit"
              isLoading={isProcessing}
              loadingText="Processing..."
              leftIcon={<Icon as={CheckCircle2} />}
            >
              Pay {formatCurrency((paymentInfo?.amount || 0) + (paymentInfo?.lateFee || 0))}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default PaymentModal

