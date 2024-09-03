export interface SendMessageParams {
  text: string;
  senderTag: string;
}

export interface IUser {
  id: string;
  name: string;
  tag: string;
}

export interface IMessage {
  id: string;
  text: string;
  senderTag: string;
  sender: boolean;
  createdAt: Date;
}

export interface ChatItem {
    id: string;
    name: string;
    lastMessage: string;
    avatar: string;
  }