import {
  Box,
  VStack,
  HStack,
  Text,
  Icon,
  Badge,
  Flex,
  Avatar,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react'
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  MoreVertical,
  Edit,
  Trash2,
  FileText,
} from 'lucide-react'
import React from 'react'

const statusConfig = {
  scheduled: {
    icon: Calendar,
    color: 'brand',
    bg: 'brand.50',
    iconBg: 'brand.100',
    iconColor: 'brand.500',
    darkBg: 'brand.900',
    darkIconBg: 'brand.800',
    label: 'Scheduled',
  },
  completed: {
    icon: CheckCircle2,
    color: 'success',
    bg: 'success.50',
    iconBg: 'success.100',
    iconColor: 'success.500',
    darkBg: 'success.900',
    darkIconBg: 'success.800',
    label: 'Completed',
  },
  pending: {
    icon: Clock,
    color: 'warning',
    bg: 'warning.50',
    iconBg: 'warning.100',
    iconColor: 'warning.500',
    darkBg: 'warning.900',
    darkIconBg: 'warning.800',
    label: 'Pending',
  },
  cancelled: {
    icon: XCircle,
    color: 'gray',
    bg: 'gray.50',
    iconBg: 'gray.100',
    iconColor: 'gray.500',
    darkBg: 'gray.900',
    darkIconBg: 'gray.800',
    label: 'Cancelled',
  },
  failed: {
    icon: AlertCircle,
    color: 'error',
    bg: 'error.50',
    iconBg: 'error.100',
    iconColor: 'error.500',
    darkBg: 'error.900',
    darkIconBg: 'error.800',
    label: 'Failed',
  },
}

const InspectionCard = ({ inspection, onClick, onEdit, onCancel, onViewReport }) => {
  const {
    type,
    scheduledDate,
    status,
    inspector,
    notes,
    completedDate,
    issues,
  } = inspection

  const config = statusConfig[status] || statusConfig.pending

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const formatTime = (dateString) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  }

  return (
    <Box
      p={5}
      borderRadius="xl"
      borderWidth="1px"
      borderColor="gray.200"
      bg="white"
      _dark={{
        borderColor: 'gray.700',
        bg: 'gray.800',
      }}
      cursor="pointer"
      transition="all 0.2s"
      _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
      onClick={() => onClick && onClick(inspection)}
    >
      <VStack align="stretch" spacing={4}>
        {/* Header */}
        <HStack justify="space-between" align="start">
          <HStack spacing={3}>
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
            <VStack align="start" spacing={0}>
              <Text fontSize="lg" fontWeight="bold">
                {type}
              </Text>
              <Badge colorScheme={config.color} borderRadius="full" px={3} py={1}>
                {config.label}
              </Badge>
            </VStack>
          </HStack>

          <Menu>
            <MenuButton
              as={IconButton}
              icon={<Icon as={MoreVertical} />}
              variant="ghost"
              colorScheme="gray"
              size="sm"
              aria-label="More options"
              onClick={(e) => e.stopPropagation()}
            />
            <MenuList>
              {status === 'scheduled' && (
                <>
                  <MenuItem
                    icon={<Icon as={Edit} boxSize={4} />}
                    onClick={(e) => {
                      e.stopPropagation()
                      onEdit && onEdit(inspection)
                    }}
                  >
                    Reschedule
                  </MenuItem>
                  <MenuItem
                    icon={<Icon as={Trash2} boxSize={4} />}
                    color="error.500"
                    onClick={(e) => {
                      e.stopPropagation()
                      onCancel && onCancel(inspection)
                    }}
                  >
                    Cancel Inspection
                  </MenuItem>
                </>
              )}
              {status === 'completed' && (
                <MenuItem
                  icon={<Icon as={FileText} boxSize={4} />}
                  onClick={(e) => {
                    e.stopPropagation()
                    onViewReport && onViewReport(inspection)
                  }}
                >
                  View Report
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        </HStack>

        {/* Details */}
        <VStack align="stretch" spacing={3}>
          <HStack justify="space-between">
            <HStack>
              <Icon as={Calendar} boxSize={4} color="gray.500" />
              <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
                {formatDate(scheduledDate)}
              </Text>
            </HStack>
            <HStack>
              <Icon as={Clock} boxSize={4} color="gray.500" />
              <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
                {formatTime(scheduledDate)}
              </Text>
            </HStack>
          </HStack>

          {completedDate && (
            <HStack>
              <Icon as={CheckCircle2} boxSize={4} color="success.500" />
              <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
                Completed: {formatDate(completedDate)}
              </Text>
            </HStack>
          )}

          {issues !== undefined && issues !== null && (
            <HStack>
              <Icon
                as={issues > 0 ? AlertCircle : CheckCircle2}
                boxSize={4}
                color={issues > 0 ? 'warning.500' : 'success.500'}
              />
              <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
                {issues > 0 ? `${issues} issue${issues > 1 ? 's' : ''} found` : 'No issues found'}
              </Text>
            </HStack>
          )}

          {notes && (
            <Box
              p={3}
              borderRadius="lg"
              bg="gray.50"
              _dark={{ bg: 'gray.700' }}
            >
              <Text fontSize="sm" color="gray.700" _dark={{ color: 'gray.300' }} noOfLines={2}>
                {notes}
              </Text>
            </Box>
          )}

          {inspector && (
            <HStack pt={2} borderTopWidth="1px" borderColor="gray.100" _dark={{ borderColor: 'gray.700' }}>
              <Text fontSize="xs" color="gray.500">
                Inspector:
              </Text>
              <Tooltip label={inspector.name} placement="top" hasArrow>
                <HStack spacing={2}>
                  <Avatar
                    name={inspector.name}
                    src={inspector.avatarUrl}
                    bg={inspector.avatarBg || 'gray.400'}
                    size="xs"
                  />
                  <Text fontSize="xs" fontWeight="medium">
                    {inspector.name}
                  </Text>
                </HStack>
              </Tooltip>
            </HStack>
          )}
        </VStack>
      </VStack>
    </Box>
  )
}

export default InspectionCard

