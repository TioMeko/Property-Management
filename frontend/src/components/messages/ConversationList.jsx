import {
  Box,
  VStack,
  HStack,
  Text,
  Avatar,
  Badge,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  IconButton,
  Heading,
  Tooltip,
} from '@chakra-ui/react'
import { Search, Edit, Archive } from 'lucide-react'
import React, { useState } from 'react'

const ConversationItem = ({ conversation, isActive, onClick }) => {
  const { id, contact, lastMessage, unreadCount, timestamp, isOnline } = conversation

  return (
    <Flex
      p={4}
      cursor="pointer"
      bg={isActive ? 'brand.50' : 'transparent'}
      _hover={{ bg: isActive ? 'brand.50' : 'gray.50' }}
      _dark={{
        bg: isActive ? 'brand.900' : 'transparent',
        _hover: { bg: isActive ? 'brand.900' : 'gray.800' },
      }}
      borderRadius="lg"
      transition="all 0.2s"
      onClick={() => onClick(id)}
      position="relative"
    >
      <Box position="relative">
        <Avatar
          size="md"
          name={contact.name}
          src={contact.avatarUrl}
          bg={contact.avatarBg || 'brand.400'}
        />
        {isOnline && (
          <Box
            position="absolute"
            bottom={0}
            right={0}
            w={3}
            h={3}
            bg="success.500"
            borderRadius="full"
            border="2px solid white"
            _dark={{ borderColor: 'gray.800' }}
          />
        )}
      </Box>

      <VStack align="stretch" spacing={0} flex={1} ml={3} overflow="hidden">
        <HStack justify="space-between" mb={1}>
          <Text fontSize="sm" fontWeight="semibold" noOfLines={1}>
            {contact.name}
          </Text>
          <Text fontSize="xs" color="gray.500" flexShrink={0}>
            {timestamp}
          </Text>
        </HStack>

        <HStack justify="space-between">
          <Text
            fontSize="sm"
            color="gray.600"
            _dark={{ color: 'gray.400' }}
            noOfLines={1}
            flex={1}
          >
            {lastMessage}
          </Text>
          {unreadCount > 0 && (
            <Badge
              colorScheme="brand"
              borderRadius="full"
              px={2}
              fontSize="xs"
              flexShrink={0}
            >
              {unreadCount}
            </Badge>
          )}
        </HStack>
      </VStack>
    </Flex>
  )
}

const ConversationList = ({ 
  conversations, 
  activeConversationId, 
  onSelectConversation,
  onNewMessage,
  onViewArchived 
}) => {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredConversations = conversations.filter((conv) =>
    conv.contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <VStack align="stretch" spacing={0} h="full">
      {/* Header */}
      <HStack 
        p={4} 
        borderBottomWidth="1px" 
        borderColor="gray.200" 
        _dark={{ borderColor: 'gray.700' }}
        justify="space-between"
      >
        <Heading size="md">Messages</Heading>
        <HStack spacing={1}>
          <Tooltip label="New Message" placement="bottom" hasArrow>
            <IconButton
              icon={<Icon as={Edit} />}
              variant="ghost"
              colorScheme="brand"
              size="sm"
              aria-label="New message"
              onClick={onNewMessage}
            />
          </Tooltip>
          <Tooltip label="Archived" placement="bottom" hasArrow>
            <IconButton
              icon={<Icon as={Archive} />}
              variant="ghost"
              colorScheme="gray"
              size="sm"
              aria-label="View archived"
              onClick={onViewArchived}
            />
          </Tooltip>
        </HStack>
      </HStack>

      {/* Search Bar */}
      <Box p={4} borderBottomWidth="1px" borderColor="gray.200" _dark={{ borderColor: 'gray.700' }}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={Search} color="gray.400" boxSize={4} />
          </InputLeftElement>
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            borderRadius="full"
            bg="gray.50"
            _dark={{ bg: 'gray.800' }}
            border="none"
          />
        </InputGroup>
      </Box>

      {/* Conversation List */}
      <VStack
        align="stretch"
        spacing={1}
        flex={1}
        overflowY="auto"
        p={2}
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
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
        {filteredConversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            isActive={conversation.id === activeConversationId}
            onClick={onSelectConversation}
          />
        ))}

        {filteredConversations.length === 0 && (
          <Flex align="center" justify="center" h="200px">
            <Text color="gray.500" fontSize="sm">
              No conversations found
            </Text>
          </Flex>
        )}
      </VStack>
    </VStack>
  )
}

export default ConversationList

