import React from 'react';
import { Box, Container, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <Container maxW="container.md" p={4}>
      <Box as="header" mb={6}>
        <Heading as="h1" size="xl" textAlign="center">
          My Application
        </Heading>
        <Box textAlign="center" mt={4}>
          <Link to="/">Home</Link> | <Link to="/about">About</Link> |{' '}
          <Link to="/contact">Contact</Link> | <Link to="/login">Login</Link>
        </Box>
      </Box>
      
      <Box as="main" mb={6}>
        {children}
      </Box>

      <Box as="footer" textAlign="center" py={4}>
        <Text>&copy; {new Date().getFullYear()} My Application. All rights reserved.</Text>
      </Box>
    </Container>
  );
};

export default Layout;
