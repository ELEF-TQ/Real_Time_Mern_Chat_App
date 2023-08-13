import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import api from "../../api";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Cookies from "cookies-js";
const Signin = () => {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow((prevShow) => !prevShow);
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const navigate = useNavigate(); // Initialize useNavigate

const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await api.post("/signin", formData);
      console.log(response.data);
      localStorage.setItem("userInfo", JSON.stringify(response.data)); 
      Cookies.set("jwt", response.data.token);
      setLoading(false);
      toast({
        title: "Login successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate('/Chat'); 
    } catch (error) {
      setLoading(false);
      toast({title: "Login failed",description: "Invalid email or password.",status: "error",duration: 3000,isClosable: true,});
    }
  };


  const handleGetGuestUserCredentials = async () => {
    setLoading(true);
    try {
      const response = await api.get("/guest");
      setLoading(false);
      const { username, password } = response.data;

      setFormData({ email: username, password: password });

      toast({
        title: "Guest user credentials",
        description: `Username: ${username}, Password: ${password}`,
        status: "info",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      setLoading(false);
      toast({
        title: "Failed to get guest user credentials",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing="10px">
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          value={formData.email}
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            value={formData.password}
            type={show ? "text" : "password"}
            placeholder="Enter password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={toggleShow}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        isLoading={loading}
        onClick={handleLogin}
      >
        Login
      </Button>
      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        onClick={handleGetGuestUserCredentials}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Signin;
