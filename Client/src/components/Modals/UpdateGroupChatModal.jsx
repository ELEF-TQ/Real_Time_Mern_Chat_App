import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  Input,
  useToast,
  Box,
  IconButton,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import UserBadgeItem from "../User/UserBadgeItem";
import UserListItem from "../User/UserListItem";
import api from '../../api';
const UpdateGroupChatModal = ({ fetchMessages, fetchAgain, setFetchAgain }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);
  const toast = useToast();

  const { chat, setChat, user } = ChatState();

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      setLoading(true);
      const { data } = await api.get(`/user?search=${search}`);
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({title: "Error Occured!",description: error.response.data.message ,status: "error",duration: 5000,isClosable: true,position: "bottom-left"});
      setLoading(false);
    }
  };

  const handleRename = async () => {
    if(!groupChatName) return;
    try {
      setRenameLoading(true);
      const { data } = await api.put('/chat/rename',{chatId : chat._id,chatName : groupChatName})
      setChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      toast({title: "Error Occured!",description: "Failed to Rename the chat",status: "error",duration: 5000,isClosable: true,position: "bottom"});
      setRenameLoading(false);
    }
    setGroupChatName('')
  };

  const handleAddUser = async (userToAdd) => {
    if(chat.users.find((u)=> u._id === userToAdd._id)){
      toast({title: "Error Occured!",description: "User is already there",status: "error",duration: 5000,isClosable: true,position: "bottom"});
      return ;
    }
    if(chat.groupAdmin._id !== user._id){
      toast({title: "Only Admins can Add!",status: "error",duration: 5000,isClosable: true,position: "bottom"});
      return ;
    }
    try {
      setLoading(true);
      const {data} = api.put('/chat/add',{
        chatId : chat._id,
        userId : userToAdd._id,
      })
      setChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
      toast({title: "Good job!",status: "success",duration: 5000,isClosable: true,position: "bottom"});

    } catch (error) {
      toast({title: "Error Occured!",description: error.response.data.message,status: "error",duration: 5000,isClosable: true,position: "bottom"});
    }
  }
 
  const handleRemove = async (userToRemove) => { 
    if(chat.groupAdmin._id !== user._id){
      toast({title: "Only Admins can Remove!",status: "error",duration: 5000,isClosable: true,position: "bottom"});
      return ;
    }
    try {
      setLoading(true);
      const {data} = api.put('/chat/remove',{
        chatId : chat._id,
        userId : userToRemove._id,
      })

      userToRemove._id === user._id ? setChat() : setChat(data)
      setFetchAgain(!fetchAgain);
      setLoading(false);
      toast({title:"Good job!",status: "success",duration: 5000,isClosable: true,position: "bottom"});

    } catch (error) {
      toast({title: "Error Occured!",description: error.response.data.message,status: "error",duration: 5000,isClosable: true,position: "bottom"});
    }

  };

  return (
    <>
      <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center"
          >
            {chat.chatName}
          </ModalHeader>

          <ModalCloseButton />
         
          <ModalBody d="flex" flexDir="column" alignItems="center">
            <Flex w="100%"  flexWrap="wrap" pb={3}>
              {chat.users.map((u)=> {
                <UserBadgeItem
                 key={u._id}
                 user={u}
                 handleFunction={()=>handleRemove(u)}
                 />
               })}
            
            </Flex>
            <FormControl >
              <Flex>
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isLoading={renameloading}
                onClick={handleRename}
              >
                Update
              </Button>
              </Flex>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add User to group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>

            {loading ? (
              <Spinner size="lg" />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleAddUser(user)}
                />
              ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => handleRemove(user)} colorScheme="red">
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;

