export interface User {
  id: string;
  username: string;
}

export interface Message {
  id: string;
  content: string;
  createdAt: string;
  sender: User;
}

export interface Conversation {
  id: string;
  messages: Message[];
  participants: User[];
}