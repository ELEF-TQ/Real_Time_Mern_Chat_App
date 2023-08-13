import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";
import { getSender, getSenderFull } from "../../config/ChatLogics";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from "../Modals/ProfileModal";
import ScrollableChat from "./ScrollableChat";
import animationData from "../../animation/typing.json";

import io from "socket.io-client";
import UpdateGroupChatModal from "../Modals/UpdateGroupChatModal";
import { ChatState } from "../../context/ChatProvider";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  


  return (
    <>
     
           
   
    </>
  );
};

export default SingleChat;