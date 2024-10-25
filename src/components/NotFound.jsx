import React from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  Center,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const buttonSize = useBreakpointValue({ base: 'md', md: 'lg' });

  return (
    <Center height="100vh" flexDirection="column" bg="gray.50" p={4}>
      <Box textAlign="center" mx="auto">
        <Heading as="h1" size="2xl" color="blue.600">
          404
        </Heading>
        <Text fontSize="lg" mt={4} color="gray.600">
          Oops! The page you're looking for doesn't exist.
        </Text>
        <Text mt={2} color="gray.500">
          It might have been removed, or you may have mistyped the URL.
        </Text>
        <Button 
          as={Link} 
          to="/" 
          colorScheme="blue" 
          size={buttonSize} 
          mt={6}
        >
          Go Back Home
        </Button>
      </Box>
    </Center>
  );
};

export default NotFound;
