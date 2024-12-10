export interface FoundItemPost {
  id: string; // Unique identifier
  createdAt: Date;
  name: string;
  description: string;
  tag: string;
  dateFound: Date;
  location: string;
  postedBy: string;
  image?: string;
}

export interface MarketItemPost {
  id: string; // Unique identifier
  name: string;
  description: string;
  tag: string;
  price: number;
  postedBy: string;
  createdAt: Date;
  image?: string;
}

export interface User {
  id: string; // Unique identifier
  name: string; // Name of the user
  email: string; // Email address of the user
  avatarUrl?: string; // Optional avatar URL of the user
}

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

export type CookieAttributes = {
  expires?: string;
  path?: string;
  domain?: string;
};
