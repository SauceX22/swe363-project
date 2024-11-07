import { MarketItemCard } from "@/components/market/market-item-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { getMarketItemsSample } from "@/routers/market";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/market/")({
  component: MarketPage,
  loader: async () => {
    const { items } = await getMarketItemsSample();
    return { items };
  },
});

function MarketPage() {
  const { items } = Route.useLoaderData();

  return (
    <main className="px-64 py-8">
      <div className="flex justify-between">
        <h1 className="text-left text-2xl font-bold">KFUPM Market</h1>
      </div>
      <Separator className="my-4 w-full" />
      <div className="mb-8 flex flex-wrap items-center gap-4">
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
        <Label className="ml-4 mt-2">Sort by</Label>
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
        <Button className="ml-auto">Add Yours!</Button>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-5 lg:grid-cols-5">
        {items.map((item) => (
          <MarketItemCard item={item} />
        ))}
      </div>
    </main>
  );
}
