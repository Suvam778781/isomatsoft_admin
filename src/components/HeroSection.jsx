import React, { useState, useEffect } from "react";
import {
  useToast,
  Spinner,
  Box,
  Button,
  Input,
  Image,
  FormControl,
  FormLabel,
  Text,
  Stack,
  Grid,
  GridItem,
  Divider,
  Flex
} from "@chakra-ui/react";
import { fetchGetRequest, sendPostRequest } from "../api/api";

const HeroSection = () => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      const response = await fetchGetRequest("http://localhost:8091/api/getData?section=hero_section");
      setHeroData(response.data);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error fetching Hero Section data",
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
        section: "hero_section",
        data: heroData,
      };
      await sendPostRequest(`http://localhost:8091/api/updateData/${heroData._id.$oid}`, updatedData);
      toast({
        title: "Hero Section updated successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error updating Hero Section data",
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
    <Box  mx="auto" py={8} px={4} bg="gray.50" borderRadius="lg" >
      <Text fontSize="3xl" fontWeight="bold" mb={8} textAlign="center">
        Hero Section Management
      </Text>

      {/* Title */}
      <FormControl mb={4}>
        <FormLabel fontWeight="bold">Title</FormLabel>
        <Input
          value={heroData.title}
          onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
          border="1px solid"
          borderColor="gray.300"
          p={2}
        />
      </FormControl>

      {/* Description */}
      <FormControl mb={4}>
        <FormLabel fontWeight="bold">Description</FormLabel>
        <Input
          value={heroData.description}
          onChange={(e) => setHeroData({ ...heroData, description: e.target.value })}
          border="1px solid"
          borderColor="gray.300"
          p={2}
        />
      </FormControl>

      {/* Button Text */}
      <FormControl mb={4}>
        <FormLabel fontWeight="bold">Button Text</FormLabel>
        <Input
          value={heroData.button_text}
          onChange={(e) => setHeroData({ ...heroData, button_text: e.target.value })}
          border="1px solid"
          borderColor="gray.300"
          p={2}
        />
      </FormControl>

      {/* Image URL */}
      <FormControl mb={4}>
        <FormLabel fontWeight="bold">Hero Image URL</FormLabel>
        <Flex className="">
        <Image
          src={heroData.image}
          alt="Hero"
          borderRadius="md"
          mb={4}
        />
        </Flex>
        <Input
          value={heroData.image}
          onChange={(e) => setHeroData({ ...heroData, image: e.target.value })}
          border="1px solid"
          borderColor="gray.300"
          p={2}
        />
      </FormControl>

      {/* Countdown Numbers */}
      <Text fontSize="2xl" fontWeight="bold" mb={4}>Countdown Numbers</Text>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {heroData.countdown_numbers.map((item, index) => (
          <GridItem key={item.key} bg="white" borderRadius="md" shadow="md" p={4}>
            <FormControl mb={2}>
              <FormLabel fontWeight="bold">Key</FormLabel>
              <Input
                value={item.key}
                onChange={(e) => {
                  const newCountdown = [...heroData.countdown_numbers];
                  newCountdown[index].key = e.target.value;
                  setHeroData({ ...heroData, countdown_numbers: newCountdown });
                }}
                border="1px solid"
                borderColor="gray.300"
                p={2}
              />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel fontWeight="bold">Value</FormLabel>
              <Input
                type="number"
                value={item.value}
                onChange={(e) => {
                  const newCountdown = [...heroData.countdown_numbers];
                  newCountdown[index].value = e.target.value;
                  setHeroData({ ...heroData, countdown_numbers: newCountdown });
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

export default HeroSection;
