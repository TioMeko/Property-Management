import { useState, useEffect, useRef } from "react";
import {
  Container,
  Flex,
  Text,
  Button,
  HStack,
  Link,
  Icon,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { Building2, Moon, Sun } from "lucide-react";
import AuthModal from "../AuthModal";
import React from "react";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const headerRef = useRef(null);

  // Scroll Detector to switch the menu positioning and bg color
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler for navigation links
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element && headerRef.current) {
      const headerHeight = headerRef.current.offsetHeight;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <Flex
      ref={headerRef}
      as="header"
      position={isScrolled ? "sticky" : "absolute"}
      top={0}
      left={0}
      right={0}
      zIndex={50}
      w="100%"
      borderBottom="1px"
      borderColor={isScrolled ? "gray.200" : "transparent"}
      bg={isScrolled ? "rgba(220, 220, 220, 0.75)" : "transparent"}
      backdropFilter={isScrolled ? "blur(10px)" : "none"}
      transition="all 0.3s ease"
      _dark={{
        borderColor: isScrolled ? "gray.700" : "transparent",
        bg: isScrolled ? "rgba(23, 25, 35, 0.8)" : "transparent",
      }}
    >
      <Container maxW="container.xl" py={4} px={{ base: 4, md: 6 }}>
        <Flex justify="space-between" align="center">
          <HStack spacing={2}>
            <Icon as={Building2} boxSize={8} color="brand.500" />
            <Text fontSize="xl" fontWeight="semibold">
              Conglomo Property Management
            </Text>
          </HStack>
          <Flex display={{ base: "none", md: "flex" }} align="center" gap={8}>
            <Link
              href="#features"
              onClick={(e) => handleSmoothScroll(e, "features")}
              fontSize="sm"
              color="gray.600"
              _hover={{ color: "gray.900" }}
              _dark={{ color: "gray.400", _hover: { color: "gray.50" } }}
            >
              Features
            </Link>
            <Link
              href="#testimonials"
              onClick={(e) => handleSmoothScroll(e, "testimonials")}
              fontSize="sm"
              color="gray.600"
              _hover={{ color: "gray.900" }}
              _dark={{ color: "gray.400", _hover: { color: "gray.50" } }}
            >
              Testimonials
            </Link>
            <Link
              href="#pricing"
              onClick={(e) => handleSmoothScroll(e, "pricing")}
              fontSize="sm"
              color="gray.600"
              _hover={{ color: "gray.900" }}
              _dark={{ color: "gray.400", _hover: { color: "gray.50" } }}
            >
              Pricing
            </Link>
            <Button
              variant="ghost"
              size="sm"
              colorScheme="gray"
              onClick={() => setIsAuthModalOpen(true)}
            >
              Log In
            </Button>
            <Button
              size="sm"
              colorScheme="brand"
              onClick={() => setIsAuthModalOpen(true)}
            >
              Get Started
            </Button>
            <IconButton
              icon={<Icon as={colorMode === "light" ? Moon : Sun} />}
              onClick={toggleColorMode}
              aria-label="Toggle color mode"
              variant="ghost"
              size="sm"
            />
          </Flex>
        </Flex>
      </Container>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </Flex>
  );
};

export default Header;
