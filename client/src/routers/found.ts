// routers-based api, this is a layer betwen client and server to centralize data fetching and manipulation method

import type { FoundItemPost } from "@/types";

// Fetch and transform the list of found items
async function fetchSampleFoundItems(): Promise<FoundItemPost[]> {
  const response = await fetch("/assets/data/sampleFoundItems.json");
  if (!response.ok) {
    throw new Error("Failed to fetch found items");
  }

  const rawItems = (await response.json()) as Array<
    Omit<FoundItemPost, "createdAt"> & { createdAt: string }
  >;
  return rawItems.map((item) => ({
    ...item,
    createdAt: new Date(item.createdAt), // Transform createdAt to a Date object
  }));
}

// Get the details of a specific found item
export async function getFoundItemDetails({ itemId }: { itemId: string }) {
  const sampleFoundItems = await fetchSampleFoundItems();
  const itemDetails = sampleFoundItems.find((item) => item.id === itemId);
  return {
    item: itemDetails,
    similarItems: sampleFoundItems,
  };
}

// Get the list of all found items
export async function getFoundItems() {
  const sampleFoundItems = await fetchSampleFoundItems();
  return {
    items: sampleFoundItems,
  };
}
