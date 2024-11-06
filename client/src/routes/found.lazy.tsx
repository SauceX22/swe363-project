import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { useMemo, useState } from "react";

export const Route = createLazyFileRoute("/found")({
  component: Found,
});
interface FoundItem {
  img: string;
  name: string;
  date: string;
}

const items: FoundItem[] = [
  {
    img: "https://placehold.co/600x400",
    name: "Black Wallet",
    date: "2024-11-01",
  },
  {
    img: "https://placehold.co/600x400",
    name: "Water Bottle",
    date: "2024-10-28",
  },
  {
    img: "https://placehold.co/600x400",
    name: "Red Backpack",
    date: "2024-10-22",
  },
  {
    img: "https://placehold.co/600x400",
    name: "Car Keys",
    date: "2024-10-15",
  },
  {
    img: "https://placehold.co/600x400",
    name: "Sunglasses",
    date: "2024-11-03",
  },
  {
    img: "https://placehold.co/600x400",
    name: "Laptop Charger",
    date: "2024-10-20",
  },
  {
    img: "https://placehold.co/600x400",
    name: "Notebook",
    date: "2024-10-25",
  },
  {
    img: "https://placehold.co/600x400",
    name: "Blue Pen",
    date: "2024-11-02",
  },
  {
    img: "https://placehold.co/600x400",
    name: "ID Card",
    date: "2024-09-30",
  },
  {
    img: "https://placehold.co/600x400",
    name: "Grey Hoodie",
    date: "2024-11-06",
  },
  {
    img: "https://placehold.co/600x400",
    name: "Headphones",
    date: "2024-10-10",
  },
  {
    img: "https://placehold.co/600x400",
    name: "Calculator",
    date: "2024-10-05",
  },
  {
    img: "https://placehold.co/600x400",
    name: "Umbrella",
    date: "2024-11-04",
  },
  {
    img: "https://placehold.co/600x400",
    name: "Textbook",
    date: "2024-09-22",
  },
  {
    img: "https://placehold.co/600x400",
    name: "Keychain",
    date: "2024-10-18",
  },
  {
    img: "https://placehold.co/600x400",
    name: "Smartwatch",
    date: "2024-10-30",
  },
  {
    img: "https://placehold.co/600x400",
    name: "Notebook",
    date: "2024-11-05",
  },
  {
    img: "https://placehold.co/600x400",
    name: "Green Water Bottle",
    date: "2024-10-12",
  },
  {
    img: "https://placehold.co/600x400",
    name: "Earbuds",
    date: "2024-09-28",
  },
  {
    img: "https://placehold.co/600x400",
    name: "Calculator",
    date: "2024-10-07",
  },
  {
    img: "https://placehold.co/600x400",
    name: "Black Hat",
    date: "2024-10-23",
  },
  {
    img: "https://placehold.co/600x400",
    name: "Scarf",
    date: "2024-11-01",
  },
  {
    img: "https://placehold.co/600x400",
    name: "Phone Case",
    date: "2024-09-15",
  },
  {
    img: "https://placehold.co/600x400",
    name: "Notebook",
    date: "2024-10-05",
  },
  {
    img: "https://placehold.co/600x400",
    name: "Blue Jacket",
    date: "2024-10-27",
  },
];

function Found() {
  const [sortOrder, setSortOrder] = useState<string>("newest");
  const [searchInput, setSearchInput] = useState<string>("");

  const filteredAndSortedItems = useMemo(() => {
    return items
      .filter((item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase()),
      )
      .sort((a, b) => {
        if (sortOrder === "newest") {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        } else if (sortOrder === "oldest") {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        return 0;
      });
  }, [sortOrder, searchInput]);

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-left text-2xl font-bold">KFUPM Losts and Founds</h1>
      </div>
      <Separator className="my-4 w-full" />
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <Input
          type="search"
          placeholder="Search..."
          className="w-64"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
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
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button className="ml-auto">Add Item!</Button>
      </div>

      {filteredAndSortedItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {filteredAndSortedItems.map((item, index) => (
              <Card key={index} className="flex flex-col h-full">
                <img src={item.img} alt={`${item.name} image`} className="w-full h-auto" />

              <CardFooter className="flex flex-col">
              <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.date}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="mt-12 text-center p-8 bg-gray-100 rounded-lg">
          <p className="text-xl font-semibold text-gray-600">No items found</p>
        </div>
      )}
    </div>
  );
}

export default Found;
