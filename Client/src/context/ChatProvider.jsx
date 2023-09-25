import { createContext , useContext , useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "cookies-js";
const ChatContext = createContext();


const ChatProvider = ({children})=> {

    const navigate = useNavigate()
    const [user , setUser] = useState(null);
    const [chat , setChat] = useState(null);
    const [chats , setChats] = useState([]);
    const [notification , setNotification] = useState([]);

    useEffect(()=> {
        const userInfo =  JSON.parse((localStorage.getItem("userInfo")))
        const jwt = Cookies.get("jwt");
        setUser(userInfo);
        
        if(!userInfo || !jwt){
            navigate('/'); 
        }
    },[]);

    return (
        <ChatContext.Provider value={{user,setUser,chat,setChat,chats,setChats,notification,setNotification}}>
            {children}
        </ChatContext.Provider>
    )
}

export const ChatState = () => {
    return useContext(ChatContext);
}


export default ChatProvider;