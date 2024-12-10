import apiClient from "@/lib/apiClient";
import type { MarketItemPost } from "@/types";

// Get all market items
export async function getMarketItems(): Promise<{ items: MarketItemPost[] }> {
  const response = await apiClient.get<MarketItemPost[]>("/market");
  console.log(response.data);
  return { items: response.data };
}

// Get details of a specific market item
export async function getMarketItemDetails(itemId: string): Promise<{
  item: MarketItemPost | undefined;
  similarItems: MarketItemPost[];
}> {
  const response = await apiClient.get<MarketItemPost[]>(`/market/${itemId}`);
  const itemDetails = response.data.find((item) => item.id === itemId);
  return { item: itemDetails, similarItems: response.data };
}

// Create a new market item
export async function createMarketItem(
  item: Omit<MarketItemPost, "id">,
): Promise<MarketItemPost> {
  const response = await apiClient.post<MarketItemPost>("/market", item);
  return response.data;
}

// Update a market item
export async function updateMarketItem(item: {
  id: string;
  updates: object;
}): Promise<MarketItemPost> {
  const response = await apiClient.put<MarketItemPost>(`/market/${item.id}`, {
    ...item.updates,
  });
  return response.data;
}

// Delete a market item
export async function deleteMarketItem(
  itemId: string,
): Promise<MarketItemPost> {
  const response = await apiClient.delete<MarketItemPost>(`/market/${itemId}`);
  return response.data;
}
