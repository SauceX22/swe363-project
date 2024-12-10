import type { FoundItemPost, MarketItemPost } from "../types";

// Fetch and transform the list of user items
async function fetchSampleUserItems(): Promise<
  (FoundItemPost | MarketItemPost)[]
> {
  const response = await fetch("/assets/data/sampleUserItems.json");
  if (!response.ok) {
    throw new Error("Failed to fetch user items");
  }

  const rawItems = (await response.json()) as Array<
    FoundItemPost | MarketItemPost
  >;

  return rawItems.map((item) => ({
    ...item,
  }));
}

// Get the details of a specific user item
export async function getUserItemDetails({ itemId }: { itemId: string }) {
  const sampleUserItems = await fetchSampleUserItems();
  const itemDetails = sampleUserItems.find((item) => item.id === itemId);
  return {
    item: itemDetails,
    similarItems: sampleUserItems,
  };
}

// Get the list of all user items
export async function getUserItems() {
  const sampleUserItems = await fetchSampleUserItems();
  return {
    items: sampleUserItems,
  };
}
