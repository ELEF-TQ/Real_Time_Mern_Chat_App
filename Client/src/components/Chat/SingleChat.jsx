import { Flex , IconButton, Text } from "@chakra-ui/react";
import { ChatState } from "../../context/ChatProvider";
import { ArrowBackIcon } from "@chakra-ui/icons";
import UpdateGroupChatModal from "../Modals/UpdateGroupChatModal";
import { getSender ,getFullSender } from "../../config/ChatLogics";
import ProfileModal from "../Modals/ProfileModal";
const SingleChat = ({ setFetchAgain,fetchAgain}) => {
  
const {user , chat , setChat} = ChatState()

  return (
    <>
     {chat? (
       <>
        <Text
          fontSize={{base :'28px' , md :'30px'}}
          pb={3}
          px={2}
          w='100%'
          fontFamily='Work sans'
          d='flex'
          justifyContent={{base : 'space-between' }}
          alignItems='center'
        >
        <IconButton 
         d={{base : 'flex' , md :'none'}}
         icon={< ArrowBackIcon/>}
         onClick={()=> setChat('')}
        />
        {!chat.isGroupChat ? (
          <>
            {getSender(user , chat.users)}
            <ProfileModal user={getFullSender(user,chat.users)} >

            </ProfileModal>
          </>
        ) : (
          <>
          {chat.chatName.toUpperCase()}
          <UpdateGroupChatModal
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
          />
          </>
        )}
        </Text>
        <Flex
         flexDir='column'
         justifyContent='flex-end'
         borderRadius='lg'
         overflowY='hidden'
         p={3}
         bg='#E8E8E8'
         w='100%'
         h='90%'
        >


        </Flex>
       </>
     ) : (
      <Flex alignItems='center' justifyContent='center' h='100%'>
        <Text fontSize='3xl' pb={3} fontFamily='work sans'>
          Click on a user to start chatting
        </Text>
      </Flex>
     )}
    </>
  );
};

export default SingleChat;