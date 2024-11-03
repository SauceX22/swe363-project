import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/market")({
  component: MarketPage,
});

interface Item {
  img: string;
  name: string;
  price: string;
}

const items: Item[] = [
  {
    img: "landscape-placeholder-svgrepo-com.svg",
    name: "Item Name",
    price: "Item Price",
  },
  { img: "img", name: "Item Name", price: "Item Price" },
  { img: "img", name: "Item Name", price: "Item Price" },
  { img: "img", name: "Item Name", price: "Item Price" },
  { img: "img", name: "Item Name", price: "Item Price" },
  { img: "img", name: "Item Name", price: "Item Price" },
  { img: "img", name: "Item Name", price: "Item Price" },
  { img: "img", name: "Item Name", price: "Item Price" },
  { img: "img", name: "Item Name", price: "Item Price" },
  { img: "img", name: "Item Name", price: "Item Price" },
  { img: "img", name: "Item Name", price: "Item Price" },
  { img: "img", name: "Item Name", price: "Item Price" },
  { img: "img", name: "Item Name", price: "Item Price" },
  { img: "img", name: "Item Name", price: "Item Price" },
  // Add more items as needed
];

function MarketPage() {
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-left">KFUPM Market</h1>
        <Button variant="outline" className="mt-4">
          Add Yours!
        </Button>
      </div>
      <div className="mt-6 flex space-x-4">
        <Input type="search" placeholder="Search..." className="w-64" />
        <Select name="price">
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Price (SAR)" />
            <SelectContent>
              <SelectItem value="<100">{"<"}100</SelectItem>
              <SelectItem value="100-250">100-250</SelectItem>
              <SelectItem value="250-500">250-500</SelectItem>
              <SelectItem value="500-750">500-750</SelectItem>
              <SelectItem value="750-1000">750-1000</SelectItem>
              <SelectItem value="1000+">1000+</SelectItem>
            </SelectContent>
          </SelectTrigger>
        </Select>
        <Select>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Category" />
            <SelectContent>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Fashion">Fashion</SelectItem>
              <SelectItem value="Others">Others</SelectItem>
            </SelectContent>
          </SelectTrigger>
        </Select>
        <h3 className="ml-4 mt-2">Sort by</h3>

        <Select>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Default" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Price: low to high">
              Price: low to high
            </SelectItem>
            <SelectItem value="Price: high to low">
              Price: high to low
            </SelectItem>
            <SelectItem value="Date: latest">Date: latest</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-5 lg:grid-cols-5">
        {items.map((item) => (
          <Card>
            <CardHeader></CardHeader>
            <CardContent>
              <img src="https://placehold.co/600x400" alt="Item image" />
            </CardContent>
            <CardFooter className="flex flex-col">
              <p>{item.name}</p>

              <p>{item.price}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
