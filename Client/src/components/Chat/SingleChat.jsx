import { Flex , FormControl, IconButton, Input, Spinner, Text } from "@chakra-ui/react";
import { ChatState } from "../../context/ChatProvider";
import { ArrowBackIcon } from "@chakra-ui/icons";
import UpdateGroupChatModal from "../Modals/UpdateGroupChatModal";
import { getSender ,getFullSender } from "../../config/ChatLogics";
import ProfileModal from "../Modals/ProfileModal";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/toast";
import api from "../../api"; 
import ScrollableChat from './ScrollableChat'
import io from 'socket.io-client'

const ENDPOINT = "http://localhost:5000";
var socket , selectedChatCompare;


const SingleChat = ({ setFetchAgain,fetchAgain}) => {
  const {user , chat , setChat} = ChatState()

  //____Socket.io :
  const [socketConnected , setSocketConnected] = useState(false);
  useEffect(() => {
    if (!socket) {
      socket = io(ENDPOINT);
    }
    
    console.log('User data:', user);
    socket.emit('setup', user);

    socket.on('connected', () => {setSocketConnected(true)});
    return () => {
      socket.disconnect();
    };
  }, []);


  const toast = useToast();
  const [messages , setMessages] = useState([]);
  const [loading , setLoading] = useState(false);
  const [newMessage , setNewMessage] = useState("");

  console.log( "singlechat" + JSON.stringify(messages) );

  const sendMessage = async (e) => {
    if(e.key === "Enter" && newMessage) {
      try {
        setNewMessage(" "); 
        const {data} = await api.post('/message' , {
          content : newMessage ,
          chatId : chat._id
        })
        setMessages([...messages , data]);
      } catch (error) {
        toast({title:error.message,status: "error",duration: 5000,isClosable: true,position: "bottom-left"});
      }
    }
  };

  const fetchMessages = async () => {
    if(!chat) return;
    try {
      setLoading(true);
      const {data} = await api.get(`/message/${chat._id}`)
      setMessages(data);
      setLoading(false);
      console.log('messages' + data)
    } catch (error) {
      toast({title:error.message,status: "error",duration: 5000,isClosable: true,position: "bottom-left"});
    }
  }

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    //typing indicator
  };

  useEffect(()=> {
    fetchMessages();
  },[chat]);

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
            fetchMessages={fetchMessages}
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
          {loading ? (
            <Spinner alignSelf='center' margin='auto' w={20} h={20} size='xl'/>
          ):(
            <Flex flexDir='column'>
              <div className='messages'>
                <ScrollableChat
                 messages={messages}
                
                />

              </div>
            </Flex>
          )}
            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                <Input 
                  variant='filled' 
                  bg='#E0E0E0'
                  placeholder="Enter your message here..."
                  onChange={typingHandler}
                  value={newMessage}
                />
            </FormControl>
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