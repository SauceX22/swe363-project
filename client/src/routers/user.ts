import userItemsData from "@/assets/data/sampleUserItems.json";
import type { FoundItem, MarketItem } from "@/types";

// routers-based api, this is a layer betwen client and server to centralize data fetching and manipulation method

// type casting
const sampleUserItems: (FoundItem | MarketItem)[] = userItemsData.map(
  (item) => ({
    ...item,
    datePosted: new Date(item.datePosted),
  }),
);

// get the details of a user item from the server
export function getUserItemDetails({ itemId }: { itemId: string }) {
  const itemDetails = sampleUserItems.find((item) => item.id === itemId);
  return {
    item: itemDetails,
    similarItems: sampleUserItems,
  };
}

// get the list of user items from the server
export function getUserItems() {
  return {
    items: sampleUserItems,
  };
}
