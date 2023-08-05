import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { useState } from "react";
import api from '../../api';

const Signup = () => {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow((prevShow) => !prevShow);
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [pic, setPic] = useState(null); // New state to store the selected image file
  const [picLoading, setPicLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handlePicUpload = (e) => {
    const file = e.target.files[0];
    setPic(file);
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

      // Create a FormData object to send the file along with the other form data
      const formDataToSend = new FormData();
      formDataToSend.append("name", name);
      formDataToSend.append("email", email);
      formDataToSend.append("password", password);
      formDataToSend.append("pic", pic); // Append the selected image file to the FormData

      await api.post('/signup', formDataToSend);

      setPicLoading(false);

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setPic(null); // Reset the selected image file after successful signup

      toast({ title: "Signup successful", status: "success", duration: 3000, isClosable: true });
    } catch (error) {
      setPicLoading(false);
      toast({ title: "Signup failed", description: "An error occurred during signup.", status: "error", duration: 3000, isClosable: true });
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
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
