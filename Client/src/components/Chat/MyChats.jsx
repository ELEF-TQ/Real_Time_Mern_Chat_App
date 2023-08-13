import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
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
      const res = await api.get("/chat");
      setChats(res.data);
    } catch (error) {
      toast({title:error.message,description: "Failed to Load the chats",status: "error",duration: 5000,isClosable: true,position: "bottom-left",});
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box>
     
        
    </Box>
  );
};

export default MyChats;