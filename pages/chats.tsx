import React, { useEffect, useState } from 'react';
import styles from './Chats.module.css';
import Sidebar from '@/componentes/Sidebar';
import { Chat } from '@/interfaces';
import { MessageList, Message } from '@chatscope/chat-ui-kit-react';
import { IMessage } from '@/interfaces';
import { getNewUserData } from '@/pages/api';
import { chats as mockChats } from '../mocks/chats';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

const Chats = () => {
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messageText, setMessageText] = useState<string>('');
  const [newUser, setNewUser] = useState<Chat | null>(null);

  useEffect(() => {
    const fetchNewUser = async () => {
      const userData = await getNewUserData();
      console.log(userData.results[0])
      setNewUser({
        id: userData.id,
        name: `${userData.results[0].name.first} ${userData.results[0].name.last}`,
        profilePicture: userData.results[0].picture.medium,
        lastMessage: "",
        messages: [],
        profession:"Unemployed"
      });
    };
    fetchNewUser();
  }, []);

  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat);
  };

  const handleSendMessage = () => {
    if (selectedChat && messageText.trim() !== '') {
      const newMessage = {
        text: messageText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sender: 'user',
      };
  
      setSelectedChat(prevChat => {
        if (prevChat) {
          const updatedChat = {
            ...prevChat,
            messages: [...prevChat.messages, newMessage],
            lastMessage: newMessage.text,
          };
  
          setChats(prevChats =>
            prevChats.map(chat => (chat.id === prevChat.id ? updatedChat : chat))
          );
  
          return updatedChat;
        }
        return null;
      });
  
      setMessageText('');
    }
  };
  

  const handleAddChat = (chat: Chat) => {
    setChats(prevChats => [...prevChats, chat]);
    setSelectedChat(chat);
  };

  return (
    <div className={styles.container}>
      <Sidebar 
        chats={chats}
        newUser={newUser}
        onSelectChat={handleSelectChat} 
        selectedChatId={selectedChat ? selectedChat.id : null} 
        onAddChat={handleAddChat}
      />
      <div className={styles.chatSection}>
        <div className={styles.chatSectionHeader}>
          {selectedChat ? (
            <>
              <div>
                <img className={styles.chatSectionHeaderFoto} src={selectedChat.profilePicture} alt="Profile" />
              </div>
              <div className={styles.chatSectionHeaderName}>
                {selectedChat.name} <br/>
                <span className={styles.chatSectionHeaderProfession}>{selectedChat.profession}</span>
                </div>
            </>
          ) : (
            <div className={styles.noChatSelected}>Seleccione algún chat para iniciar</div>
          )}
        </div>

        {selectedChat && (
          <>
            <div className={styles.messageList}>
              {selectedChat.messages.map((msg: IMessage, index: number) => (
                <Message
                  key={index}
                  model={{
                    message: msg.text,
                    sender: msg.sender === 'user' ? 'User' : 'Chat',
                    sentTime: msg.time,
                    direction: msg.sender === 'user' ? 'outgoing' : 'incoming',
                    position: 'single',
                  }}
                  
                />
              ))}
            </div>
            <div className={styles.messageInputContainer}>
              <input
                className={styles.messageInput}
                type="text"
                placeholder="Escribe un mensaje..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
              <button className={styles.sendMessageButton} onClick={handleSendMessage}>
                Enviar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chats;


