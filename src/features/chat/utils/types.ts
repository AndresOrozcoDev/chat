export type ChatMessage = {
  id: string;
  text: string;
  createdAt: any;
  senderId: string;
};

export type ChatUser = {
  id: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
};