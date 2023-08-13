import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text ,Flex } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { useEffect, useState } from "react";
import { getSender } from "../../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "../Modals/GroupChatModal";
import { Button } from "@chakra-ui/react";
import { ChatState } from "../../context/ChatProvider";
import api from "../../api";
const MyChats = ({ fetchAgain }) => {

  const [loggedUser, setLoggedUser] = useState();
  const { chat, setChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    try {
      const {data} = await api.get("/chat");
      setChats(data);
      console.log(data);
    } catch (error) {
      toast({title:error.message,description: "Failed to Load the chats",status: "error",duration: 5000,isClosable: true,position: "bottom-left",});
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      d={{ base: chat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
      h='100%'
      overflow='hidden'
    >
      <Flex
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        justifyContent='space-between'
        w="100%"
      >
        My Chats
        <GroupChatModal>
          <Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Flex>
      <Flex 
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        justifyContent='space-between'
        w='100%'
        bg='#F8F8F8'
        overflow='hidden'
      >
        {chats ? (
          <Stack overflowY='scroll'>
          {chats.map((c) => (
            <Box
            onClick={() => setChat(c)}
            cursor="pointer"
            bg={chat === c ? "#38B2AC" : "#E8E8E8"}
            color={chat === c ? "white" : "black"}
            px={3}
            py={2}
            borderRadius="lg"
            key={c._id}
            >
              <Text fontSize='20px'>
                {!c.isGroupChat
                  ? getSender(loggedUser, c.users)
                  : c.chatName}
              </Text>
            </Box>
          ))}
        </Stack>
        
        
        
        ):(<ChatLoading />)}


      </Flex>
        
    </Box>
  );
};

export default MyChats;