import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  VStack,
  HStack,
  Text,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { X } from "lucide-react";
import { Icon } from "@chakra-ui/react";
import React from "react";

const AuthModal = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState("login"); // 'login' or 'signup'

  // Dark theme colors
  const bgColor = useColorModeValue("gray.800", "gray.800");
  const textColor = useColorModeValue("white", "white");
  const inputBg = useColorModeValue("gray.700", "gray.700");
  const inputBorder = useColorModeValue("gray.600", "gray.600");
  const toggleActiveBg = useColorModeValue("black", "black");
  const toggleInactiveBg = useColorModeValue("gray.700", "gray.700");
  const buttonBg = useColorModeValue("blue.500", "blue.500");
  const buttonHoverBg = useColorModeValue("blue.600", "blue.600");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(`${mode} submitted`);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(4px)" />
      <ModalContent
        bg={bgColor}
        color={textColor}
        borderRadius="lg"
        boxShadow="2xl"
        maxW="450px"
      >
        <ModalCloseButton
          color={textColor}
          _hover={{ bg: "gray.700" }}
          icon={<Icon as={X} boxSize={4} />}
        />
        <ModalHeader textAlign="center" pt={8} pb={2}>
          <VStack spacing={2}>
            <Text fontSize="2xl" fontWeight="bold" color={textColor}>
              Welcome to Conglomo
            </Text>
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              Manage your properties with ease
            </Text>
          </VStack>
        </ModalHeader>

        <ModalBody px={8} pb={8}>
          <VStack spacing={6} align="stretch">
            {/* Toggle between Login and Sign Up */}
            <HStack
              spacing={0}
              borderRadius="md"
              overflow="hidden"
              bg={toggleInactiveBg}
            >
              <Button
                flex={1}
                variant="ghost"
                onClick={() => setMode("login")}
                bg={mode === "login" ? toggleActiveBg : "transparent"}
                color={textColor}
                borderRadius="md"
                borderTopRightRadius="none"
                borderBottomRightRadius="none"
                _hover={{
                  bg: mode === "login" ? toggleActiveBg : "gray.600",
                }}
                fontWeight={mode === "login" ? "semibold" : "normal"}
              >
                Log In
              </Button>
              <Button
                flex={1}
                variant="ghost"
                onClick={() => setMode("signup")}
                bg={mode === "signup" ? toggleActiveBg : "transparent"}
                color={textColor}
                borderRadius="md"
                borderTopLeftRadius="none"
                borderBottomLeftRadius="none"
                _hover={{
                  bg: mode === "signup" ? toggleActiveBg : "gray.600",
                }}
                fontWeight={mode === "signup" ? "semibold" : "normal"}
              >
                Sign Up
              </Button>
            </HStack>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <VStack spacing={5} align="stretch">
                {/* Email Field */}
                <FormControl>
                  <FormLabel color={textColor} fontSize="sm" mb={2}>
                    Email
                  </FormLabel>
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    bg={inputBg}
                    borderColor={inputBorder}
                    color={textColor}
                    _placeholder={{ color: "gray.400" }}
                    _hover={{ borderColor: "gray.500" }}
                    _focus={{
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
                    }}
                    borderRadius="md"
                  />
                </FormControl>

                {/* Password Field */}
                <FormControl>
                  <FormLabel color={textColor} fontSize="sm" mb={2}>
                    Password
                  </FormLabel>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    bg={inputBg}
                    borderColor={inputBorder}
                    color={textColor}
                    _placeholder={{ color: "gray.400" }}
                    _hover={{ borderColor: "gray.500" }}
                    _focus={{
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
                    }}
                    borderRadius="md"
                  />
                </FormControl>

                {/* Submit Button */}
                <Button
                  type="submit"
                  bg={buttonBg}
                  color="white"
                  _hover={{ bg: buttonHoverBg }}
                  size="lg"
                  w="full"
                  borderRadius="md"
                  fontWeight="semibold"
                >
                  {mode === "login" ? "Log In" : "Sign Up"}
                </Button>

                {/* Forgot Password Link (only show on login) */}
                {mode === "login" && (
                  <Link
                    href="#"
                    color="gray.400"
                    fontSize="sm"
                    textAlign="center"
                    _hover={{ color: "gray.300" }}
                  >
                    Forgot password?
                  </Link>
                )}
              </VStack>
            </form>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
