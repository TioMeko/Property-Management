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
  Text,
  Avatar,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Box,
} from '@chakra-ui/react'
import { Search } from 'lucide-react'
import React, { useState } from 'react'

const ContactItem = ({ contact, onClick }) => {
  return (
    <HStack
      p={3}
      cursor="pointer"
      borderRadius="lg"
      _hover={{ bg: 'gray.50', _dark: { bg: 'gray.700' } }}
      transition="all 0.2s"
      onClick={() => onClick(contact)}
    >
      <Avatar
        size="sm"
        name={contact.name}
        src={contact.avatarUrl}
        bg={contact.avatarBg || 'brand.400'}
      />
      <VStack align="start" spacing={0} flex={1}>
        <Text fontSize="sm" fontWeight="medium">
          {contact.name}
        </Text>
        <Text fontSize="xs" color="gray.500">
          {contact.role}
        </Text>
      </VStack>
    </HStack>
  )
}

const NewMessageModal = ({ isOpen, onClose, contacts = [], onSelectContact }) => {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSelectContact = (contact) => {
    onSelectContact(contact)
    setSearchQuery('')
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent>
        <ModalHeader>New Message</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="stretch" spacing={4}>
            {/* Search Bar */}
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={Search} color="gray.400" boxSize={4} />
              </InputLeftElement>
              <Input
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </InputGroup>

            {/* Contact List */}
            <Box
              maxH="400px"
              overflowY="auto"
              css={{
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#CBD5E0',
                  borderRadius: '24px',
                },
              }}
            >
              <VStack align="stretch" spacing={1}>
                {filteredContacts.length > 0 ? (
                  filteredContacts.map((contact) => (
                    <ContactItem
                      key={contact.id}
                      contact={contact}
                      onClick={handleSelectContact}
                    />
                  ))
                ) : (
                  <Box py={8} textAlign="center">
                    <Text color="gray.500" fontSize="sm">
                      No contacts found
                    </Text>
                  </Box>
                )}
              </VStack>
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default NewMessageModal

