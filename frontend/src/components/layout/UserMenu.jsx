import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Icon,
  HStack,
  VStack,
  Text,
  Box,
  useToast,
} from "@chakra-ui/react";
import { User, Settings, HelpCircle, LogOut } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import React from "react";
import { useApp } from "../../context/useApp";

const UserMenu = ({ isCompact = false }) => {
  const navigate = useNavigate();
  const { user, logout } = useApp();
  const toast = useToast();
  
  const handleSettingsClick = () => {
    const settingsPath = user?.role === 'tenant' 
      ? '/tenant/settings' 
      : '/landlord/settings';
    navigate(settingsPath);
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout failed",
        description: "Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const displayName = user?.name || user?.fullName || user?.email || "User";
  const displayRole = user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "User";

  return (
    <Menu>
      <MenuButton>
        {isCompact ? (
          <Avatar
            size="sm"
            name={displayName}
            src={user?.avatarUrl}
            bg="brand.500"
            cursor="pointer"
            _hover={{
              opacity: 0.8,
            }}
          />
        ) : (
          <HStack
            spacing={3}
            p={3}
            borderRadius="lg"
            bg="gray.100"
            cursor="pointer"
            transition="all 0.2s"
            _hover={{
              bg: "gray.200",
            }}
            _dark={{
              bg: "gray.800",
              _hover: {
                bg: "gray.700",
              },
            }}
          >
            <Avatar size="sm" name={displayName} src={user?.avatarUrl} bg="brand.500" />
            <VStack align="start" spacing={0} flex={1}>
              <Text fontSize="sm" fontWeight="semibold">
                {displayName}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {displayRole}
              </Text>
            </VStack>
          </HStack>
        )}
      </MenuButton>
      <MenuList>
        <Box px={3} py={2}>
          <Text fontSize="sm" fontWeight="semibold">
            {displayName}
          </Text>
          <Text fontSize="xs" color="gray.500">
            {displayRole}
          </Text>
        </Box>
        <MenuDivider />
        <MenuItem icon={<Icon as={User} boxSize={4} />}>My Profile</MenuItem>
        <MenuItem 
          icon={<Icon as={Settings} boxSize={4} />}
          onClick={handleSettingsClick}
        >
          Settings
        </MenuItem>
        <MenuItem icon={<Icon as={HelpCircle} boxSize={4} />}>
          Help & Support
        </MenuItem>
        <MenuDivider />
        <MenuItem
          icon={<Icon as={LogOut} boxSize={4} />}
          color="red.500"
          _dark={{ color: "red.400" }}
          onClick={handleLogout}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
