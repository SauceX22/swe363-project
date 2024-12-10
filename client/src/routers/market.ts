import type { FoundItemPost } from "../types";

// Fetch and transform the list of market items
async function fetchSampleMarketItems(): Promise<FoundItemPost[]> {
  const response = await fetch("/assets/data/sampleMarketItems.json");
  if (!response.ok) {
    throw new Error("Failed to fetch market items");
  }

  const rawItems = (await response.json()) as Array<
    Omit<FoundItemPost, "createdAt"> & { createdAt: string }
  >;
  return rawItems.map((item) => ({
    ...item,
    createdAt: new Date(item.createdAt), // Transform createdAt to a Date object
  }));
}

// Get the details of a specific market item
export async function getMarketItemDetails({ itemId }: { itemId: string }) {
  const sampleMarketItems = await fetchSampleMarketItems();
  const itemDetails = sampleMarketItems.find((item) => item.id === itemId);
  return {
    item: itemDetails,
    similarItems: sampleMarketItems,
  };
}

// Get the list of all market items
export async function getMarketItems() {
  const sampleMarketItems = await fetchSampleMarketItems();
  return {
    items: sampleMarketItems,
  };
}
