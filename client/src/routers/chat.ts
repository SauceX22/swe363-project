import type { Contact, Message } from "@/types";

// routers-based api, this is a layer betwen client and server to centralize data fetching and manipulation method

// get the list of contacts from the server
export async function getContacts() {
  // TODO do fetching here
  const response = await fetch("/assets/data/sampleContacts.json");
  if (!response.ok) {
    throw new Error("Failed to fetch contacts");
  }
  return (await response.json()) as Contact[];
}

// Fetch the messages of a chat from the static JSON file
export async function getMessages(
  chatId: number,
): Promise<Message[] | undefined> {
  // TODO do fetching here
  const response = await fetch("/assets/data/sampleMessages.json");
  if (!response.ok) {
    throw new Error("Failed to fetch messages");
  }

  const messagesData = (await response.json()) as Record<number, Message[]>;
  return messagesData[chatId as keyof typeof messagesData];
}

// Send a message to the server (still simulates a local update for now)
export async function sendMessage(
  chatId: number,
  content: string,
): Promise<Message> {
  // TODO do post here
  // Simulate creating a new message
  const newMessage: Message = {
    id: Date.now(),
    contactId: 0, // Assuming 0 is the current user
    content,
    timestamp: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  // Simulate appending the new message to the chat
  const messages = await getMessages(chatId);
  if (messages) {
    messages.push(newMessage);
  }
  return newMessage;
}
