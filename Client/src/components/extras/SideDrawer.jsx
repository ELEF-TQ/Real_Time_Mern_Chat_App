import React, { useState } from "react";
import {
  Button,
  Box,
  Text,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Tooltip,
  useDisclosure,
  Avatar,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
  Toast,
  position,
  Spinner,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import ProfileModal from "../Modals/ProfileModal";
import { ChatState } from "../../context/ChatProvider";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import api from "../../api";
import ChatLoading from '../Chat/ChatLoading'
import UserListItem from '../User/UserListItem'
function SideDrawer() {
  const navigate = useNavigate();
  const toast = useToast();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user } = ChatState();
  const { chat , setChat , chats , setChats } = ChatState();

  const absoluteImagePath = user && user.picture
    ? new URL(user.picture, import.meta.url).href
    : null;

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  }
  const SearchHandler = async () => {
    if(!search){
      toast({title: 'Search is empty',status: 'warning',duration: 3000,isClosable: true,position:'top-left'})
      return ;
    }
    try {
      setLoading(true);
      const res = await api.get(`/user?search=${search}` )
      setSearchResult(res.data)
      setLoading(false)
    }catch(error) {
      toast({title: error.message ,status: 'error',duration: 5000,isClosable: true,position:'top-left'})
    }
  }
  const AccessChatHandler = async (userId)=> {
    try {
      setLoadingChat(true)
      const {data }= await api.post('/chat' , {userId})

      if(!chats.find((c)=>c._id === data._id)) setChats([data,...chats])
      setChat(data)
      setLoadingChat(false)
      console.log(chat)
      // onClose();
    } catch (error) {
      toast({title: error.message,status: "error",duration: 3000,isClosable: true,});
    }
  }


  return (
    <>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text d={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work sans">
          ELEF-TQ CHAT
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user ? user.name : ""}
                src={absoluteImagePath}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem onClick={ProfileModal.onOpen}>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Flex>

      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>Search Users</DrawerHeader>
          <DrawerBody>
            <Flex pb={2}>
              <Input
                placeholder='name or email'
                mr={2}
                value={search}
                onChange={(e)=> setSearch(e.target.value)}
              
              >
              </Input>
              <Button onClick={SearchHandler}>GO</Button>
             
            </Flex>
            {loading ? (
            <ChatLoading />
              ) : (
                searchResult?.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    AccessChatHandler={() => AccessChatHandler(user._id)}
                  />
                ))
              )}
            {loadingChat && <Spinner ml='auto'  />}

          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
