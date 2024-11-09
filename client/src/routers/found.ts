import type { FoundItem } from "@/types";
import foundItemsData from "@/assets/data/sampleFoundItems.json";

// routers-based api, this is a layer betwen client and server to centralize data fetching and manipulation method

// type casting
const sampleFoundItems: FoundItem[] = foundItemsData.map((item) => ({
  ...item,
  datePosted: new Date(item.datePosted),
}));

// get the details of a found item from the server
export function getFoundItemDetails({ itemId }: { itemId: string }) {
  const itemDetails = sampleFoundItems.find((item) => item.id === itemId);
  return {
    item: itemDetails,
    similarItems: sampleFoundItems,
  };
}

// get the list of found items from the server
export function getFoundItems() {
  return {
    items: sampleFoundItems,
  };
}
