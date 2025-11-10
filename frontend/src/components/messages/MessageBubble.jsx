import { Box, HStack, Text, Avatar, VStack, Icon } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { Check, CheckCheck } from 'lucide-react'
import React from 'react'

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
`

const MessageBubble = ({ message, isOwn, showAvatar = true, contact }) => {
  const { content, timestamp, isRead } = message

  return (
    <HStack
      w="full"
      justify={isOwn ? 'flex-end' : 'flex-start'}
      align="flex-end"
      spacing={2}
      px={4}
    >
      {!isOwn && showAvatar && (
        <Avatar
          size="sm"
          name={contact?.name}
          src={contact?.avatarUrl}
          bg={contact?.avatarBg || 'brand.400'}
          alignSelf="flex-end"
        />
      )}

      {!isOwn && !showAvatar && <Box w="32px" />}

      <VStack
        align={isOwn ? 'flex-end' : 'flex-start'}
        spacing={1}
        maxW="70%"
      >
        <Box
          bg={isOwn ? 'brand.500' : 'white'}
          color={isOwn ? 'white' : 'gray.800'}
          px={4}
          py={2.5}
          borderRadius="2xl"
          borderTopRightRadius={isOwn ? 'md' : '2xl'}
          borderTopLeftRadius={isOwn ? '2xl' : 'md'}
          boxShadow="sm"
          _dark={{
            bg: isOwn ? 'brand.600' : 'gray.700',
            color: isOwn ? 'white' : 'gray.100',
          }}
        >
          <Text fontSize="sm" whiteSpace="pre-wrap" wordBreak="break-word">
            {content}
          </Text>
        </Box>

        <HStack spacing={1} px={1}>
          <Text fontSize="xs" color="gray.500" _dark={{ color: 'gray.400' }}>
            {timestamp}
          </Text>
          {isOwn && (
            <Icon
              as={isRead ? CheckCheck : Check}
              boxSize={3.5}
              color={isRead ? 'brand.500' : 'gray.400'}
              animation={isRead ? `${fadeIn} 0.3s ease-in` : undefined}
              transition="color 0.3s ease"
            />
          )}
        </HStack>
      </VStack>

      {isOwn && showAvatar && <Box w="32px" />}
    </HStack>
  )
}

export default MessageBubble

