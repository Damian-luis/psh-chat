import React, { useEffect, useState } from 'react';
import styles from './Sidebar.module.css';
import { chats } from '../mocks/chats';
import { Chat } from '@/interfaces';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import { blue } from '@mui/material/colors';
import { getNewUserData } from '@/pages/api';
interface SidebarProps {
  onSelectChat: (chat: Chat) => void;
  selectedChatId: number | null;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectChat, selectedChatId }) => {
  const [open, setOpen] = useState(false);
  const emails = ['username@gmail.com', 'user02@gmail.com'];
  
 
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleListItemClick = (email: string) => {
    console.log(email);
    handleClose();
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
            className={`${styles.chatItem} ${selectedChatId === chat.id ? styles.selectedChat : ''}`}
            onClick={() => onSelectChat(chat)}
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
        <DialogTitle>Elegir nuevo chat</DialogTitle>
        <List sx={{ pt: 0 }}>
          {emails.map((email) => (
            <ListItem disableGutters key={email}>
              <ListItemButton onClick={() => handleListItemClick(email)}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={email} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>
    </div>
  );
};

export default Sidebar;

