import { Flex } from "@chakra-ui/layout";
import { useState } from "react";
import Chatbox from "../components/Chat/Chatbox";
import MyChats from "../components/Chat/MyChats";
import SideDrawer from "../components/extras/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import '../App.css';
import api, { registerTokenExpirationCallback } from "../api";
import TokenExpirationModal from "../components/extras/TokenExpired";


const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  const [showTokenExpirationModal, setShowTokenExpirationModal] = useState(false);
  registerTokenExpirationCallback(() => {
    setShowTokenExpirationModal(true);
  });


  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}

      <Flex justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Flex>
      <TokenExpirationModal isOpen={showTokenExpirationModal} onClose={() => setShowTokenExpirationModal(false)} />
    </div>
  );
};

export default Chatpage;