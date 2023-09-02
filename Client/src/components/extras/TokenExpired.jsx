import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import React from "react";
import Cookies from "cookies-js";


const TokenExpirationModal = ({ isOpen, onClose }) => {

  const handleLoginClick = () => {
    localStorage.clear();
    Cookies.expire("jwt"); 
    window.location.href='/';
  
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center" fontSize="2xl">Token Expired</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" alignItems="center" justifyContent="center">
            <Text mb="4" textAlign="center">Your session has expired. Please log in again.</Text>
            <Button onClick={handleLoginClick} colorScheme="teal">
              Login
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TokenExpirationModal;
