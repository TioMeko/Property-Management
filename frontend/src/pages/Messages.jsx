import { Box, Grid, GridItem, Flex, Text, Icon, useBreakpointValue, useDisclosure } from '@chakra-ui/react'
import { MessageSquare } from 'lucide-react'
import React, { useState, useEffect, useCallback } from 'react'
import DashboardLayout from '../components/layout/DashboardLayout'
import ConversationList from '../components/messages/ConversationList'
import ChatWindow from '../components/messages/ChatWindow'
import NewMessageModal from '../components/messages/NewMessageModal'

const Messages = () => {
  const { isOpen: isNewMessageOpen, onOpen: onNewMessageOpen, onClose: onNewMessageClose } = useDisclosure()

  // Mock data - replace with API calls
  const [conversations] = useState([
    {
      id: '1',
      contact: {
        name: 'Sarah Johnson',
        avatarUrl: null,
        avatarBg: 'rose.400',
        isOnline: true,
        role: 'Landlord',
        lastSeen: null,
      },
      lastMessage: 'Thanks for letting me know about the maintenance request',
      timestamp: '2m ago',
      unreadCount: 2,
    },
    {
      id: '2',
      contact: {
        name: 'Mike Chen',
        avatarUrl: null,
        avatarBg: 'blue.400',
        isOnline: false,
        role: 'Maintenance',
        lastSeen: 'Last seen 1h ago',
      },
      lastMessage: "I'll be there tomorrow at 10 AM",
      timestamp: '1h ago',
      unreadCount: 0,
    },
    {
      id: '3',
      contact: {
        name: 'Emily Rodriguez',
        avatarUrl: null,
        avatarBg: 'purple.400',
        isOnline: true,
        role: 'Property Manager',
        lastSeen: null,
      },
      lastMessage: 'Your lease renewal documents are ready',
      timestamp: '3h ago',
      unreadCount: 1,
    },
    {
      id: '4',
      contact: {
        name: 'David Park',
        avatarUrl: null,
        avatarBg: 'green.400',
        isOnline: false,
        role: 'Neighbor',
        lastSeen: 'Last seen yesterday',
      },
      lastMessage: 'Thanks! Have a great day',
      timestamp: 'Yesterday',
      unreadCount: 0,
    },
  ])

  const [messagesByConversation] = useState({
    '1': [
      {
        id: 'm1',
        content: 'Hi Sarah, I wanted to report that the kitchen faucet is leaking.',
        timestamp: '10:30 AM',
        date: 'Today',
        isOwn: true,
        isRead: true,
      },
      {
        id: 'm2',
        content: 'Thank you for letting me know, John. I\'ll send a maintenance worker to check it out.',
        timestamp: '10:32 AM',
        date: 'Today',
        isOwn: false,
        isRead: false,
      },
      {
        id: 'm3',
        content: 'When can I expect someone to come by?',
        timestamp: '10:35 AM',
        date: 'Today',
        isOwn: true,
        isRead: true,
      },
      {
        id: 'm4',
        content: 'Mike from maintenance will be there tomorrow between 10-12 AM. Does that work for you?',
        timestamp: '10:40 AM',
        date: 'Today',
        isOwn: false,
        isRead: false,
      },
      {
        id: 'm5',
        content: 'Perfect! I\'ll make sure to be home then.',
        timestamp: '10:42 AM',
        date: 'Today',
        isOwn: true,
        isRead: true,
      },
      {
        id: 'm6',
        content: 'Thanks for letting me know about the maintenance request',
        timestamp: '10:45 AM',
        date: 'Today',
        isOwn: false,
        isRead: false,
      },
    ],
    '2': [
      {
        id: 'm7',
        content: 'Hi Mike, Sarah mentioned you\'ll be coming by tomorrow?',
        timestamp: '9:15 AM',
        date: 'Today',
        isOwn: true,
        isRead: true,
      },
      {
        id: 'm8',
        content: "Yes, I'll be there tomorrow at 10 AM to fix the faucet.",
        timestamp: '9:20 AM',
        date: 'Today',
        isOwn: false,
        isRead: false,
      },
      {
        id: 'm9',
        content: 'Great, see you then!',
        timestamp: '9:22 AM',
        date: 'Today',
        isOwn: true,
        isRead: true,
      },
    ],
    '3': [
      {
        id: 'm10',
        content: 'Hello Emily, I wanted to check on my lease renewal.',
        timestamp: '8:00 AM',
        date: 'Today',
        isOwn: true,
        isRead: true,
      },
      {
        id: 'm11',
        content: 'Your lease renewal documents are ready. I\'ll email them to you shortly.',
        timestamp: '8:05 AM',
        date: 'Today',
        isOwn: false,
        isRead: false,
      },
    ],
    '4': [
      {
        id: 'm12',
        content: 'Hey David, thanks for collecting my package yesterday!',
        timestamp: '5:00 PM',
        date: 'Yesterday',
        isOwn: true,
        isRead: true,
      },
      {
        id: 'm13',
        content: 'No problem! Happy to help.',
        timestamp: '5:15 PM',
        date: 'Yesterday',
        isOwn: false,
        isRead: false,
      },
      {
        id: 'm14',
        content: 'Thanks! Have a great day',
        timestamp: '5:16 PM',
        date: 'Yesterday',
        isOwn: false,
        isRead: false,
      },
    ],
  })

  // Available contacts for new messages
  const [availableContacts] = useState([
    {
      id: '1',
      name: 'Sarah Johnson',
      avatarUrl: null,
      avatarBg: 'rose.400',
      role: 'Landlord',
    },
    {
      id: '2',
      name: 'Mike Chen',
      avatarUrl: null,
      avatarBg: 'blue.400',
      role: 'Maintenance',
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      avatarUrl: null,
      avatarBg: 'purple.400',
      role: 'Property Manager',
    },
    {
      id: '5',
      name: 'Jessica Lee',
      avatarUrl: null,
      avatarBg: 'teal.400',
      role: 'Support',
    },
  ])

  const [activeConversationId, setActiveConversationId] = useState('1')
  const [conversationsState, setConversationsState] = useState(conversations)
  const [messagesState, setMessagesState] = useState(messagesByConversation)
  const isMobile = useBreakpointValue({ base: true, md: false })
  const [showChat, setShowChat] = useState(!isMobile)

  const activeConversation = conversationsState.find((c) => c.id === activeConversationId)
  const activeMessages = messagesState[activeConversationId] || []

  const markConversationAsRead = useCallback((conversationId) => {
    // Mark all messages in conversation as read
    setMessagesState((prevMessages) => {
      const conversationMessages = prevMessages[conversationId]
      if (!conversationMessages) return prevMessages

      const updatedMessages = conversationMessages.map((msg) => {
        // Only mark received messages (not own messages) as read
        if (!msg.isOwn && !msg.isRead) {
          return { ...msg, isRead: true }
        }
        return msg
      })

      return {
        ...prevMessages,
        [conversationId]: updatedMessages,
      }
    })

    // Update conversation unread count to 0
    setConversationsState((prevConversations) =>
      prevConversations.map((conv) =>
        conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
      )
    )

    // TODO: API call to mark messages as read on backend
    // await fetch(`/api/messages/${conversationId}/read`, { method: 'PUT' })
  }, [])

  // Mark messages as read when conversation is viewed
  useEffect(() => {
    if (activeConversationId) {
      markConversationAsRead(activeConversationId)
    }
  }, [activeConversationId, markConversationAsRead])

  const handleSelectConversation = (id) => {
    setActiveConversationId(id)
    // markConversationAsRead is called automatically by useEffect
    if (isMobile) {
      setShowChat(true)
    }
  }

  const handleBackToList = () => {
    setShowChat(false)
  }

  const handleSendMessage = (content) => {
    console.log('Sending message:', content)
    
    // Create new message
    const newMessage = {
      id: `m${Date.now()}`,
      content,
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }),
      date: 'Today',
      isOwn: true,
      isRead: false,
    }

    // Add message to conversation
    setMessagesState((prevMessages) => ({
      ...prevMessages,
      [activeConversationId]: [
        ...(prevMessages[activeConversationId] || []),
        newMessage,
      ],
    }))

    // Update last message in conversation list
    setConversationsState((prevConversations) =>
      prevConversations.map((conv) =>
        conv.id === activeConversationId
          ? {
              ...conv,
              lastMessage: content,
              timestamp: 'Just now',
            }
          : conv
      )
    )

    // Simulate message being read after 2 seconds (in real app, this comes from WebSocket)
    setTimeout(() => {
      setMessagesState((prevMessages) => {
        const conversationMessages = prevMessages[activeConversationId]
        if (!conversationMessages) return prevMessages

        const updatedMessages = conversationMessages.map((msg) =>
          msg.id === newMessage.id ? { ...msg, isRead: true } : msg
        )

        return {
          ...prevMessages,
          [activeConversationId]: updatedMessages,
        }
      })
    }, 2000)

    // TODO: Implement API call to send message
    // await fetch(`/api/messages`, { method: 'POST', body: { conversationId, content } })
  }

  const handleNewMessage = () => {
    onNewMessageOpen()
  }

  const handleSelectContact = (contact) => {
    console.log('Starting conversation with:', contact)
    // TODO: Create or open conversation with selected contact
    // For now, just select the conversation if it exists
    const existingConversation = conversations.find(
      (conv) => conv.contact.name === contact.name
    )
    if (existingConversation) {
      setActiveConversationId(existingConversation.id)
      if (isMobile) {
        setShowChat(true)
      }
    }
  }

  const handleViewArchived = () => {
    console.log('View archived messages')
    // TODO: Implement archived messages view
  }

  return (
    <DashboardLayout userType="tenant">
      <NewMessageModal
        isOpen={isNewMessageOpen}
        onClose={onNewMessageClose}
        contacts={availableContacts}
        onSelectContact={handleSelectContact}
      />
      <Box h="calc(100vh - 80px)" w="full">
        <Grid
          templateColumns={{ base: '1fr', md: '380px 1fr' }}
          h="full"
          borderRadius="xl"
          overflow="hidden"
          borderWidth="1px"
          borderColor="gray.200"
          bg="white"
          _dark={{
            borderColor: 'gray.700',
            bg: 'gray.800',
          }}
        >
          {/* Conversation List - Hidden on mobile when chat is open */}
          <GridItem
            borderRightWidth={{ base: 0, md: '1px' }}
            borderColor="gray.200"
            _dark={{ borderColor: 'gray.700' }}
            display={{ base: showChat ? 'none' : 'block', md: 'block' }}
          >
            <ConversationList
              conversations={conversationsState}
              activeConversationId={activeConversationId}
              onSelectConversation={handleSelectConversation}
              onNewMessage={handleNewMessage}
              onViewArchived={handleViewArchived}
            />
          </GridItem>

          {/* Chat Window */}
          <GridItem display={{ base: showChat ? 'block' : 'none', md: 'block' }}>
            {activeConversation ? (
              <ChatWindow
                contact={activeConversation.contact}
                messages={activeMessages}
                onSendMessage={handleSendMessage}
                onBack={handleBackToList}
                showBackButton={isMobile}
              />
            ) : (
              <Flex
                h="full"
                align="center"
                justify="center"
                direction="column"
                bg="gray.50"
                _dark={{ bg: 'gray.900' }}
              >
                <Icon as={MessageSquare} boxSize={16} color="gray.300" mb={4} />
                <Text color="gray.500" fontSize="lg">
                  Select a conversation to start messaging
                </Text>
              </Flex>
            )}
          </GridItem>
        </Grid>
      </Box>
    </DashboardLayout>
  )
}

export default Messages

