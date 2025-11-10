# Payment Components

Components for managing rent payments in the Property Management application.

## Components

### PaymentCard
Displays a single payment record with status, dates, payment method, and transaction details.

**Props:**
- `payment` - Object containing payment details
- `onDownloadReceipt` - Optional callback to download receipt (only shown for paid payments)

**Payment Object Structure:**
```javascript
{
  id: string,
  amount: number,
  dueDate: string, // ISO 8601 datetime
  paidDate?: string, // ISO 8601 datetime
  status: 'paid' | 'pending' | 'overdue' | 'partial',
  paymentMethod?: 'credit_card' | 'bank_transfer' | 'mobile_payment',
  transactionId?: string,
}
```

**Features:**
- Color-coded status indicators with icons
- Formatted currency and date displays
- Transaction ID display (monospace font)
- Download receipt button for paid payments
- Clean, minimal design with proper dark mode support

---

### PaymentModal
A modal form for processing rent payments with multiple payment method options.

**Props:**
- `isOpen` - Boolean to control modal visibility
- `onClose` - Callback to close the modal
- `paymentInfo` - Object with payment details (amount, due date, late fees)
- `onSubmit` - Async callback function to handle payment submission

**Payment Info Structure:**
```javascript
{
  id: string,
  amount: number,
  dueDate: string,
  lateFee: number,
}
```

**Form Data Structure (passed to `onSubmit`):**
```javascript
{
  cardNumber: string,
  cardName: string,
  expiryDate: string,
  cvv: string,
  amount: number,
  paymentMethod: 'credit_card' | 'bank_transfer' | 'mobile_payment',
  paymentId: string,
}
```

**Features:**
- Multiple payment methods:
  - Credit/Debit Card with full form
  - Bank Transfer (ACH) with instructions
  - Mobile Payment (Apple Pay, Google Pay) with instructions
- Payment summary with late fees
- Interactive payment method selection cards
- Form validation
- Loading states during processing
- Toast notifications for success/failure
- Auto-reset form on successful submission
- Backdrop blur effect

---

## Usage Example (Payments Page)

```jsx
import {
  Box, VStack, HStack, Text, Button, Icon, SimpleGrid, Heading, Badge,
  useDisclosure, Alert, AlertIcon, AlertTitle, AlertDescription
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
    // ... more payments
  ])

  const handlePayNow = () => {
    setSelectedPayment({ ...currentBalance, id: 'current' })
    onOpen()
  }

  const handleSubmitPayment = async (paymentData) => {
    console.log('Processing payment:', paymentData)
    // API call to process payment
  }

  const handleDownloadReceipt = (payment) => {
    console.log('Downloading receipt for payment:', payment.id)
    // API call to download receipt
  }

  return (
    <DashboardLayout userType="tenant">
      <PaymentModal
        isOpen={isOpen}
        onClose={onClose}
        paymentInfo={selectedPayment}
        onSubmit={handleSubmitPayment}
      />

      <VStack align="stretch" spacing={6}>
        {/* Payment Due Alert */}
        <Alert status="warning" variant="left-accent">
          <AlertIcon as={Calendar} />
          <Box flex={1}>
            <AlertTitle>Payment Due Soon</AlertTitle>
            <AlertDescription>
              Your rent payment is due on January 1, 2025 (22 days)
            </AlertDescription>
          </Box>
          <Button colorScheme="warning" onClick={handlePayNow}>
            Pay Now
          </Button>
        </Alert>

        {/* Payment Stats */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <MetricCard
            title="Current Balance"
            value="$1,250.00"
            icon={DollarSign}
            onClick={handlePayNow}
          />
          {/* ... more metrics */}
        </SimpleGrid>

        {/* Payment History */}
        <Box>
          <HStack justify="space-between" mb={4}>
            <Heading size="md">Payment History</Heading>
            <Badge>{paymentHistory.length} Payments</Badge>
          </HStack>
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
            {paymentHistory.map((payment) => (
              <PaymentCard
                key={payment.id}
                payment={payment}
                onDownloadReceipt={handleDownloadReceipt}
              />
            ))}
          </SimpleGrid>
        </Box>
      </VStack>
    </DashboardLayout>
  )
}

export default Payments
```

---

## API Integration Points

### Get Current Balance
```javascript
GET /api/payments/balance
Response: {
  amount: number,
  dueDate: string,
  lateFee: number,
  status: string
}
```

### Get Payment History
```javascript
GET /api/payments/history?limit=12
Response: {
  payments: Payment[]
}
```

### Process Payment
```javascript
POST /api/payments
Body: {
  amount: number,
  paymentMethod: string,
  paymentDetails: object
}
Response: {
  transactionId: string,
  status: string,
  receipt: string
}
```

### Download Receipt
```javascript
GET /api/payments/:id/receipt
Response: PDF file
```

---

## Implemented Features
- ✅ Payment history display
- ✅ Current balance overview
- ✅ Multiple payment methods
- ✅ Payment processing modal
- ✅ Receipt download
- ✅ Payment statistics
- ✅ Due date alerts
- ✅ Overdue warnings
- ✅ Late fee calculation display
- ✅ Responsive design
- ✅ Dark mode support

## Future Enhancements
- 🔲 Auto-pay setup
- 🔲 Payment scheduling
- 🔲 Payment reminders
- 🔲 Saved payment methods
- 🔲 Payment disputes
- 🔲 Partial payments
- 🔲 Payment plans
- 🔲 Electronic receipt storage

