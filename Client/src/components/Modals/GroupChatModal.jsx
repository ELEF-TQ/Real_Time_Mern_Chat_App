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
  } from "@chakra-ui/react";
  import axios from "axios";
  import { useState } from "react";
  import { ChatState } from "../../Context/ChatProvider";
  import UserBadgeItem from "../User/UserBadgeItem";
  import UserListItem from "../User/UserListItem";
  import api from "../../api";
  const GroupChatModal = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
  
    const { user, chats, setChats } = ChatState();
  
    const handleSearch = async (query) => {
      setSearch(query);
      if(!query) return;
      try {
        setLoading(true);
        const {data} =  await api.get(`/user?search=${search}`);
        setLoading(false);
        setSearchResult(data);
      } catch (error) {
        toast({title:error.message,description: "Failed to Load the search",status: "error",duration: 5000,isClosable: true,position: "bottom-left",});
      }
    }

    const handleGroup = (userToAdd) => {
      if(selectedUsers.includes(userToAdd)) {
        toast({title:'User Already Added',status: "warning",duration: 5000,isClosable: true,position: "top",});
        return;
      }
      setSelectedUsers([...selectedUsers,userToAdd])
    }

    const handleDelete = (userToDelete) => {
      setSelectedUsers([...selectedUsers.filter((sel)=> sel._id !== userToDelete._id)])
    }

    const handleSubmit = async () => {
      console.log('submit1')
      if(!groupChatName || !selectedUsers) {
        toast({title:'All filed are required',status: "warning",duration: 5000,isClosable: true,position: "top",});
        return;
      }
      try {

        const {data} = await api.post('/chat/group' , {
          name : groupChatName,
          users : JSON.stringify(selectedUsers.map((u)=>u._id))
        })
        setChats([data , ...chats]);
        toast({title:'New Group Chat Created !',status: "success",duration: 5000,isClosable: true,position: "top",});
        onClose();
      } catch (error) {
        toast({title:'Failed',description:error.response.data ,status: "error",duration: 5000,isClosable: true,position: "top"});

      }
    }


    return (
      <>
        <span onClick={onOpen}>{children}</span>
  
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader
              fontSize="35px"
              fontFamily="Work sans"
              d="flex"
              justifyContent="center"
            >
              Create Group Chat
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody d="flex" flexDir="column" alignItems="center">
              <FormControl>
                <Input
                  placeholder="Chat Name"
                  mb={3}
                  onChange={(e) => setGroupChatName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <Input
                  placeholder="Add Users eg: John, Piyush, Jane"
                  mb={1}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </FormControl>
              <Box w="100%" d="flex" flexWrap="wrap">
                {selectedUsers.map((u) => (
                  <UserBadgeItem
                    key={u._id}
                    user={u}
                    handleFunction={() => handleDelete(u)}
                  />
                ))}
              </Box>
              {loading ? (
                // <ChatLoading />
                <div>Loading...</div>
              ) : (
                searchResult?.slice(0, 4).map((user) => (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={() => handleGroup(user)}
                    />
                  ))
              )}
            </ModalBody>
            <ModalFooter>
              <Button onClick={handleSubmit} colorScheme="blue">
                Create Chat
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default GroupChatModal;