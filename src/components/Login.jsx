import React, { useState } from 'react';
import {
  Box,
  Text,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useBreakpointValue,
  Link,
  FormErrorMessage,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const formWidth = useBreakpointValue({ base: '90%', md: '500px' });
  const toast = useToast();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const staticUsername = 'user123'; // Static username
  const staticPassword = 'pass123'; // Static password
  const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!username || !password) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }
    
    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (username !== staticUsername || password !== staticPassword) {
      setError('Invalid username or password.');
      toast({
        title: 'Error.',
        description: 'Invalid username or password.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    // On successful login
    toast({
        title: 'Login Successful!',
        description: 'You have logged in successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
    });
    navigate("/")
    setLoading(false);
    console.log('Logged in successfully!');
    // Proceed with redirection or further actions here
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
      bgGradient="linear(to-r, teal.500, blue.500)"
      minHeight="100vh"
    >
      <Box
        bg="white"
        borderRadius="md"
        p={10}
        width={formWidth}
        boxShadow="md"
      >
        <VStack spacing={6} as="form" onSubmit={handleSubmit}>
          <Heading as="h1" size="xl" textAlign="center" color="blue.600">
            Welcome Back
          </Heading>
          <Text fontSize="lg" textAlign="center" color="gray.600">
            Please enter your credentials to continue.
          </Text>
          <FormControl isInvalid={!!error}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="Your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!error}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>
          <Button colorScheme="blue" size="lg" width="full" type="submit" isLoading={loading} loadingText="Logging In">
            Login
          </Button>
          <Text textAlign="center">
            Don't have an account? <Link href="/register" color="blue.500">Register here</Link>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default Login;
