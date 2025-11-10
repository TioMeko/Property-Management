import {
  Box,
  VStack,
  HStack,
  Text,
  Avatar,
  IconButton,
  Icon,
  Flex,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { MoreVertical, ArrowLeft, Archive, Trash2, AlertCircle } from 'lucide-react'
import React, { useRef, useEffect } from 'react'
import MessageBubble from './MessageBubble'
import MessageInput from './MessageInput'

const ChatHeader = ({ contact, onBack, showBackButton = false }) => {
  return (
    <HStack
      p={4}
      borderBottomWidth="1px"
      borderColor="gray.200"
      bg="white"
      _dark={{
        borderColor: 'gray.700',
        bg: 'gray.800',
      }}
    >
      {showBackButton && (
        <IconButton
          icon={<Icon as={ArrowLeft} />}
          variant="ghost"
          size="sm"
          aria-label="Back to conversations"
          onClick={onBack}
          display={{ base: 'flex', md: 'none' }}
        />
      )}

      <Avatar
        size="sm"
        name={contact.name}
        src={contact.avatarUrl}
        bg={contact.avatarBg || 'brand.400'}
      />

      <VStack align="start" spacing={0} flex={1}>
        <Text fontSize="sm" fontWeight="semibold">
          {contact.name}
        </Text>
        <HStack spacing={2}>
          {contact.isOnline ? (
            <Badge colorScheme="green" fontSize="xs" px={2} borderRadius="full">
              Online
            </Badge>
          ) : (
            <Text fontSize="xs" color="gray.500">
              {contact.lastSeen || 'Offline'}
            </Text>
          )}
          {contact.role && (
            <Badge colorScheme="gray" fontSize="xs" px={2} borderRadius="full">
              {contact.role}
            </Badge>
          )}
        </HStack>
      </VStack>

      <Menu>
        <MenuButton
          as={IconButton}
          icon={<Icon as={MoreVertical} />}
          variant="ghost"
          colorScheme="gray"
          size="sm"
          aria-label="More options"
        />
        <MenuList>
          <MenuItem icon={<Icon as={Archive} boxSize={4} />}>
            Archive Conversation
          </MenuItem>
          <MenuItem icon={<Icon as={AlertCircle} boxSize={4} />}>
            Report Issue
          </MenuItem>
          <MenuItem icon={<Icon as={Trash2} boxSize={4} />} color="error.500">
            Delete Conversation
          </MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  )
}

const DateDivider = ({ date }) => (
  <Flex justify="center" my={4}>
    <Badge
      px={3}
      py={1}
      borderRadius="full"
      bg="gray.100"
      color="gray.600"
      fontSize="xs"
      _dark={{
        bg: 'gray.700',
        color: 'gray.300',
      }}
    >
      {date}
    </Badge>
  </Flex>
)

const ChatWindow = ({
  contact,
  messages = [],
  onSendMessage,
  onBack,
  showBackButton = false,
}) => {
  const messagesEndRef = useRef(null)
  const messagesContainerRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Log when messages change for debugging
  useEffect(() => {
    const unreadCount = messages.filter((m) => !m.isRead && !m.isOwn).length
    if (unreadCount === 0 && messages.length > 0) {
      console.log('All messages marked as read')
    }
  }, [messages])

  const groupMessagesByDate = (messages) => {
    const groups = []
    let currentDate = null
    let currentGroup = []

    messages.forEach((message) => {
      const messageDate = message.date
      if (messageDate !== currentDate) {
        if (currentGroup.length > 0) {
          groups.push({ date: currentDate, messages: currentGroup })
        }
        currentDate = messageDate
        currentGroup = [message]
      } else {
        currentGroup.push(message)
      }
    })

    if (currentGroup.length > 0) {
      groups.push({ date: currentDate, messages: currentGroup })
    }

    return groups
  }

  const messageGroups = groupMessagesByDate(messages)

  return (
    <VStack align="stretch" spacing={0} h="full">
      {/* Chat Header */}
      <ChatHeader contact={contact} onBack={onBack} showBackButton={showBackButton} />

      {/* Messages Area */}
      <VStack
        ref={messagesContainerRef}
        align="stretch"
        spacing={2}
        flex={1}
        overflowY="auto"
        py={4}
        bg="gray.50"
        _dark={{ bg: 'gray.900' }}
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
        {messageGroups.length === 0 ? (
          <Flex align="center" justify="center" h="full">
            <Text color="gray.500" fontSize="sm">
              No messages yet. Start the conversation!
            </Text>
          </Flex>
        ) : (
          messageGroups.map((group, groupIndex) => (
            <Box key={groupIndex}>
              <DateDivider date={group.date} />
              {group.messages.map((message, messageIndex) => {
                const prevMessage = group.messages[messageIndex - 1]
                const showAvatar = !prevMessage || prevMessage.isOwn !== message.isOwn
                
                return (
                  <Box key={message.id} mb={showAvatar ? 3 : 1}>
                    <MessageBubble
                      message={message}
                      isOwn={message.isOwn}
                      showAvatar={showAvatar}
                      contact={contact}
                    />
                  </Box>
                )
              })}
            </Box>
          ))
        )}
        <div ref={messagesEndRef} />
      </VStack>

      {/* Message Input */}
      <MessageInput onSendMessage={onSendMessage} />
    </VStack>
  )
}

export default ChatWindow

