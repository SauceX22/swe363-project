import apiClient from "@/lib/apiClient";
import type { Contact, Message } from "@/types";

// Get all contacts
export async function getContacts(): Promise<Contact[]> {
  const response = await apiClient.get<Contact[]>("/contacts");
  return response.data;
}

// Get messages for a specific chat
export async function getMessages(chatId: number): Promise<Message[]> {
  const response = await apiClient.get<Message[]>(`/messages/${chatId}`);
  return response.data;
}

// Send a new message
export async function sendMessage(
  chatId: number,
  content: string,
): Promise<Message> {
  const response = await apiClient.post<Message>(`/messages/${chatId}`, {
    content,
  });
  return response.data;
}
