import {
  Box,
  Flex,
  Icon,
  IconButton,
  Text,
  HStack,
  useColorMode,
} from '@chakra-ui/react'
import {
  Menu,
  Moon,
  Sun,
  Bell,
} from 'lucide-react'
import UserMenu from './UserMenu'

const DashboardHeader = ({ onOpenMenu, title = 'Dashboard', userType = 'tenant' }) => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      px={{ base: 4, md: 6 }}
      py={4}
      borderBottom="1px"
      borderColor="gray.200"
      bg="white"
      _dark={{
        borderColor: 'gray.700',
        bg: 'gray.800',
      }}
    >
      <HStack spacing={4}>
        <IconButton
          icon={<Icon as={Menu} />}
          display={{ base: 'flex', lg: 'none' }}
          variant="ghost"
          onClick={onOpenMenu}
          aria-label="Open menu"
        />
        <Text fontSize="xl" fontWeight="semibold" display={{ base: 'none', md: 'block' }}>
          {title}
        </Text>
      </HStack>

      <HStack spacing={3}>
        <IconButton
          icon={<Icon as={Bell} />}
          variant="ghost"
          aria-label="Notifications"
          position="relative"
        >
          <Box
            position="absolute"
            top={2}
            right={2}
            w={2}
            h={2}
            bg="rose.500"
            borderRadius="full"
          />
        </IconButton>
        <IconButton
          icon={<Icon as={colorMode === 'light' ? Moon : Sun} />}
          onClick={toggleColorMode}
          variant="ghost"
          aria-label="Toggle color mode"
        />
        <Box display={{ base: 'none', md: 'block' }}>
          <UserMenu 
            userName="John Doe" 
            userRole={userType === 'tenant' ? 'Tenant' : 'Landlord'}
            isCompact
          />
        </Box>
      </HStack>
    </Flex>
  )
}

export default DashboardHeader

