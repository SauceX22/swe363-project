import type { FoundItem } from "@/types";
import foundItemsData from "@/assets/data/sampleFoundItems.json";

const sampleFoundItems: FoundItem[] = foundItemsData.map((item) => ({
  ...item,
  datePosted: new Date(item.datePosted),
}));

// Mock implementation of getFoundItemDetailsSample
export function getFoundItemDetails({ itemId }: { itemId: string }) {
  const itemDetails = sampleFoundItems.find((item) => item.id === itemId);
  return {
    item: itemDetails,
    similarItems: sampleFoundItems,
  };
}

export function getFoundItems() {
  return {
    items: sampleFoundItems,
  };
}
