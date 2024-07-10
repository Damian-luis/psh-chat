import React from 'react';




const ChatList = ({ chats, onSelectChat }) => {
  return (
    <ChatListWrapper>
      {chats.map((chat, index) => (
        <ChatItem key={index} onClick={() => onSelectChat(index)}>
          {chat.name}
        </ChatItem>
      ))}
    </ChatListWrapper>
  );
};

export default ChatList;
