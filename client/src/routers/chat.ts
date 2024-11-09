import type { Contact, Message } from "@/types";
import contactsData from "@/assets/data/sampleContacts.json";
import messagesData from "@/assets/data/sampleMessages.json";

export async function getContacts() {
  return contactsData as Contact[];
}

export async function getMessages(chatId: number) {
  if (messagesData[chatId as unknown as keyof typeof messagesData]) {
    return messagesData[
      chatId as unknown as keyof typeof messagesData
    ] as unknown as Message[];
  }
  return undefined;
}

export async function sendMessage(chatId: number, content: string) {
  const newMessage: Message = {
    id: Date.now(),
    contactId: 0, // Assuming 0 is the current user
    content,
    timestamp: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
  messagesData[chatId as unknown as keyof typeof messagesData] = [
    ...(messagesData[chatId as unknown as keyof typeof messagesData] || []),
    newMessage,
  ];
  return newMessage;
}
