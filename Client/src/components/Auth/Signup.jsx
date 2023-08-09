import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import api from "../../api";
const Signup = () => {
  const [show, setShow] = useState(false);
  const [imageUploadComplete, setImageUploadComplete] = useState(false);
  const toggleShow = () => setShow((prevShow) => !prevShow);
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [pic, setPic] = useState("");
  const [picLoading, setPicLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handlePicUpload = async (e) => {
    setPicLoading(true);
    const pics = e.target.files[0];
    if (!pics) {
      toast({
        title: "Please select an image",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      setPicLoading(false);
      return;
    }

    if (pics.type !== "image/jpeg" && pics.type !== "image/png") {
      toast({
        title: "Please select a valid image (JPEG or PNG)",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      setPicLoading(false);
      return;
    }

    try {
      const reader = new FileReader();
      reader.readAsDataURL(pics);
      reader.onloadend = () => {
        const base64data = reader.result.split(",")[1];
        setPic(base64data);
        setPicLoading(false);
        setImageUploadComplete(true); // Set the flag to indicate image upload is complete
      };
    } catch (error) {
      setPicLoading(false);
      toast({
        title: "Image upload failed",
        description: "An error occurred during image upload.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const handleSignup = async () => {
    try {
      setPicLoading(true);
      const { name, email, password, confirmPassword } = formData;

      if (password !== confirmPassword) {
        toast({
          title: "Passwords do not match",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setPicLoading(false);
        return;
      }


      await api.post("/signup", {name ,email ,password,pic});
      setPicLoading(false);

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setPic("");
      setImageUploadComplete(false); // Reset the flag after signup
      toast({
        title: "Signup successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      setPicLoading(false);
      console.log(error);
      toast({
        title: "Signup failed",
        description: "An error occurred during signup.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={toggleShow}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={toggleShow}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={handlePicUpload}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        isLoading={picLoading}
        onClick={handleSignup}
        disabled={!imageUploadComplete} // Disable the button if image upload is not complete
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
