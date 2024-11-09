export type MarketItem = {
  id: string;
  name: string;
  description: string;
  datePosted: Date;
  image: string | null;
  price: number;
  tag: string;
};

export type FoundItem = {
  id: string;
  name: string;
  description: string;
  datePosted: Date;
  image: string | null;
  tag: string;
};

export type Contact = {
  id: number;
  name: string;
  avatar: string;
  phone: string;
  lastMessageContent: string;
  lastMessageTime: string;
};

export type Message = {
  id: number;
  contactId: number;
  content: string;
  timestamp: string;
};
