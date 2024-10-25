import React, { useState, useEffect } from "react";
import {
  useToast,
  Spinner,
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Text,
  Grid,
  GridItem,
  Flex,
  Divider,
} from "@chakra-ui/react";
import { fetchGetRequest, sendPostRequest } from "../api/api";

const HeaderSection = () => {
  const [headerData, setHeaderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    fetchHeaderData();
  }, []);

  const fetchHeaderData = async () => {
    try {
      const response = await fetchGetRequest("http://localhost:8091/api/getData?section=header");
      setHeaderData(response.data);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error fetching Header Section data",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedData = {
        section: "header",
        data: headerData,
      };
      await sendPostRequest(`http://localhost:8091/api/updateData/${headerData._id.$oid}`, updatedData);
      toast({
        title: "Header Section updated successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error updating Header Section data",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" height="300px">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box maxW="1200px" mx="auto" py={8} px={4} bg="gray.50" borderRadius="lg" >
      <Text fontSize="3xl" fontWeight="bold" mb={8} textAlign="center">
        Header Section Management
      </Text>
      {/* Logo */}
      <FormControl mb={4}>
        <FormLabel fontWeight="bold">Logo URL</FormLabel>
        <Input
          value={headerData.logo}
          onChange={(e) => setHeaderData({ ...headerData, logo: e.target.value })}
          border="1px solid"
          borderColor="gray.300"
          p={2}
        />
      </FormControl>

      {/* Favicon */}
      <FormControl mb={4}>
        <FormLabel fontWeight="bold">Favicon URL</FormLabel>
        <Input
          value={headerData.favicon}
          onChange={(e) => setHeaderData({ ...headerData, favicon: e.target.value })}
          border="1px solid"
          borderColor="gray.300"
          p={2}
        />
      </FormControl>

      {/* Navigation Links */}
      <Text fontSize="2xl" fontWeight="bold" mb={4}>Navigation Links</Text>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        {headerData.links.map((link, index) => (
          <GridItem key={index} bg="white" borderRadius="md" shadow="md" p={4}>
            <FormControl mb={2}>
              <FormLabel fontWeight="bold">Link Name</FormLabel>
              <Input
                value={link.name}
                onChange={(e) => {
                  const newLinks = [...headerData.links];
                  newLinks[index].name = e.target.value;
                  setHeaderData({ ...headerData, links: newLinks });
                }}
                border="1px solid"
                borderColor="gray.300"
                p={2}
              />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel fontWeight="bold">Link URL</FormLabel>
              <Input
                value={link.link}
                onChange={(e) => {
                  const newLinks = [...headerData.links];
                  newLinks[index].link = e.target.value;
                  setHeaderData({ ...headerData, links: newLinks });
                }}
                border="1px solid"
                borderColor="gray.300"
                p={2}
              />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel fontWeight="bold">Button Text</FormLabel>
              <Input
                value={link.button_text}
                onChange={(e) => {
                  const newLinks = [...headerData.links];
                  newLinks[index].button_text = e.target.value;
                  setHeaderData({ ...headerData, links: newLinks });
                }}
                border="1px solid"
                borderColor="gray.300"
                p={2}
              />
            </FormControl>
          </GridItem>
        ))}
      </Grid>
      <Divider my={4} />
      <Button onClick={handleUpdate} colorScheme="teal" isFullWidth>
        Update Header
      </Button>
    </Box>
  );
};

export default HeaderSection;
