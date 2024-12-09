import apiClient from "@/lib/apiClient";
import type { FoundItem, MarketItem } from "@/../../types";

// Get all user items (found items and market items)
export async function getUserItems(): Promise<{
  items: (FoundItem | MarketItem)[];
}> {
  const response =
    await apiClient.get<(FoundItem | MarketItem)[]>("/user-items");
  return { items: response.data };
}

// Get details of a specific user item
export async function getUserItemDetails(itemId: string): Promise<{
  item: FoundItem | MarketItem | undefined;
  similarItems: (FoundItem | MarketItem)[];
}> {
  const response =
    await apiClient.get<(FoundItem | MarketItem)[]>(`/user-items`);
  const itemDetails = response.data.find((item) => item.id === itemId);
  return { item: itemDetails, similarItems: response.data };
}
