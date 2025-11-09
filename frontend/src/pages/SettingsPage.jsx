import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Input,
  Button,
  Flex,
  Avatar,
  FormControl,
  FormLabel,
  Switch,
  Divider,
  InputGroup,
  InputRightElement,
  IconButton,
  Icon,
  useColorMode,
  Link,
} from '@chakra-ui/react'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Eye,
  EyeOff,
  Save,
  Shield,
  Bell,
  Settings,
  AlertTriangle,
  Home,
} from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import DashboardLayout from '../components/layout/DashboardLayout'
import Breadcrumbs from '../components/ui/Breadcrumbs'

const SettingsPage = ({ userType = 'tenant' }) => {
  const { colorMode } = useColorMode()
  const [showPassword, setShowPassword] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [activeSection, setActiveSection] = useState('profile')

  const menuItems = [
    { id: 'profile', label: 'Profile Information', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'danger', label: 'Danger Zone', icon: AlertTriangle },
  ]

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveSection(sectionId)
    }
  }

  const breadcrumbItems = [
    {
      label: 'Dashboard',
      href: userType === 'tenant' ? '/tenant/dashboard' : '/landlord/dashboard',
      icon: Home,
    },
    {
      label: 'Settings',
    },
  ]

  return (
    <DashboardLayout userType={userType}>
      <VStack w="full" h="full" spacing={0} align="stretch">
        {/* Breadcrumbs */}
        <Box p={{ base: 4, md: 6, lg: 8 }} pb={0}>
          <Breadcrumbs items={breadcrumbItems} />
        </Box>

        {/* Main Content Area */}
        <Flex w="full" direction="row" gap={8} h="full" overflow="hidden">
        {/* Left Sidebar Navigation */}
        <Box
          display={{ base: 'none', lg: 'flex' }}
          w="250px"
          flexShrink={0}
          p={{ base: 4, md: 6, lg: 8 }}
          pt={{ base: 4, md: 6, lg: 8 }}
        >
          <VStack align="stretch" spacing={1} position="sticky" top="0">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                cursor="pointer"
                _hover={{ textDecoration: 'none' }}
              >
                <Flex
                  align="center"
                  gap={3}
                  px={4}
                  py={3}
                  borderRadius="lg"
                  bg={activeSection === item.id ? 'gray.100' : 'transparent'}
                  color={activeSection === item.id ? 'brand.600' : 'gray.600'}
                  fontWeight={activeSection === item.id ? 'semibold' : 'normal'}
                  transition="all 0.2s"
                  _hover={{
                    bg: activeSection === item.id ? 'gray.100' : 'gray.50',
                  }}
                  _dark={{
                    bg: activeSection === item.id ? 'gray.700' : 'transparent',
                    color: activeSection === item.id ? 'brand.300' : 'gray.400',
                    _hover: {
                      bg: activeSection === item.id ? 'gray.700' : 'gray.800',
                    },
                  }}
                >
                  <Icon as={item.icon} boxSize={5} />
                  <Text fontSize="sm">{item.label}</Text>
                </Flex>
              </Link>
            ))}
          </VStack>
        </Box>

        {/* Main Content - Scrollable */}
        <Box
          flex={1}
          overflow="auto"
          p={{ base: 4, md: 6, lg: 8 }}
        >
          <VStack align="stretch" spacing={8} maxW="none">
          {/* Page Header */}
          <Box>
            <Heading size="lg" mb={2}>
              Settings
            </Heading>
            <Text color="gray.600" _dark={{ color: 'gray.400' }}>
              Manage your account settings and preferences
            </Text>
          </Box>

          {/* Profile Section */}
          <Box
            id="profile"
            p={6}
            borderRadius="xl"
            borderWidth="1px"
            borderColor="gray.200"
            bg="white"
            _dark={{
              borderColor: 'gray.700',
              bg: 'gray.800',
            }}
          >
            <VStack align="stretch" spacing={6}>
              <Heading size="md">Profile Information</Heading>
              
              {/* Avatar Section */}
              <HStack spacing={4}>
                <Avatar size="xl" name="John Doe" bg="brand.500" />
                <VStack align="start" spacing={2}>
                  <Button size="sm" colorScheme="brand">
                    Change Photo
                  </Button>
                  <Text fontSize="xs" color="gray.500">
                    JPG, GIF or PNG. Max size of 2MB
                  </Text>
                </VStack>
              </HStack>

              <Divider />

              {/* Form Fields */}
              <VStack spacing={4} align="stretch">
                <FormControl>
                  <FormLabel>Full Name</FormLabel>
                  <InputGroup>
                    <Input
                      placeholder="John Doe"
                      defaultValue="John Doe"
                    />
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <FormLabel>Email Address</FormLabel>
                  <InputGroup>
                    <Input
                      type="email"
                      placeholder="john.doe@example.com"
                      defaultValue="john.doe@example.com"
                    />
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <FormLabel>Phone Number</FormLabel>
                  <InputGroup>
                    <Input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      defaultValue="+1 (555) 123-4567"
                    />
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <FormLabel>Address</FormLabel>
                  <InputGroup>
                    <Input
                      placeholder="123 Main Street, Downtown"
                      defaultValue="123 Main Street, Downtown"
                    />
                  </InputGroup>
                </FormControl>
              </VStack>

              <Flex justify="flex-end">
                <Button leftIcon={<Icon as={Save} />} colorScheme="brand">
                  Save Changes
                </Button>
              </Flex>
            </VStack>
          </Box>

          {/* Security Section */}
          <Box
            id="security"
            p={6}
            borderRadius="xl"
            borderWidth="1px"
            borderColor="gray.200"
            bg="white"
            _dark={{
              borderColor: 'gray.700',
              bg: 'gray.800',
            }}
          >
            <VStack align="stretch" spacing={6}>
              <Heading size="md">Security</Heading>

              <FormControl>
                <FormLabel>Current Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter current password"
                  />
                  <InputRightElement>
                    <IconButton
                      icon={<Icon as={showPassword ? EyeOff : Eye} />}
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel>New Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter new password"
                  />
                  <InputRightElement>
                    <IconButton
                      icon={<Icon as={showPassword ? EyeOff : Eye} />}
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel>Confirm New Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm new password"
                  />
                  <InputRightElement>
                    <IconButton
                      icon={<Icon as={showPassword ? EyeOff : Eye} />}
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Flex justify="flex-end">
                <Button colorScheme="brand">
                  Update Password
                </Button>
              </Flex>
            </VStack>
          </Box>

          {/* Notifications Section */}
          <Box
            id="notifications"
            p={6}
            borderRadius="xl"
            borderWidth="1px"
            borderColor="gray.200"
            bg="white"
            _dark={{
              borderColor: 'gray.700',
              bg: 'gray.800',
            }}
          >
            <VStack align="stretch" spacing={6}>
              <Heading size="md">Notifications</Heading>
              <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
                Choose how you want to receive notifications
              </Text>

              <VStack align="stretch" spacing={4}>
                <Flex justify="space-between" align="center">
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="medium">Email Notifications</Text>
                    <Text fontSize="sm" color="gray.500">
                      Receive updates via email
                    </Text>
                  </VStack>
                  <Switch
                    colorScheme="brand"
                    isChecked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                  />
                </Flex>

                <Divider />

                <Flex justify="space-between" align="center">
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="medium">SMS Notifications</Text>
                    <Text fontSize="sm" color="gray.500">
                      Receive updates via text message
                    </Text>
                  </VStack>
                  <Switch
                    colorScheme="brand"
                    isChecked={smsNotifications}
                    onChange={(e) => setSmsNotifications(e.target.checked)}
                  />
                </Flex>

                <Divider />

                <Flex justify="space-between" align="center">
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="medium">Payment Reminders</Text>
                    <Text fontSize="sm" color="gray.500">
                      Get notified about upcoming payments
                    </Text>
                  </VStack>
                  <Switch colorScheme="brand" defaultChecked />
                </Flex>

                <Divider />

                <Flex justify="space-between" align="center">
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="medium">Maintenance Updates</Text>
                    <Text fontSize="sm" color="gray.500">
                      Get notified about maintenance status
                    </Text>
                  </VStack>
                  <Switch colorScheme="brand" defaultChecked />
                </Flex>
              </VStack>
            </VStack>
          </Box>

          {/* Preferences Section */}
          <Box
            id="preferences"
            p={6}
            borderRadius="xl"
            borderWidth="1px"
            borderColor="gray.200"
            bg="white"
            _dark={{
              borderColor: 'gray.700',
              bg: 'gray.800',
            }}
          >
            <VStack align="stretch" spacing={6}>
              <Heading size="md">Preferences</Heading>

              <VStack align="stretch" spacing={4}>
                <Flex justify="space-between" align="center">
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="medium">Dark Mode</Text>
                    <Text fontSize="sm" color="gray.500">
                      Use dark theme across the app
                    </Text>
                  </VStack>
                  <Switch
                    colorScheme="brand"
                    isChecked={colorMode === 'dark'}
                    onChange={() => {}}
                  />
                </Flex>

                <Divider />

                <Flex justify="space-between" align="center">
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="medium">Auto-pay Rent</Text>
                    <Text fontSize="sm" color="gray.500">
                      Automatically pay rent on due date
                    </Text>
                  </VStack>
                  <Switch colorScheme="brand" />
                </Flex>
              </VStack>
            </VStack>
          </Box>

          {/* Danger Zone */}
          <Box
            id="danger"
            p={6}
            borderRadius="xl"
            borderWidth="1px"
            borderColor="red.200"
            bg="red.50"
            _dark={{
              borderColor: 'red.800',
              bg: 'red.900',
              bgOpacity: 0.1,
            }}
          >
            <VStack align="stretch" spacing={4}>
              <Heading size="md" color="red.600" _dark={{ color: 'red.400' }}>
                Danger Zone
              </Heading>
              <Text fontSize="sm" color="red.600" _dark={{ color: 'red.400' }}>
                Once you delete your account, there is no going back. Please be certain.
              </Text>
              <Box>
                <Button colorScheme="red" variant="outline">
                  Delete Account
                </Button>
              </Box>
            </VStack>
          </Box>
          </VStack>
        </Box>
        </Flex>
      </VStack>
    </DashboardLayout>
  )
}

export default SettingsPage

