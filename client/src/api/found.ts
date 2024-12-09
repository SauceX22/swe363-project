import apiClient from "@/lib/apiClient";
import type { FoundItem } from "@/types";

// Get all found items
export async function getFoundItems(): Promise<{ items: FoundItem[] }> {
  const response = await apiClient.get<FoundItem[]>("/found");
  return { items: response.data };
}

// Get details of a specific found item
export async function getFoundItemDetails(itemId: string): Promise<{
  item: FoundItem | undefined;
  similarItems: FoundItem[];
}> {
  const response = await apiClient.get<FoundItem[]>(`/found`);
  const itemDetails = response.data.find((item) => item.id === itemId);
  return { item: itemDetails, similarItems: response.data };
}

// Create a new found item
export async function createFoundItem(
  item: Omit<FoundItem, "id">,
): Promise<FoundItem> {
  const response = await apiClient.post<FoundItem>("/found", item);
  return response.data;
}

// Update a found item
export async function updateFoundItem(item: {
  id: string;
  updates: object;
}): Promise<FoundItem> {
  const response = await apiClient.put<FoundItem>(`/found/${item.id}`, {
    ...item.updates,
  });
  return response.data;
}

// Delete a found item
export async function deleteFoundItem(itemId: string): Promise<FoundItem> {
  const response = await apiClient.delete<FoundItem>(`/found/${itemId}`);
  return response.data;
}
