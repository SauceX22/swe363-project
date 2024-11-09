import type { Contact, Message } from "@/types";

// TEMPORARY SAMPLE DATA
import contactsData from "@/assets/data/sampleContacts.json";
import messagesData from "@/assets/data/sampleMessages.json";

// routers-based api, this is a layer betwen client and server to centralize data fetching and manipulation method

// get the list of contacts from the server
export async function getContacts() {
  // TODO do fetching here
  return contactsData as Contact[];
}

// get the messages of a chat from the server
export async function getMessages(chatId: number) {
  // TODO do fetching here
  if (messagesData[chatId as unknown as keyof typeof messagesData]) {
    return messagesData[
      chatId as unknown as keyof typeof messagesData
    ] as unknown as Message[];
  }
  return undefined;
}

// send a message to the server
export async function sendMessage(chatId: number, content: string) {
  // TODO do post here
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
