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
  Flex,
  Grid,
  GridItem,
  Divider,
  Link,
} from "@chakra-ui/react";
import { fetchGetRequest, sendPostRequest } from "../api/api";

const Carousel = () => {
  const [carouselData, setCarouselData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadImageLoading, setUploadImageLoading] = useState(false);
  const [updatingItemId, setUpdatingItemId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const toast = useToast();

  useEffect(() => {
    fetchCarouselData();
  }, []);

  const fetchCarouselData = async () => {
    setLoading(true);
    try {
      const response = await fetchGetRequest(`http://localhost:8091/api/getData?section=carausel`);
      setCarouselData(response.data);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error fetching data",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  const handleImageChange = (event, id, index, type) => {
    const file = event.target.files[0];
    setUpdatingItemId(id);
    handleImageUpload(file, index, type);
  };

  const handleImageUpload = async (file, index, type) => {
    setUploadImageLoading(true);
    const formData = new FormData();
    formData.append("post_img", file);
    try {
      const response = await sendPostRequest(`https://api.isomatsoft.com/api/payment/image-url`, formData);
      if (response.url) {
        toast({
          title: "Image uploaded successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setSelectedImage(response.url);

        const newData = [...carouselData];
        if (type === "logo") newData[index].logo = response.url;
        else if (type === "image") newData[index].image = response.url;

        setCarouselData(newData);
        setUploadImageLoading(false);

        // Call update API to save the new image URL
        await handleUpdate(newData[index]);
      }
    } catch (error) {
      toast({
        title: "Error uploading image",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setUploadImageLoading(false);
    }
  };

  const handleUpdate = async (updatedItem) => {
    try {
      const updatedData = {
        section: "carausel",
        data: updatedItem,
      };
      await sendPostRequest(`http://localhost:8091/api/updateData`, updatedData);
      toast({
        title: "Carousel updated successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error updating carousel",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="100%" mx="auto" py={4} px={4}  borderRadius="lg" >
      <Text fontSize="3xl" fontWeight="bold" mb={2} textAlign="center">
        Carousel Management
      </Text>
      {loading ? (
        <Flex justify="center" align="center" height="300px">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Grid templateColumns="repeat(2, 1fr)" gap={8}>
          {carouselData.map((item, index) => (
            <GridItem
              key={item._id.$oid}
              bg="white"
              borderRadius="md"
              shadow="md"
              p={6}
              border="1px solid"
              borderColor="gray.200"
            >
              {/* Logo Image */}
              <FormControl mb={4} >
                <FormLabel fontWeight="bold">Logo Image</FormLabel>
                <Image
                  src={item.logo}
                  alt="Logo"
                  boxSize={"100%"}
                  mb={4}
                  bg={"gray.100"}
                  p={2}
                />
                <Input
                  type="file"
                  onChange={(e) => handleImageChange(e, item._id.$oid, index, "logo")}
                  border="1px solid"
                  borderColor="gray.300"
                  height={12}
                  p={2}
                />
              </FormControl>

              {/* Description */}
              <FormControl mb={4}>
                <FormLabel fontWeight="bold">Description</FormLabel>
                <Input
                  value={item.description}
                  onChange={(e) => {
                    const newData = [...carouselData];
                    newData[index].description = e.target.value;
                    setCarouselData(newData);
                  }}
                  border="1px solid"
                  borderColor="gray.300"
                  p={2}
                />
              </FormControl>

              {/* Link */}
              <FormControl mb={4}>
                <FormLabel fontWeight="bold">Link</FormLabel>
                <Link href={item.links.link} isExternal color="blue.500" fontWeight="bold">
                  {item.links.name}
                </Link>
              </FormControl>

              {/* Additional Image */}
              <FormControl mb={4}>
                <FormLabel fontWeight="bold">Additional Image</FormLabel>
                {item.image && (
                  <Image
                    src={item.image}
                    alt="Carousel Image"
                    borderRadius="md"
                    mb={4}
                  />
                )}
                <Input
                  type="file"
                  onChange={(e) => handleImageChange(e, item._id.$oid, index, "image")}
                  border="1px solid"
                  height={12}
                  borderColor="gray.300"
                  p={2}
                />
              </FormControl>

              <Divider mb={4} />

              <Button
                onClick={() => handleUpdate(item)}
                colorScheme="teal"
                isFullWidth
                isLoading={uploadImageLoading && updatingItemId === item._id.$oid}
              >
                Update
              </Button>
            </GridItem>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Carousel;
