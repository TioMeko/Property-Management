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
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  HStack,
  Text,
  Icon,
  Box,
  useToast,
} from '@chakra-ui/react'
import { AlertCircle } from 'lucide-react'
import React, { useState } from 'react'

const categoryOptions = [
  { value: 'plumbing', label: 'Plumbing' },
  { value: 'electrical', label: 'Electrical' },
  { value: 'hvac', label: 'HVAC' },
  { value: 'appliance', label: 'Appliance' },
  { value: 'structural', label: 'Structural' },
  { value: 'pest', label: 'Pest Control' },
  { value: 'other', label: 'Other' },
]

const priorityOptions = [
  { value: 'low', label: 'Low', description: 'Can wait a few days' },
  { value: 'medium', label: 'Medium', description: 'Should be addressed soon' },
  { value: 'high', label: 'High', description: 'Needs attention within 24 hours' },
  { value: 'urgent', label: 'Urgent', description: 'Emergency - immediate attention' },
]

const NewRequestModal = ({ isOpen, onClose, onSubmit }) => {
  const toast = useToast()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    permissionToEnter: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      toast({
        title: 'Title required',
        description: 'Please enter a title for your request',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    if (!formData.category) {
      toast({
        title: 'Category required',
        description: 'Please select a category',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    setIsSubmitting(true)
    
    try {
      // TODO: API call to submit request
      await onSubmit(formData)
      
      toast({
        title: 'Request submitted',
        description: 'Your maintenance request has been submitted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        priority: 'medium',
        permissionToEnter: false,
      })
      
      onClose()
    } catch {
      toast({
        title: 'Submission failed',
        description: 'There was an error submitting your request. Please try again.',
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
      title: '',
      description: '',
      category: '',
      priority: 'medium',
      permissionToEnter: false,
    })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="xl" isCentered>
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent>
        <ModalHeader>New Maintenance Request</ModalHeader>
        <ModalCloseButton />
        
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <VStack spacing={4} align="stretch">
              {/* Title */}
              <FormControl isRequired>
                <FormLabel fontSize="sm" fontWeight="medium">
                  Title
                </FormLabel>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Leaky kitchen faucet"
                  autoFocus
                />
              </FormControl>

              {/* Category */}
              <FormControl isRequired>
                <FormLabel fontSize="sm" fontWeight="medium">
                  Category
                </FormLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Select category"
                >
                  {categoryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </FormControl>

              {/* Priority */}
              <FormControl isRequired>
                <FormLabel fontSize="sm" fontWeight="medium">
                  Priority
                </FormLabel>
                <VStack align="stretch" spacing={2}>
                  {priorityOptions.map((option) => (
                    <Box
                      key={option.value}
                      p={3}
                      borderWidth="2px"
                      borderRadius="lg"
                      borderColor={
                        formData.priority === option.value
                          ? 'brand.500'
                          : 'gray.200'
                      }
                      bg={
                        formData.priority === option.value
                          ? 'brand.50'
                          : 'transparent'
                      }
                      cursor="pointer"
                      transition="all 0.2s"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          priority: option.value,
                        }))
                      }
                      _hover={{ borderColor: 'brand.300' }}
                      _dark={{
                        borderColor:
                          formData.priority === option.value
                            ? 'brand.500'
                            : 'gray.600',
                        bg:
                          formData.priority === option.value
                            ? 'brand.900'
                            : 'transparent',
                      }}
                    >
                      <HStack justify="space-between">
                        <VStack align="start" spacing={0}>
                          <Text fontSize="sm" fontWeight="medium">
                            {option.label}
                          </Text>
                          <Text fontSize="xs" color="gray.500">
                            {option.description}
                          </Text>
                        </VStack>
                        {option.value === 'urgent' && (
                          <Icon as={AlertCircle} color="error.500" boxSize={5} />
                        )}
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              </FormControl>

              {/* Description */}
              <FormControl>
                <FormLabel fontSize="sm" fontWeight="medium">
                  Description
                </FormLabel>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Please provide details about the issue..."
                  rows={4}
                />
              </FormControl>

              {/* Permission to Enter */}
              <FormControl display="flex" alignItems="center">
                <input
                  type="checkbox"
                  name="permissionToEnter"
                  checked={formData.permissionToEnter}
                  onChange={handleChange}
                  style={{ marginRight: '8px' }}
                />
                <FormLabel mb={0} fontSize="sm">
                  I give permission to enter my unit if I'm not home
                </FormLabel>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={handleClose}>
              Cancel
            </Button>
            <Button
              colorScheme="brand"
              type="submit"
              isLoading={isSubmitting}
              loadingText="Submitting..."
            >
              Submit Request
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default NewRequestModal

