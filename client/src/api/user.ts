import apiClient from "@/lib/apiClient";
import type { FoundItemPost, MarketItemPost } from "@/types";

// Get all user items (found items and market items)
export async function getUserItems(): Promise<{
  items: (FoundItemPost | MarketItemPost)[];
}> {
  const response =
    await apiClient.get<(FoundItemPost | MarketItemPost)[]>("/user-items");
  return { items: response.data };
}

// Get details of a specific user item
export async function getUserItemDetails(itemId: string): Promise<{
  item: FoundItemPost | MarketItemPost | undefined;
  similarItems: (FoundItemPost | MarketItemPost)[];
}> {
  const response =
    await apiClient.get<(FoundItemPost | MarketItemPost)[]>(`/user-items`);
  const itemDetails = response.data.find((item) => item.id === itemId);
  return { item: itemDetails, similarItems: response.data };
}
