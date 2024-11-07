import type { MarketItem } from "@/types";
import marketItemsData from "@/assets/data/sampleMarketItems.json";

const sampleMarketItems: MarketItem[] = marketItemsData.map((item) => ({
  ...item,
  datePosted: new Date(item.datePosted),
}));

// Mock implementation of getMarketItemDetailsSample
export function getMarketItemDetails({ itemId }: { itemId: string }) {
  const itemDetails = sampleMarketItems.find((item) => item.id === itemId);
  return {
    item: itemDetails,
    similarItems: sampleMarketItems,
  };
}

export function getMarketItems() {
  return {
    items: sampleMarketItems,
  };
}
