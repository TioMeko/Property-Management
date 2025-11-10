import {
  Box,
  HStack,
  Input,
  IconButton,
  Icon,
  Textarea,
} from '@chakra-ui/react'
import { Send, Paperclip, Smile } from 'lucide-react'
import React, { useState, useRef } from 'react'

const MessageInput = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('')
  const textareaRef = useRef(null)

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim())
      setMessage('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleInput = (e) => {
    setMessage(e.target.value)
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }

  return (
    <Box
      p={4}
      borderTopWidth="1px"
      borderColor="gray.200"
      bg="white"
      _dark={{
        borderColor: 'gray.700',
        bg: 'gray.800',
      }}
    >
      <HStack spacing={2} align="flex-end">
        {/* Attachment Button */}
        <IconButton
          icon={<Icon as={Paperclip} />}
          variant="ghost"
          colorScheme="gray"
          size="md"
          aria-label="Attach file"
          isDisabled={disabled}
          _hover={{ bg: 'gray.100' }}
          _dark={{ _hover: { bg: 'gray.700' } }}
        />

        {/* Input Area */}
        <Box
          flex={1}
          bg="gray.50"
          _dark={{ bg: 'gray.700' }}
          borderRadius="3xl"
          px={4}
          py={2}
        >
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={handleInput}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            size="sm"
            resize="none"
            minH="40px"
            maxH="120px"
            border="none"
            bg="transparent"
            _focus={{ outline: 'none', boxShadow: 'none' }}
            _placeholder={{ color: 'gray.400' }}
            disabled={disabled}
            overflow="hidden"
            rows={1}
          />
        </Box>

        {/* Emoji Button */}
        <IconButton
          icon={<Icon as={Smile} />}
          variant="ghost"
          colorScheme="gray"
          size="md"
          aria-label="Add emoji"
          isDisabled={disabled}
          _hover={{ bg: 'gray.100' }}
          _dark={{ _hover: { bg: 'gray.700' } }}
        />

        {/* Send Button */}
        <IconButton
          icon={<Icon as={Send} />}
          colorScheme="brand"
          size="md"
          aria-label="Send message"
          onClick={handleSend}
          isDisabled={disabled || !message.trim()}
          borderRadius="full"
        />
      </HStack>
    </Box>
  )
}

export default MessageInput

