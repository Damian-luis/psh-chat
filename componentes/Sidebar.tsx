import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import { Chat } from '@/interfaces';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';

interface SidebarProps {
  chats: Chat[];
  newUser: Chat | null;
  onSelectChat: (chat: Chat) => void;
  selectedChatId: number | null;
  onAddChat: (chat: Chat) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ chats, newUser, onSelectChat, selectedChatId, onAddChat }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleAddNewChat = () => {
    if (newUser) {
      onAddChat(newUser);
      onSelectChat(newUser);
      setOpen(false); 
    }
  };

  const handleChatClick = (chat: Chat) => {
    onSelectChat(chat);
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerUpSide}>
        <div><img className={styles.logo} src="/logopsh.svg" alt="Descripción del SVG" /></div>
        <div className={styles.logoText}>React Chat</div>
      </div>

      <div className={styles.containerMiddleSide}>
        {chats.map(chat => (
          <div
            key={chat.id}
            style={selectedChatId === chat.id ? { backgroundColor: 'red' } : {}}
            className={`${styles.chatItem} ${selectedChatId === chat.id ? styles.selectedChat : styles.unselectedChat}`}
            onClick={() => handleChatClick(chat)}
          >
            <div className={styles.divFoto}>
              <img className={styles.foto} src={chat.profilePicture} alt="Foto de usuario" />
            </div>
            <div className={styles.divTexto}>
              <div className={styles.divTextoNames}>{chat.name}</div>
              <div>{chat.lastMessage}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.addNew}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          style={{
            backgroundColor: "transparent",
            width: "100%",
            padding: "10px"
          }}
          onClick={handleOpen}
        >
          Add New
        </Button>
      </div>

      <Dialog onClose={handleClose} open={open}>
        <List sx={{ pt: 0 }}>
          {newUser && (
            <ListItem disableGutters>
              <ListItemButton onClick={handleAddNewChat}>
                <ListItemAvatar>
                  <Avatar src={newUser.profilePicture}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={newUser.name} />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Dialog>
    </div>
  );
};

export default Sidebar;




