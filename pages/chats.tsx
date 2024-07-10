import React, { useState } from 'react';
import styles from './Chats.module.css';
import Sidebar from '@/componentes/Sidebar';
import { Chat } from '@/interfaces';
import { MessageList, Message } from '@chatscope/chat-ui-kit-react';
import { IMessage } from '@/interfaces';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

const Chats = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messageText, setMessageText] = useState<string>('');

  const handleSelectChat = (chat: any) => {
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
          return {
            ...prevChat,
            messages: [...prevChat.messages, newMessage],
          };
        }
        return null;
      });
      setMessageText('');
    }
  };



  const handleAddChat = (chat: Chat) => {
    // Handle new chat addition if needed
  };

  return (
    <div className={styles.container}>
      <Sidebar onSelectChat={handleSelectChat} selectedChatId={selectedChat ? selectedChat.id : null}/>
      <div className={styles.chatSection}>
        <div className={styles.chatSectionHeader}>
          {selectedChat ? (
            <>
              <div>
                <img className={styles.chatSectionHeaderFoto} src={selectedChat.profilePicture} alt="Profile" />
              </div>
              <div className={styles.chatSectionHeaderName}>{selectedChat.name}</div>
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
