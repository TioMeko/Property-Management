import {
  Box,
  Flex,
  Icon,
  IconButton,
  Text,
  VStack,
  Tooltip,
  Divider,
} from "@chakra-ui/react";
import {
  Home,
  Building2,
  Wrench,
  DollarSign,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import UserMenu from "./UserMenu";
import React from "react";

const tenantNavItems = [
  { icon: Home, label: "Dashboard", path: "/tenant/dashboard" },
  { icon: DollarSign, label: "Rent & Payments", path: "/tenant/payments" },
  { icon: Wrench, label: "Maintenance", path: "/tenant/maintenance" },
  { icon: MessageSquare, label: "Messages", path: "/tenant/messages" },
  { icon: Settings, label: "Settings", path: "/tenant/settings" },
];

const landlordNavItems = [
  { icon: Home, label: "Dashboard", path: "/landlord/dashboard" },
  { icon: Building2, label: "Properties", path: "/landlord/properties" },
  { icon: DollarSign, label: "Finances", path: "/landlord/finances" },
  { icon: Wrench, label: "Maintenance", path: "/landlord/maintenance" },
  { icon: MessageSquare, label: "Messages", path: "/landlord/messages" },
  { icon: Settings, label: "Settings", path: "/landlord/settings" },
];

const NavItem = ({ icon, label, path, onClose, isCollapsed }) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  const navContent = (
    <Link to={path} onClick={onClose}>
      <Flex
        align="center"
        justify={isCollapsed ? "center" : "flex-start"}
        gap={3}
        px={isCollapsed ? 0 : 4}
        py={3}
        borderRadius="lg"
        cursor="pointer"
        bg={isActive ? "brand.50" : "transparent"}
        color={isActive ? "brand.600" : "gray.600"}
        fontWeight={isActive ? "semibold" : "normal"}
        transition="all 0.2s"
        w="full"
        _hover={{
          bg: isActive ? "brand.100" : "gray.100",
          color: isActive ? "brand.700" : "gray.700",
        }}
        _dark={{
          bg: isActive ? "brand.900" : "transparent",
          color: isActive ? "brand.300" : "gray.400",
          _hover: {
            bg: isActive ? "brand.800" : "gray.800",
            color: isActive ? "brand.200" : "gray.300",
          },
        }}
      >
        <Icon as={icon} boxSize={5} />
        {!isCollapsed && <Text fontSize="sm">{label}</Text>}
      </Flex>
    </Link>
  );

  if (isCollapsed) {
    return (
      <Tooltip label={label} placement="right" hasArrow>
        {navContent}
      </Tooltip>
    );
  }

  return navContent;
};

const Sidebar = ({
  userType = "tenant",
  onClose,
  isCollapsed,
  onToggleCollapse,
}) => {
  const navItems = userType === "tenant" ? tenantNavItems : landlordNavItems;

  return (
    <VStack align="stretch" spacing={1} h="full" w="full">
      {/* Header */}
      <Flex
        align="center"
        justify={isCollapsed ? "center" : "space-between"}
        px={isCollapsed ? 2 : 4}
        py={6}
      >
        {isCollapsed ? (
          <Tooltip label="Conglomo" placement="right" hasArrow>
            <Flex>
              <Icon as={Building2} boxSize={8} color="brand.500" />
            </Flex>
          </Tooltip>
        ) : (
          <Flex align="center" gap={2}>
            <Icon as={Building2} boxSize={8} color="brand.500" />
            <Text fontSize="lg" fontWeight="bold">
              Conglomo
            </Text>
          </Flex>
        )}
      </Flex>

      {/* Navigation Items */}
      <VStack align="stretch" spacing={0} flex={1} px={2}>
        {navItems.map((item, index) => (
          <Box key={item.path}>
            <NavItem {...item} onClose={onClose} isCollapsed={isCollapsed} />
            {index < navItems.length - 1 && (
              <Divider
                my={1}
                borderColor="gray.200"
                opacity={0.6}
                _dark={{ borderColor: "gray.700", opacity: 0.4 }}
              />
            )}
          </Box>
        ))}
      </VStack>

      {/* Toggle Button */}
      {!isCollapsed && (
        <Flex justify="center" pb={2}>
          <IconButton
            icon={<Icon as={isCollapsed ? ChevronRight : ChevronLeft} />}
            size="sm"
            variant="ghost"
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          />
        </Flex>
      )}

      {/* User Profile */}
      <Box px={isCollapsed ? 2 : 4} py={4}>
        {isCollapsed ? (
          <Tooltip label="John Doe" placement="right" hasArrow>
            <Flex justify="center">
              <UserMenu
                userName="John Doe"
                userRole={userType === "tenant" ? "Tenant" : "Landlord"}
                isCompact
              />
            </Flex>
          </Tooltip>
        ) : (
          <UserMenu
            userName="John Doe"
            userRole={userType === "tenant" ? "Tenant" : "Landlord"}
          />
        )}
      </Box>

      {/* Collapse Toggle at Bottom (collapsed state) */}
      {isCollapsed && (
        <Flex justify="center" pb={4}>
          <IconButton
            icon={<Icon as={ChevronRight} />}
            size="sm"
            variant="ghost"
            onClick={onToggleCollapse}
            aria-label="Expand sidebar"
          />
        </Flex>
      )}
    </VStack>
  );
};

export default Sidebar;
