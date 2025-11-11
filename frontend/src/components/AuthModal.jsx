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
  useToast,
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";
import { X } from "lucide-react";
import { Icon } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/useApp";

const AuthModal = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState("login"); // 'login' or 'signup'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("tenant");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const { login, signup, loading } = useApp();
  const navigate = useNavigate();
  const toast = useToast();

  // Dark theme colors
  const bgColor = useColorModeValue("gray.800", "gray.800");
  const textColor = useColorModeValue("white", "white");
  const inputBg = useColorModeValue("gray.700", "gray.700");
  const inputBorder = useColorModeValue("gray.600", "gray.600");
  const toggleActiveBg = useColorModeValue("black", "black");
  const toggleInactiveBg = useColorModeValue("gray.700", "gray.700");
  const buttonBg = useColorModeValue("blue.500", "blue.500");
  const buttonHoverBg = useColorModeValue("blue.600", "blue.600");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setIsSubmitting(true);

    try {
      if (mode === "login") {
        const result = await login({ email, password });
        
        if (result.success) {
          toast({
            title: "Login Successful",
            description: `Welcome back, ${result.user.name || result.user.email}!`,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          
          // Navigate to appropriate dashboard based on user role
          const dashboardPath = result.user.role === "landlord" 
            ? "/landlord/dashboard" 
            : "/tenant/dashboard";
          
          onClose();
          navigate(dashboardPath);
        } else {
          setFormError(result.error || "Login failed. Please try again.");
        }
      } else {
        // Signup
        const result = await signup({ 
          email, 
          password, 
          name,
          role,
        });
        
        if (result.success) {
          toast({
            title: "Account Created",
            description: "Welcome to Conglomo!",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          
          // Navigate to appropriate dashboard based on user role
          const dashboardPath = result.user.role === "landlord" 
            ? "/landlord/dashboard" 
            : "/tenant/dashboard";
          
          onClose();
          navigate(dashboardPath);
        } else {
          setFormError(result.error || "Signup failed. Please try again.");
        }
      }
    } catch (error) {
      setFormError("An unexpected error occurred. Please try again.");
      console.error("Auth error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setFormError("");
    setEmail("");
    setPassword("");
    setName("");
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
                onClick={() => handleModeChange("login")}
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
                onClick={() => handleModeChange("signup")}
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

            {/* Error Alert */}
            {formError && (
              <Alert status="error" borderRadius="md" bg="red.900">
                <AlertIcon />
                <AlertDescription fontSize="sm">{formError}</AlertDescription>
              </Alert>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <VStack spacing={5} align="stretch">
                {/* Name Field (only for signup) */}
                {mode === "signup" && (
                  <FormControl isRequired>
                    <FormLabel color={textColor} fontSize="sm" mb={2}>
                      Full Name
                    </FormLabel>
                    <Input
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                )}

                {/* Email Field */}
                <FormControl isRequired>
                  <FormLabel color={textColor} fontSize="sm" mb={2}>
                    Email
                  </FormLabel>
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                <FormControl isRequired>
                  <FormLabel color={textColor} fontSize="sm" mb={2}>
                    Password
                  </FormLabel>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

                {/* Role Selection (only for signup) */}
                {mode === "signup" && (
                  <FormControl>
                    <FormLabel color={textColor} fontSize="sm" mb={2}>
                      I am a
                    </FormLabel>
                    <HStack spacing={0} borderRadius="md" overflow="hidden" bg={toggleInactiveBg}>
                      <Button
                        flex={1}
                        variant="ghost"
                        onClick={() => setRole("tenant")}
                        bg={role === "tenant" ? toggleActiveBg : "transparent"}
                        color={textColor}
                        size="sm"
                        _hover={{
                          bg: role === "tenant" ? toggleActiveBg : "gray.600",
                        }}
                        fontWeight={role === "tenant" ? "semibold" : "normal"}
                      >
                        Tenant
                      </Button>
                      <Button
                        flex={1}
                        variant="ghost"
                        onClick={() => setRole("landlord")}
                        bg={role === "landlord" ? toggleActiveBg : "transparent"}
                        color={textColor}
                        size="sm"
                        _hover={{
                          bg: role === "landlord" ? toggleActiveBg : "gray.600",
                        }}
                        fontWeight={role === "landlord" ? "semibold" : "normal"}
                      >
                        Landlord
                      </Button>
                    </HStack>
                  </FormControl>
                )}

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
                  isLoading={isSubmitting || loading}
                  loadingText={mode === "login" ? "Logging in..." : "Signing up..."}
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
