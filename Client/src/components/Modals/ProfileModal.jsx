import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';

function ProfileModal({ user, children }) {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const absoluteImagePath = user && user.picture
    ? new URL(user.picture, import.meta.url).href
    : null;

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          d={{ base: 'flex' }}
          icon={<ViewIcon />}
          onClick={onOpen}
        />
      )}

      <Modal isCentered isOpen={isOpen} onClose={onClose} size="lg">
        <OverlayOne />
        <ModalContent>
          <ModalHeader fontSize="35px" textAlign="center">
            {user ? user.name : 'unknown'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              direction="column"
              align="center"
              justify="center"
            >
              <Image
                borderRadius="full"
                boxSize="120px"
                src={absoluteImagePath }
                alt={user ? user.name : 'image'}
              />
              <Text>{user ? user.email : 'unknown'}</Text>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProfileModal;
