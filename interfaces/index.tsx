
export interface IMessage {
    text: string;
    time: string;
    sender:string
  }
  
  export interface Chat {
    id: number;
    name: string;
    lastMessage: string;
    messages: IMessage[];
    profilePicture:string;
    profession:string
  }
  