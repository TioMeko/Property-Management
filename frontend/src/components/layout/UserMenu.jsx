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
} from "@chakra-ui/react";
import { User, Settings, HelpCircle, LogOut } from "lucide-react";

const UserMenu = ({
  userName = "John Doe",
  userRole = "Tenant",
  isCompact = false,
}) => {
  return (
    <Menu>
      <MenuButton>
        {isCompact ? (
          <Avatar
            size="sm"
            name={userName}
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
            <Avatar size="sm" name={userName} bg="brand.500" />
            <VStack align="start" spacing={0} flex={1}>
              <Text fontSize="sm" fontWeight="semibold">
                {userName}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {userRole}
              </Text>
            </VStack>
          </HStack>
        )}
      </MenuButton>
      <MenuList>
        <Box px={3} py={2}>
          <Text fontSize="sm" fontWeight="semibold">
            {userName}
          </Text>
          <Text fontSize="xs" color="gray.500">
            {userRole}
          </Text>
        </Box>
        <MenuDivider />
        <MenuItem icon={<Icon as={User} boxSize={4} />}>My Profile</MenuItem>
        <MenuItem icon={<Icon as={Settings} boxSize={4} />}>Settings</MenuItem>
        <MenuItem icon={<Icon as={HelpCircle} boxSize={4} />}>
          Help & Support
        </MenuItem>
        <MenuDivider />
        <MenuItem
          icon={<Icon as={LogOut} boxSize={4} />}
          color="red.500"
          _dark={{ color: "red.400" }}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
