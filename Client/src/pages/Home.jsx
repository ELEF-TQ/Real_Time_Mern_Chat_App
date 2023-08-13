import {
    Box,
    Container,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
  } from "@chakra-ui/react";
  import { useEffect } from "react";
  
  import Signin from "../components/Auth/Signin";
  import Signup from "../components/Auth/Signup";
  import '../App.css'
  import { useNavigate } from "react-router-dom";
  function Home() {
    const navigate = useNavigate(); 


    useEffect(()=> {
      const userInfo =  JSON.parse((localStorage.getItem("userInfo")))
      if(userInfo){
        navigate('/Chat'); 
      }
    },[]);


    return (
      <Container maxW="xl" centerContent className="Home__Container">
        <Box
          d="flex"
          justifyContent="center"
          p={3}
          bg="white"
          w="100%"
          m="40px 0 15px 0"
          borderRadius="lg"
          borderWidth="1px"
        >
          <Text fontSize="4xl" fontFamily="Work sans" >
            RealTime CHAT-APP : ELEF-TQ
          </Text>
        </Box>
        <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
          <Tabs isFitted variant="soft-rounded">
            <TabList mb="1em">
              <Tab>Login</Tab>
              <Tab>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Signin />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    );
  }
  
  export default Home;