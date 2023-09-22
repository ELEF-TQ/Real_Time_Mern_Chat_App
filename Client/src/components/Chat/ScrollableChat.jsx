import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import { ChatState } from '../../context/ChatProvider';
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../../config/ChatLogics';
import { Avatar, Tooltip } from '@chakra-ui/react';

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  const messagesArray = Array.isArray(messages) ? messages : [];

  return (
    <ScrollableFeed>
      {messagesArray.length === 0 ? (
        <div>No messages found for this chat.</div>
      ) : (
        messagesArray.map((m, i) => (
          <div key={m._id} style={{ display: "flex" }}>
            {(isSameSender(messagesArray, m, i, user._id) || isLastMessage(messagesArray, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt='7px'
                  mr={1}
                  size='sm'
                  cursor='pointer'
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}`,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                marginLeft: isSameSenderMargin(messagesArray, m, i, user._id),
                marginTop: isSameUser(messagesArray, m, i, user._id),
              }}
            >
              {m.content}
            </span>
          </div>
        ))
      )}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
