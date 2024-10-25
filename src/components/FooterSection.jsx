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
  Stack,
  Grid,
  Flex,
  GridItem,
  Divider,
} from "@chakra-ui/react";
import { fetchGetRequest, sendPostRequest } from "../api/api";

const FooterSection = () => {
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    fetchFooterData();
  }, []);

  const fetchFooterData = async () => {
    try {
      const response = await fetchGetRequest("http://localhost:8091/api/getData?section=footer");
      setFooterData(response.data);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error fetching Footer Section data",
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
        section: "footer",
        data: footerData,
      };
      await sendPostRequest(`http://localhost:8091/api/updateData/${footerData._id.$oid}`, updatedData);
      toast({
        title: "Footer Section updated successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error updating Footer Section data",
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
    <Box maxW="1200px" mx="auto" py={8} px={4} bg="gray.50" borderRadius="lg" shadow="lg">
      <Text fontSize="3xl" fontWeight="bold" mb={8} textAlign="center">
        Footer Section Management
      </Text>

      {/* Rights */}
      <FormControl mb={4}>
        <FormLabel fontWeight="bold">Copyright Rights</FormLabel>
        <Input
          value={footerData.rights}
          onChange={(e) => setFooterData({ ...footerData, rights: e.target.value })}
          border="1px solid"
          borderColor="gray.300"
          p={2}
        />
      </FormControl>

      {/* Social Media Links */}
      <Text fontSize="2xl" fontWeight="bold" mb={4}>Social Media Links</Text>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {footerData.social_media.map((social, index) => (
          <GridItem key={index} bg="white" borderRadius="md" shadow="md" p={4}>
            <FormControl mb={2}>
              <FormLabel fontWeight="bold">Link</FormLabel>
              <Input
                value={social.link}
                onChange={(e) => {
                  const newSocialMedia = [...footerData.social_media];
                  newSocialMedia[index].link = e.target.value;
                  setFooterData({ ...footerData, social_media: newSocialMedia });
                }}
                border="1px solid"
                borderColor="gray.300"
                p={2}
              />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel fontWeight="bold">Icon URL</FormLabel>
              <Input
                value={social.icon}
                onChange={(e) => {
                  const newSocialMedia = [...footerData.social_media];
                  newSocialMedia[index].icon = e.target.value;
                  setFooterData({ ...footerData, social_media: newSocialMedia });
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

      {/* Footer Links */}
      <Text fontSize="2xl" fontWeight="bold" mb={4}>Footer Links</Text>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {footerData.links.map((link, index) => (
          <GridItem key={index} bg="white" borderRadius="md" shadow="md" p={4}>
            <FormControl mb={2}>
              <FormLabel fontWeight="bold">Link Name</FormLabel>
              <Input
                value={link.name}
                onChange={(e) => {
                  const newLinks = [...footerData.links];
                  newLinks[index].name = e.target.value;
                  setFooterData({ ...footerData, links: newLinks });
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
                  const newLinks = [...footerData.links];
                  newLinks[index].link = e.target.value;
                  setFooterData({ ...footerData, links: newLinks });
                }}
                border="1px solid"
                borderColor="gray.300"
                p={2}
              />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel fontWeight="bold">Icon URL</FormLabel>
              <Input
                value={link.icon}
                onChange={(e) => {
                  const newLinks = [...footerData.links];
                  newLinks[index].icon = e.target.value;
                  setFooterData({ ...footerData, links: newLinks });
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
        Update
      </Button>
    </Box>
  );
};

export default FooterSection;
