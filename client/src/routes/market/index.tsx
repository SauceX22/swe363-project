import { MarketItemCard } from "@/components/market/market-item-card";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { useFilterMarketItems } from "@/hooks/use-filter-market-items";
import { getMarketItemsSample } from "@/routers/market";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/market/")({
  component: MarketPage,
  loader: async () => {
    const { items } = await getMarketItemsSample();
    return { items };
  },
});

function MarketPage() {
  const { items: initialItems } = Route.useLoaderData();
  const {
    filteredItems,
    searchTerm,
    setSearchTerm,
    priceRange,
    setPriceRange,
    category,
    setCategory,
    sortBy,
    setSortBy,
  } = useFilterMarketItems(initialItems);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">KFUPM Market</h1>
      </div>
      <Separator className="my-4" />
      <div className="mb-8 grid grid-cols-1 items-end gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <div className="col-span-full sm:col-span-2">
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="price">Price (SAR)</Label>
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger id="price">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Price</SelectItem>
              <SelectItem value="<100">{"<"}100</SelectItem>
              <SelectItem value="100-250">100-250</SelectItem>
              <SelectItem value="250-500">250-500</SelectItem>
              <SelectItem value="500-750">500-750</SelectItem>
              <SelectItem value="750-1000">750-1000</SelectItem>
              <SelectItem value="1000+">1000+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Fashion">Fashion</SelectItem>
              <SelectItem value="Others">Others</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="sort">Sort by</Label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger id="sort">
              <SelectValue placeholder="Default" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
              <SelectItem value="date_desc">Date: Latest</SelectItem>
              <SelectItem value="date_asc">Date: Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Link
          className={buttonVariants()}
          // TODO to="/market/new"
        >
          Add Yours!
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filteredItems.map((item) => (
          <MarketItemCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}
