import apiClient from "@/lib/apiClient";
import type { MarketItem } from "@/types";

// Get all market items
export async function getMarketItems(): Promise<{ items: MarketItem[] }> {
  const response = await apiClient.get<MarketItem[]>("/market");
  console.log(response.data);
  return { items: response.data };
}

// Get details of a specific market item
export async function getMarketItemDetails(itemId: string): Promise<{
  item: MarketItem | undefined;
  similarItems: MarketItem[];
}> {
  const response = await apiClient.get<MarketItem[]>(`/market/${itemId}`);
  const itemDetails = response.data.find((item) => item.id === itemId);
  return { item: itemDetails, similarItems: response.data };
}

// Create a new market item
export async function createMarketItem(
  item: Omit<MarketItem, "id">,
): Promise<MarketItem> {
  const response = await apiClient.post<MarketItem>("/market", item);
  return response.data;
}

// Update a market item
export async function updateMarketItem(item: {
  id: string;
  updates: object;
}): Promise<MarketItem> {
  const response = await apiClient.put<MarketItem>(`/market/${item.id}`, {
    ...item.updates,
  });
  return response.data;
}

// Delete a market item
export async function deleteMarketItem(itemId: string): Promise<MarketItem> {
  const response = await apiClient.delete<MarketItem>(`/market/${itemId}`);
  return response.data;
}
