import { createContext , useContext , useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
const ChatContext = createContext();

const ChatProvider = ({children})=> {

    const navigate = useNavigate()
    const [user , setUser] = useState(null);
    const [chat , setChat] = useState(null);
    const [chats , setChats] = useState(null);
    useEffect(()=> {
        const userInfo =  JSON.parse((localStorage.getItem("userInfo")))
        setUser(userInfo);
        
        if(!userInfo){
            navigate('/'); 
        }
    },[]);

    return (
        <ChatContext.Provider value={{user,setUser,chat,setChat,chats,setChats}}>
            {children}
        </ChatContext.Provider>
    )
}

export const ChatState = () => {
    return useContext(ChatContext);
}


export default ChatProvider;