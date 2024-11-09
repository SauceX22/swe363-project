import type { MarketItem } from "@/types";
import marketItemsData from "@/assets/data/sampleMarketItems.json";

// routers-based api, this is a layer betwen client and server to centralize data fetching and manipulation method

// type casting
const sampleMarketItems: MarketItem[] = marketItemsData.map((item) => ({
  ...item,
  datePosted: new Date(item.datePosted),
}));

// get the details of a market item from the server
export function getMarketItemDetails({ itemId }: { itemId: string }) {
  const itemDetails = sampleMarketItems.find((item) => item.id === itemId);
  return {
    item: itemDetails,
    similarItems: sampleMarketItems,
  };
}

// get the list of market items from the server
export function getMarketItems() {
  return {
    items: sampleMarketItems,
  };
}
