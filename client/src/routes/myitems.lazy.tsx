"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createLazyFileRoute("/myitems")({
  component: MyItems,
});

interface BaseItem {
  img: string;
  name: string;
  type: "Found" | "ForSale";
  date: string;
}

interface ForSaleItem extends BaseItem {
  type: "ForSale";
  price: string;
}

interface FoundItem extends BaseItem {
  type: "Found";
}

type Item = ForSaleItem | FoundItem;

const items: Item[] = [
  {
    img: "https://placehold.co/600x400",
    name: "Item for Sale",
    type: "ForSale",
    price: "100 USD",
    date: "2024-11-05",
  },
  {
    img: "https://placehold.co/600x400",
    name: "Found Item",
    type: "Found",
    date: "2024-11-01",
  },
  {
    img: "https://placehold.co/600x400",
    name: "Vintage Camera",
    type: "ForSale",
    price: "200 USD",
    date: "2024-10-20",
  },
  {
    img: "https://placehold.co/600x400",
    name: "Lost Wallet",
    type: "Found",
    date: "2024-10-25",
  },
  {
    img: "https://placehold.co/600x400",
    name: "Antique Vase",
    type: "ForSale",
    price: "150 USD",
    date: "2024-10-30",
  },
  {
    img: "https://placehold.co/600x400",
    name: "Keychain with Keys",
    type: "Found",
    date: "2024-10-15",
  },
  {
    img: "https://placehold.co/600x400",
    name: "Designer Handbag",
    type: "ForSale",
    price: "350 USD",
    date: "2024-11-02",
  },
];

function MyItems() {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("newest");

  const filteredItems =
    selectedType === "all"
      ? items
      : items.filter((item) => item.type === selectedType);

  const sortedItems = filteredItems.sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortOrder === "oldest") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (
      selectedType === "ForSale" &&
      (sortOrder === "priceAsc" || sortOrder === "priceDesc")
    ) {
      if (a.type === "ForSale" && b.type === "ForSale") {
        if (sortOrder === "priceAsc") {
          return parseFloat(a.price) - parseFloat(b.price);
        } else if (sortOrder === "priceDesc") {
          return parseFloat(b.price) - parseFloat(a.price);
        }
      }
    }
    return 0;
  });

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-left text-2xl font-bold">My Items</h1>
      </div>
      <Separator className="my-4 w-full" />
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <Select
          name="Type"
          value={selectedType}
          onValueChange={(value) => {
            setSelectedType(value);
            setSortOrder("newest");
          }}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Type</SelectLabel>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="ForSale">For Sale</SelectItem>
              <SelectItem value="Found">Found</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Label className="ml-4 mt-2">Sort by</Label>
        <Select
          name="SortOrder"
          value={sortOrder}
          onValueChange={(value) => setSortOrder(value)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by</SelectLabel>
              <SelectItem value="newest">Newest to Oldest</SelectItem>
              <SelectItem value="oldest">Oldest to Newest</SelectItem>
              {selectedType === "ForSale" && (
                <>
                  <SelectItem value="priceAsc">Price: Low to High</SelectItem>
                  <SelectItem value="priceDesc">Price: High to Low</SelectItem>
                </>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {sortedItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {sortedItems.map((item, index) => (
            <Card key={index}>
              <img
                src={item.img}
                alt={`${item.name} image`}
                className="h-auto w-full"
              />
              <CardFooter className="flex flex-col">
                <h3 className="mb-1 text-lg font-semibold">{item.name}</h3>
                {item.type === "ForSale" && (
                  <p className="text-sm text-gray-600">Price: {item.price}</p>
                )}
                <p className="text-sm text-gray-600">Date: {item.date}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-lg bg-gray-100 p-8 text-center">
          <p className="text-xl font-semibold text-gray-600">No items found</p>
        </div>
      )}
    </div>
  );
}

export default MyItems;
