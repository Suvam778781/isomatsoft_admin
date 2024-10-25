import React from 'react';
import {
  Box,
  VStack,
  Link,
  Icon,
  Text,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
} from '@chakra-ui/react';
import { FaHome, FaStar, FaImages, FaInfoCircle, FaCog, FaSignInAlt } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        icon={<GiHamburgerMenu />}
        size="lg"
        onClick={onOpen}
        aria-label="Open Sidebar"
        position="fixed"
        top={4}
        left={4}
        zIndex={1}
      />

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              <Link display="flex" alignItems="center" p={2} borderRadius="md" _hover={{ bg: 'gray.100' }} href="/header">
                <Icon as={FaHome} w={5} h={5} />
                <Text ml={2}>Header</Text>
              </Link>
              <Link display="flex" alignItems="center" p={2} borderRadius="md" _hover={{ bg: 'gray.100' }} href="/hero">
                <Icon as={FaStar} w={5} h={5} />
                <Text ml={2}>Hero Section</Text>
              </Link>
              <Link display="flex" alignItems="center" p={2} borderRadius="md" _hover={{ bg: 'gray.100' }} href="/carousel">
                <Icon as={FaImages} w={5} h={5} />
                <Text ml={2}>Carousels Manage</Text>
              </Link>
              <Link display="flex" alignItems="center" p={2} borderRadius="md" _hover={{ bg: 'gray.100' }} href="/">
                <Icon as={FaInfoCircle} w={5} h={5} />
                <Text ml={2}>About Us</Text>
              </Link>
              <Link display="flex" alignItems="center" p={2} borderRadius="md" _hover={{ bg: 'gray.100' }} href="/footer">
                <Icon as={FaCog} w={5} h={5} />
                <Text ml={2}>Footer</Text>
              </Link>
              <Link display="flex" alignItems="center" p={2} borderRadius="md" _hover={{ bg: 'gray.100' }} href="/login">
                <Icon as={FaSignInAlt} w={5} h={5} />
                <Text ml={2}>Login</Text>
              </Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
