import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  HStack,
  Text,
  Icon,
  Box,
  useToast,
  SimpleGrid,
} from '@chakra-ui/react'
import { Calendar, Clock, Home, Wrench, FileText, Shield } from 'lucide-react'
import React, { useState } from 'react'

const inspectionTypes = [
  {
    id: 'move_in',
    label: 'Move-In Inspection',
    icon: Home,
    description: 'Document property condition before moving in',
  },
  {
    id: 'move_out',
    label: 'Move-Out Inspection',
    icon: Home,
    description: 'Final inspection before lease termination',
  },
  {
    id: 'routine',
    label: 'Routine Inspection',
    icon: FileText,
    description: 'Regular property maintenance check',
  },
  {
    id: 'maintenance',
    label: 'Maintenance Inspection',
    icon: Wrench,
    description: 'Inspection related to maintenance request',
  },
  {
    id: 'safety',
    label: 'Safety Inspection',
    icon: Shield,
    description: 'Fire safety and building code compliance',
  },
]

const timeSlots = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
]

const ScheduleInspectionModal = ({ isOpen, onClose, onSubmit, editInspection }) => {
  const toast = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    type: editInspection?.type || '',
    date: editInspection?.scheduledDate?.split('T')[0] || '',
    time: editInspection?.scheduledDate
      ? new Date(editInspection.scheduledDate).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
      : '',
    notes: editInspection?.notes || '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleTypeSelect = (typeId) => {
    setFormData((prev) => ({ ...prev, type: typeId }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.type || !formData.date || !formData.time) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields (Type, Date, Time).',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    setIsSubmitting(true)
    try {
      // Combine date and time
      const scheduledDateTime = new Date(`${formData.date} ${formData.time}`).toISOString()

      await onSubmit({
        ...formData,
        scheduledDate: scheduledDateTime,
        id: editInspection?.id,
      })

      toast({
        title: editInspection ? 'Inspection Rescheduled' : 'Inspection Scheduled',
        description: editInspection
          ? 'Your inspection has been successfully rescheduled.'
          : 'Your inspection has been successfully scheduled.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

      handleClose()
    } catch {
      toast({
        title: 'Scheduling failed',
        description: 'There was an error scheduling your inspection. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setFormData({
      type: '',
      date: '',
      time: '',
      notes: '',
    })
    onClose()
  }

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0]

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="xl" isCentered scrollBehavior="inside">
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(10deg)" />
      <ModalContent borderRadius="xl" overflow="hidden">
        <ModalHeader borderBottomWidth="1px" borderColor="gray.100" _dark={{ borderColor: 'gray.700' }}>
          {editInspection ? 'Reschedule Inspection' : 'Schedule Inspection'}
        </ModalHeader>
        <ModalCloseButton />

        <form onSubmit={handleSubmit}>
          <ModalBody pb={6}>
            <VStack spacing={5} align="stretch">
              {/* Inspection Type */}
              <FormControl isRequired>
                <FormLabel fontSize="sm" fontWeight="medium">
                  Inspection Type
                </FormLabel>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                  {inspectionTypes.map((type) => (
                    <Box
                      key={type.id}
                      p={4}
                      borderWidth="2px"
                      borderRadius="lg"
                      borderColor={
                        formData.type === type.id ? 'brand.500' : 'gray.200'
                      }
                      bg={
                        formData.type === type.id ? 'brand.50' : 'transparent'
                      }
                      cursor="pointer"
                      transition="all 0.2s"
                      onClick={() => handleTypeSelect(type.id)}
                      _hover={{ borderColor: 'brand.300' }}
                      _dark={{
                        borderColor:
                          formData.type === type.id ? 'brand.500' : 'gray.600',
                        bg:
                          formData.type === type.id ? 'brand.900' : 'transparent',
                      }}
                    >
                      <VStack align="start" spacing={2}>
                        <HStack>
                          <Icon as={type.icon} color="brand.500" boxSize={5} />
                          <Text fontSize="sm" fontWeight="semibold">
                            {type.label}
                          </Text>
                        </HStack>
                        <Text fontSize="xs" color="gray.600" _dark={{ color: 'gray.400' }}>
                          {type.description}
                        </Text>
                      </VStack>
                    </Box>
                  ))}
                </SimpleGrid>
              </FormControl>

              {/* Date Selection */}
              <FormControl isRequired>
                <FormLabel fontSize="sm" fontWeight="medium">
                  <HStack>
                    <Icon as={Calendar} boxSize={4} />
                    <Text>Preferred Date</Text>
                  </HStack>
                </FormLabel>
                <Input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={today}
                  size="lg"
                />
              </FormControl>

              {/* Time Selection */}
              <FormControl isRequired>
                <FormLabel fontSize="sm" fontWeight="medium">
                  <HStack>
                    <Icon as={Clock} boxSize={4} />
                    <Text>Preferred Time</Text>
                  </HStack>
                </FormLabel>
                <Select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  placeholder="Select time slot"
                  size="lg"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </Select>
              </FormControl>

              {/* Additional Notes */}
              <FormControl>
                <FormLabel fontSize="sm" fontWeight="medium">
                  Additional Notes (Optional)
                </FormLabel>
                <Textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any specific concerns or areas you'd like the inspector to focus on..."
                  rows={4}
                />
              </FormControl>

              {/* Info Box */}
              <Box
                p={4}
                borderRadius="lg"
                bg="blue.50"
                _dark={{ bg: 'blue.900' }}
                borderWidth="1px"
                borderColor="blue.200"
                _dark={{ borderColor: 'blue.700' }}
              >
                <VStack align="start" spacing={2}>
                  <Text fontSize="sm" fontWeight="medium" color="blue.700" _dark={{ color: 'blue.300' }}>
                    What to Expect
                  </Text>
                  <Text fontSize="xs" color="gray.600" _dark={{ color: 'gray.400' }}>
                    • An inspector will contact you 24 hours before the scheduled time
                  </Text>
                  <Text fontSize="xs" color="gray.600" _dark={{ color: 'gray.400' }}>
                    • Inspections typically take 30-60 minutes
                  </Text>
                  <Text fontSize="xs" color="gray.600" _dark={{ color: 'gray.400' }}>
                    • You'll receive a detailed report within 48 hours
                  </Text>
                </VStack>
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter borderTopWidth="1px" borderColor="gray.100" _dark={{ borderColor: 'gray.700' }}>
            <Button variant="ghost" mr={3} onClick={handleClose}>
              Cancel
            </Button>
            <Button
              colorScheme="brand"
              type="submit"
              isLoading={isSubmitting}
              loadingText="Scheduling..."
            >
              {editInspection ? 'Reschedule' : 'Schedule Inspection'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default ScheduleInspectionModal

