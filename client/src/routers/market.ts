import type { MarketItem } from "@/types";

const sampleMarketItems: MarketItem[] = [
  {
    id: "1",
    name: "Vintage Desk Lamp",
    datePosted: new Date(),
    price: 50,
    description:
      "Very good lamp, bright light, easy on the eyes. Perfect for your home office or study area.",
    image: "/src/assets/placeholder.png",
    tag: "Home & Living",
  },
  {
    id: "2",
    name: "Modern Floor Lamp",
    datePosted: new Date(),
    price: 75,
    description:
      "Stylish floor lamp with a modern design. Best suited for contemporary living spaces.",
    image: "/src/assets/placeholder.png",
    tag: "Home & Living",
  },
  {
    id: "3",
    name: "Table Lamp",
    datePosted: new Date(),
    price: 40,
    description:
      "Compact and elegant table lamp. It provides excellent focused lighting.",
    image: "/src/assets/placeholder.png",
    tag: "Home & Living",
  },
  {
    id: "4",
    name: "Wall Sconce",
    datePosted: new Date(),
    price: 35,
    description:
      "Wall-mounted sconce that adds a touch of class to any room. Ideal for hallways or bedrooms.",
    image: "/src/assets/placeholder.png",
    tag: "Lighting",
  },
  {
    id: "5",
    name: "Pendant Light",
    datePosted: new Date(),
    price: 60,
    description: "Hanging pendant light perfect for dining rooms and kitchens.",
    image: "/src/assets/placeholder.png",
    tag: "Lighting & Decor",
  },
  {
    id: "6",
    name: "Desk Lamp",
    datePosted: new Date(),
    price: 45,
    description:
      "Adjustable desk lamp with LED lighting for efficient workspace illumination.",
    image: "/src/assets/placeholder.png",
    tag: "Office Supplies",
  },
  {
    id: "7",
    name: "Reading Light",
    datePosted: new Date(),
    price: 30,
    description:
      "Perfect reading light with adjustable neck for personalized lighting.",
    image: "/src/assets/placeholder.png",
    tag: "Bedroom",
  },
  {
    id: "8",
    name: "Smart Lamp",
    datePosted: new Date(),
    price: 80,
    description:
      "Smart lamp with connectivity options for remote control and automation.",
    image: "/src/assets/placeholder.png",
    tag: "Smart Home",
  },
  {
    id: "9",
    name: "LED Lamp",
    datePosted: new Date(),
    price: 55,
    description: "Energy-efficient LED lamp with long-lasting brightness.",
    image: "/src/assets/placeholder.png",
    tag: "Energy Efficient",
  },
];

// Mock implementation of getMarketItemDetailsSample
export function getMarketItemDetailsSample({ itemId }: { itemId: string }) {
  const itemDetails = sampleMarketItems.find((item) => item.id === itemId);
  return {
    item: itemDetails,
    similarItems: sampleMarketItems,
  };
}

export function getMarketItemsSample() {
  return {
    items: sampleMarketItems,
  };
}
