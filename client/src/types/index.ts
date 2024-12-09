export interface FoundItemPost {
  id: string; // Unique identifier
  name: string; // Name of the found item
  description: string; // Detailed description of the item
  datePosted: Date;
  image: string | null;
  tag: string;
  location: string;
  reportedBy: string; // ID of the user who reported the item
}

export interface MarketItemPost {
  id: string; // Unique identifier
  name: string; // Name of the market item
  description: string; // Detailed description of the item
  datePosted: Date;
  image: string | null;
  tag: string;
  price: number; // Price of the item
  seller: string; // ID of the user selling the item
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
