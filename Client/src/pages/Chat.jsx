import React from 'react'
import { ChatState } from '../context/ChatProvider'


const Chat = () => {
  const {user} = ChatState();
  return (
    <div>
      CHAT here wtf
    </div>
  )
}

export default Chat
