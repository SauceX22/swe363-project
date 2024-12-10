import apiClient from "@/lib/apiClient";
import type { FoundItemPost } from "@/types";

// Get all found items
export async function getFoundItems(): Promise<{ items: FoundItemPost[] }> {
  const response = await apiClient.get<FoundItemPost[]>("/found");
  return { items: response.data };
}

// Get details of a specific found item
export async function getFoundItemDetails(itemId: string): Promise<{
  item: FoundItemPost | undefined;
  similarItems: FoundItemPost[];
}> {
  const response = await apiClient.get<FoundItemPost[]>(`/found/${itemId}`);
  const itemDetails = response.data.find((item) => item.id === itemId);
  return { item: itemDetails, similarItems: response.data };
}

// Create a new found item
export async function createFoundItemPost(
  item: Omit<FoundItemPost, "id" | "createdAt" | "dateFound" | "postedBy">,
): Promise<FoundItemPost> {
  const response = await apiClient.post<FoundItemPost>("/found", item);
  return response.data;
}

// Update a found item
export async function updateFoundItem(item: {
  id: string;
  updates: object;
}): Promise<FoundItemPost> {
  const response = await apiClient.put<FoundItemPost>(`/found/${item.id}`, {
    ...item.updates,
  });
  return response.data;
}

// Delete a found item
export async function deleteFoundItem(itemId: string): Promise<FoundItemPost> {
  const response = await apiClient.delete<FoundItemPost>(`/found/${itemId}`);
  return response.data;
}
