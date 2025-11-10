import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  Icon,
  IconButton,
  Flex,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
} from '@chakra-ui/react'
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Calendar,
  MoreVertical,
  MessageSquare,
  Trash2,
  Edit,
} from 'lucide-react'
import React from 'react'

const statusConfig = {
  pending: {
    icon: Clock,
    color: 'warning',
    bg: 'warning.50',
    iconBg: 'warning.100',
    iconColor: 'warning.500',
    darkBg: 'warning.900',
    darkIconBg: 'warning.800',
  },
  in_progress: {
    icon: AlertCircle,
    color: 'info',
    bg: 'blue.50',
    iconBg: 'blue.100',
    iconColor: 'blue.500',
    darkBg: 'blue.900',
    darkIconBg: 'blue.800',
  },
  scheduled: {
    icon: Calendar,
    color: 'brand',
    bg: 'brand.50',
    iconBg: 'brand.100',
    iconColor: 'brand.500',
    darkBg: 'brand.900',
    darkIconBg: 'brand.800',
  },
  completed: {
    icon: CheckCircle2,
    color: 'success',
    bg: 'success.50',
    iconBg: 'success.100',
    iconColor: 'success.500',
    darkBg: 'success.900',
    darkIconBg: 'success.800',
  },
  cancelled: {
    icon: Trash2,
    color: 'gray',
    bg: 'gray.50',
    iconBg: 'gray.100',
    iconColor: 'gray.500',
    darkBg: 'gray.900',
    darkIconBg: 'gray.800',
  },
}

const priorityConfig = {
  low: { color: 'gray', label: 'Low' },
  medium: { color: 'blue', label: 'Medium' },
  high: { color: 'orange', label: 'High' },
  urgent: { color: 'red', label: 'Urgent' },
}

const MaintenanceRequestCard = ({ request, onClick, onEdit, onDelete, onMessage }) => {
  const {
    title,
    description,
    status,
    priority,
    category,
    createdAt,
    scheduledDate,
    assignedTo,
  } = request

  const config = statusConfig[status] || statusConfig.pending
  const priorityConf = priorityConfig[priority] || priorityConfig.medium

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <Box
      p={6}
      borderRadius="xl"
      borderWidth="1px"
      borderColor="gray.200"
      bg="white"
      cursor="pointer"
      transition="all 0.2s"
      _hover={{
        shadow: 'md',
        borderColor: 'brand.300',
        transform: 'translateY(-2px)',
      }}
      _dark={{
        borderColor: 'gray.700',
        bg: 'gray.800',
        _hover: {
          borderColor: 'brand.600',
        },
      }}
      onClick={() => onClick && onClick(request)}
    >
      <VStack align="stretch" spacing={4}>
        {/* Header */}
        <HStack justify="space-between" align="start">
          <HStack spacing={3} flex={1}>
            <Flex
              align="center"
              justify="center"
              w={12}
              h={12}
              borderRadius="xl"
              bg={config.iconBg}
              _dark={{ bg: config.darkIconBg }}
            >
              <Icon as={config.icon} boxSize={6} color={config.iconColor} />
            </Flex>
            <VStack align="start" spacing={1} flex={1}>
              <Text fontSize="md" fontWeight="semibold" noOfLines={1}>
                {title}
              </Text>
              <HStack spacing={2}>
                <Badge colorScheme={config.color} fontSize="xs" px={2}>
                  {status.replace('_', ' ').toUpperCase()}
                </Badge>
                <Badge colorScheme={priorityConf.color} variant="subtle" fontSize="xs" px={2}>
                  {priorityConf.label} Priority
                </Badge>
                {category && (
                  <Badge colorScheme="gray" variant="outline" fontSize="xs" px={2}>
                    {category}
                  </Badge>
                )}
              </HStack>
            </VStack>
          </HStack>

          <Menu>
            <MenuButton
              as={IconButton}
              icon={<Icon as={MoreVertical} />}
              variant="ghost"
              size="sm"
              aria-label="More options"
              onClick={(e) => e.stopPropagation()}
            />
            <MenuList>
              <MenuItem 
                icon={<Icon as={Edit} boxSize={4} />}
                onClick={(e) => {
                  e.stopPropagation()
                  onEdit && onEdit(request)
                }}
              >
                Edit Request
              </MenuItem>
              <MenuItem 
                icon={<Icon as={MessageSquare} boxSize={4} />}
                onClick={(e) => {
                  e.stopPropagation()
                  onMessage && onMessage(request)
                }}
              >
                Send Message
              </MenuItem>
              <MenuItem 
                icon={<Icon as={Trash2} boxSize={4} />}
                color="error.500"
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete && onDelete(request)
                }}
              >
                Cancel Request
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>

        {/* Description */}
        {description && (
          <Text 
            fontSize="sm" 
            color="gray.600" 
            _dark={{ color: 'gray.400' }}
            noOfLines={2}
          >
            {description}
          </Text>
        )}

        {/* Footer Info */}
        <HStack justify="space-between" pt={2} borderTopWidth="1px" borderColor="gray.100" _dark={{ borderColor: 'gray.700' }}>
          <VStack align="start" spacing={1}>
            <Text fontSize="xs" color="gray.500" _dark={{ color: 'gray.400' }}>
              Submitted: {formatDate(createdAt)}
            </Text>
            {scheduledDate && (
              <HStack spacing={1}>
                <Icon as={Calendar} boxSize={3} color="brand.500" />
                <Text fontSize="xs" color="brand.500" fontWeight="medium">
                  Scheduled: {formatDate(scheduledDate)}
                </Text>
              </HStack>
            )}
          </VStack>

          {assignedTo && (
            <Tooltip label={`Assigned to ${assignedTo.name}`} hasArrow>
              <Avatar
                size="sm"
                name={assignedTo.name}
                src={assignedTo.avatarUrl}
                bg={assignedTo.avatarBg || 'teal.400'}
              />
            </Tooltip>
          )}
        </HStack>
      </VStack>
    </Box>
  )
}

export default MaintenanceRequestCard

