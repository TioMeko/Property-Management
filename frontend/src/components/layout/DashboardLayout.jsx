import { useState } from 'react'
import {
  Flex,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import Sidebar from './Sidebar'
import DashboardHeader from './DashboardHeader'

const DashboardLayout = ({ children, userType = 'tenant' }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isCollapsed, setIsCollapsed] = useState(true)

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <Flex h="100vh" overflow="hidden" bg="gray.50" _dark={{ bg: 'gray.900' }} w="full">
      {/* Desktop Sidebar */}
      <Flex
        display={{ base: 'none', lg: 'flex' }}
        w={isCollapsed ? '80px' : '280px'}
        borderRight="1px"
        borderColor="gray.200"
        bg="white"
        transition="width 0.2s"
        _dark={{
          borderColor: 'gray.700',
          bg: 'gray.800',
        }}
      >
        <Sidebar 
          userType={userType} 
          isCollapsed={isCollapsed}
          onToggleCollapse={handleToggleCollapse}
        />
      </Flex>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent
          bg="white"
          _dark={{
            bg: 'gray.800',
          }}
        >
          <DrawerCloseButton />
          <Sidebar 
            userType={userType} 
            onClose={onClose}
            isCollapsed={false}
          />
        </DrawerContent>
      </Drawer>

      {/* Main Content Area */}
      <Flex direction="column" flex={1}>
        {/* Top Header */}
        <DashboardHeader onOpenMenu={onOpen} userType={userType} />

        {/* Content */}
        <Flex
          flex={1}
          overflow="auto"
          bg="gray.50"
          _dark={{ bg: 'gray.900' }}
          w="full"
        >
          {children}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default DashboardLayout

