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
  GridItem,
  Divider,
  Flex,
} from "@chakra-ui/react";
import { fetchGetRequest, sendPostRequest } from "../api/api";

const AboutUs = () => {
  const [aboutData, setAboutData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadImageLoading, setUploadImageLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const response = await fetchGetRequest(`${import.meta.env.VITE_API_URL}/api/getData?section=aboutus`);
      setAboutData(response.data);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error fetching About Us data",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  const handleUpdate = async (index) => {
    try {
      const updatedData = {
        section: "aboutus",
        data: aboutData[index],
      };
      await sendPostRequest(`${import.meta.env.VITE_API_URL}/api/updateData`, updatedData);
      toast({
        title: "About Us updated successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error updating About Us data",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleImageUpload = async (file, index, type) => {
    setUploadImageLoading(true);
    const formData = new FormData();
    formData.append("post_img", file);
    try {
      const response = await sendPostRequest(`${import.meta.env.VITE_API_URL}/api/get-image-url`, formData);
      if (response.url) {
        toast({
          title: "Image uploaded successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        const newData = [...aboutData];
        if (type === "logo") newData[index].logo = response.url;
        else if (type === "icon") newData[index].icon = response.url; // Update for icon URL

        setAboutData(newData);
        await handleUpdate(index); // Update the data after setting the image URL
      }
    } catch (error) {
      toast({
        title: "Error uploading image",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setUploadImageLoading(false);
    }
  };

  const handleFileChange = (event, index, type) => {
    const file = event.target.files[0];
    if (file) {
      handleImageUpload(file, index, type);
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
    <Box maxW="1200px" mx="auto" py={8} px={4} bg="gray.50" borderRadius="lg">
      <Text fontSize="3xl" fontWeight="bold" mb={8} textAlign="center">
        About Us Management
      </Text>

      {aboutData&&aboutData.map((about, index) => (
        <Box key={about._id.$oid} mb={6} p={4} bg="white" borderRadius="md">
          {/* Title */}
          <FormControl mb={4}>
            <FormLabel fontWeight="bold">Title</FormLabel>
            <Input
              value={about.title}
              onChange={(e) => {
                const newData = [...aboutData];
                newData[index].title = e.target.value;
                setAboutData(newData);
              }}
              border="1px solid"
              borderColor="gray.300"
              p={2}
            />
          </FormControl>

          {/* Description */}
          <FormControl mb={4}>
            <FormLabel fontWeight="bold">Description</FormLabel>
            <Input
              value={about.description}
              onChange={(e) => {
                const newData = [...aboutData];
                newData[index].description = e.target.value;
                setAboutData(newData);
              }}
              border="1px solid"
              borderColor="gray.300"
              p={2}
            />
          </FormControl>

          {/* Image Upload */}
          <FormControl mb={4}>
            <FormLabel fontWeight="bold">Upload Image</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, index, "image")}
              height={12}
              p={2}
            />
          </FormControl>

          {/* Card Details */}
          <Text fontSize="2xl" fontWeight="bold" mb={4}>Card Details</Text>
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {about.card_details.map((card, cardIndex) => (
              <GridItem key={card._id.$oid} bg="white" borderRadius="md" shadow="md" p={4}>
                <FormControl mb={2}>
                  <FormLabel fontWeight="bold">Card Title</FormLabel>
                  <Input
                    value={card.title}
                    onChange={(e) => {
                      const newCardData = [...aboutData];
                      newCardData[index].card_details[cardIndex].title = e.target.value;
                      setAboutData(newCardData);
                    }}
                    border="1px solid"
                    borderColor="gray.300"
                    p={2}
                  />
                </FormControl>
                <FormControl mb={2}>
                  <FormLabel fontWeight="bold">Description</FormLabel>
                  <Input
                    value={card.description}
                    onChange={(e) => {
                      const newCardData = [...aboutData];
                      newCardData[index].card_details[cardIndex].description = e.target.value;
                      setAboutData(newCardData);
                    }}
                    border="1px solid"
                    borderColor="gray.300"
                    p={2}
                  />
                </FormControl>
                <FormControl mb={2}>
                  <FormLabel fontWeight="bold">Icon URL</FormLabel>
                  <Input
                    value={card.icon}
                    onChange={(e) => {
                      const newCardData = [...aboutData];
                      newCardData[index].card_details[cardIndex].icon = e.target.value;
                      setAboutData(newCardData);
                    }}
                    border="1px solid"
                    borderColor="gray.300"
                    p={2}
                  />
                </FormControl>

                {/* Upload Icon */}
                <FormControl mb={2}>
                  <FormLabel fontWeight="bold">Upload Icon</FormLabel>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, index, "icon")} // Handle icon upload
                    height={12}
                    p={2}
                  />
                </FormControl>
              </GridItem>
            ))}
          </Grid>

          <Divider my={4} />

          <Button onClick={() => handleUpdate(index)} colorScheme="teal" isFullWidth isLoading={uploadImageLoading}>
            Update
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default AboutUs;
