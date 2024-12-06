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
import { fetchGetRequest, sendPostRequest, sendDeleteRequest } from "../api/api";

const Carousel = () => {
  const [carouselData, setCarouselData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadImageLoading, setUploadImageLoading] = useState(false);
  const [updatingItemId, setUpdatingItemId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [newItem, setNewItem] = useState({
    description: "",
    logo: "",
    image: "",
    links: { link: "", name: "" },
  });
  const [addingNew, setAddingNew] = useState(false);
  const toast = useToast();

  useEffect(() => {
    fetchCarouselData();
  }, []);

  const fetchCarouselData = async () => {
    setLoading(true);
    try {
      const response = await fetchGetRequest(`${import.meta.env.VITE_API_URL}/api/getData?section=carausel`);
      setCarouselData(response.data);
    } catch (error) {
      toast({
        title: "Error fetching data",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  const handleImageChange = (event, index, type, isNew = false) => {
    const file = event.target.files[0];
    setUpdatingItemId(index);
    handleImageUpload(file, index, type, isNew);
  };

  const handleImageUpload = async (file, index, type, isNew) => {
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
        const updatedData = isNew ? { ...newItem } : [...carouselData];
        if (type === "logo") {
          if (isNew) updatedData.logo = response.url;
          else updatedData[index].logo = response.url;
        } else if (type === "image") {
          if (isNew) updatedData.image = response.url;
          else updatedData[index].image = response.url;
        }
        isNew ? setNewItem(updatedData) : setCarouselData(updatedData);
      }
    } catch (error) {
      toast({
        title: "Error uploading image",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    setUploadImageLoading(false);
  };

  const handleUpdate = async (item, isNew = false, action="") => {
    setUpdateLoading(true);
    setUpdatingItemId(item._id || "new");
    try {
      const updatedData = {
        section: "carausel",
        data: item,
        action
      };
      await sendPostRequest(`${import.meta.env.VITE_API_URL}/api/updateData`, updatedData);
      toast({
        title: "Carousel updated successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      isNew ? setAddingNew(false) : fetchCarouselData();
      setUpdateLoading(false);
      fetchCarouselData()
      if(action=="delete"){
        return true
      }
    } catch (error) {
      setUpdateLoading(false);
      toast({
        title: "Error updating carousel",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async (data) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const status=await handleUpdate(data, false, "delete")
      if(status){
      const filteredData=carouselData.filter((item)=>item._id !== data.id)
      setCarouselData(filteredData)
      }
  }
}

  return (
    <Box maxW="100%" mx="auto" py={4} px={4} borderRadius="lg">
      <Text fontSize="3xl" fontWeight="bold" mb={2} textAlign="center">
        Carousel Management
      </Text>
      <Button colorScheme="blue" mb={4} onClick={() => setAddingNew(true)}>
        Add New Carousel Item
      </Button>
      {addingNew && (
        <GridItem bg="white" borderRadius="md" shadow="md" p={6} border="1px solid" borderColor="gray.200">
          {/* Form for adding new item */}
          <FormControl mb={4}>
            <FormLabel fontWeight="bold">Logo Image</FormLabel>
            <Input
              type="file"
              onChange={(e) => handleImageChange(e, "new", "logo", true)}
              border="1px solid"
              borderColor="gray.300"
              height={12}
              p={2}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel fontWeight="bold">Description</FormLabel>
            <Input
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              border="1px solid"
              borderColor="gray.300"
              p={2}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel fontWeight="bold">Priority</FormLabel>
            <Input
              value={newItem.priority}
              onChange={(e) => setNewItem({ ...newItem, priority: e.target.value })}
              border="1px solid"
              type="number"
              borderColor="gray.300"
              p={2}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel fontWeight="bold">Link</FormLabel>
            <Input
              placeholder="Link URL"
              value={newItem.links.link}
              onChange={(e) => setNewItem({ ...newItem, links: { ...newItem.links, link: e.target.value } })}
              mb={2}
              border="1px solid"
              borderColor="gray.300"
              p={2}
            />
            <Input
              placeholder="Link Name"
              value={newItem.links.name}
              onChange={(e) => setNewItem({ ...newItem, links: { ...newItem.links, name: e.target.value } })}
              border="1px solid"
              borderColor="gray.300"
              p={2}
            />

          </FormControl>
          <FormControl mb={4}>
            <FormLabel fontWeight="bold">Additional Image</FormLabel>
            <Input
              type="file"
              onChange={(e) => handleImageChange(e, "new", "image", true)}
              border="1px solid"
              borderColor="gray.300"
              height={12}
              p={2}
            />
          </FormControl>
          <Button
            onClick={() => handleUpdate(newItem, true)}
            colorScheme="teal"
            isFullWidth
            disabled={uploadImageLoading}
            isLoading={updateLoading&&updatingItemId === "new"}
          >
            Add Item
          </Button>
        </GridItem>
      )}
      {loading ? (
        <Flex justify="center" align="center" height="300px">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Grid templateColumns="repeat(3, 1fr)" gap={8}>
          {carouselData.map((item, index) => (
            <GridItem key={item._id} bg="white" borderRadius="md" shadow="md" p={6} border="1px solid" borderColor="gray.200">
               <Button
                onClick={() => handleDelete(item)}
                colorScheme="red"
                isFullWidth
                mt={2}
              
              >
              Delete
              </Button>
              <>
              <FormControl mb={4}>
                <FormLabel fontWeight="bold">Logo Image</FormLabel>
                <Image src={item.logo} alt="Logo" boxSize="100%" mb={4} bg="gray.100" p={2} />
                <Input
                  type="file"
                  onChange={(e) => handleImageChange(e, index, "logo")}
                  border="1px solid"
                  borderColor="gray.300"
                  height={12}
                  p={2}
                />
              </FormControl>
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
              <FormControl mb={4}>
                <FormLabel fontWeight="bold">Priority</FormLabel>
                <Input
                  value={item?.priority}
                  onChange={(e) => {
                    const newData = [...carouselData];
                    newData[index].priority = e.target.value;
                    setCarouselData(newData);
                  }}
                  border="1px solid"
                  type="number"
                  borderColor="gray.300"
                  p={2}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel fontWeight="bold">Link</FormLabel>
                <Link href={item.links.link} isExternal color="blue.500" fontWeight="bold">
                  {item.links.name}
                </Link>
              </FormControl>
              <FormControl mb={4}>
                <FormLabel fontWeight="bold">Additional Image</FormLabel>
                {item.image && (
                  <Image src={item.image} alt="Carousel Image" borderRadius="md" mb={4} />
                )}
                <Input
                  type="file"
                  onChange={(e) => handleImageChange(e, index, "image")}
                  border="1px solid"
                  borderColor="gray.300"
                  height={12}
                  p={2}
                />
              </FormControl>
              <Divider mb={4} />
              <Button
                onClick={() => handleUpdate(item)}
                colorScheme="teal"
                isFullWidth
                isLoading={uploadImageLoading && updatingItemId === item._id}
              >
                Update Item
              </Button>
            </>
            </GridItem>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Carousel;
