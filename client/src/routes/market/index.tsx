import { MarketItemCard } from "@/components/market-item-card";
import { NotFoundComponent } from "@/components/not-found";
import { buttonVariants } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";
import { getMarketItems } from "@/api/market";
import { createFileRoute, Link } from "@tanstack/react-router";

// routing for the page
export const Route = createFileRoute("/market/")({
  component: MarketItemsPage,
  // not found component boundary
  notFoundComponent: NotFoundComponent,
  loader: async () => {
    const { items } = await getMarketItems();
    return { items };
  },
});

function MarketItemsPage() {
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
    allCategories,
  } = useFilterMarketItems(initialItems);

  return (
    <main className="mx-auto w-fit px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="mb-4 text-2xl font-bold sm:mb-0">KFUPM Market</h1>
      </div>
      <Separator className="my-4" />
      <div className="mb-8 grid items-end gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <div className="w-full">
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full">
          <Label htmlFor="price">Price (SAR)</Label>
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger id="price">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="<100">{"<"}100</SelectItem>
              <SelectItem value="100-250">100-250</SelectItem>
              <SelectItem value="250-500">250-500</SelectItem>
              <SelectItem value="500-750">500-750</SelectItem>
              <SelectItem value="750-1000">750-1000</SelectItem>
              <SelectItem value="1000+">1000+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full">
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any</SelectItem>
              {allCategories.map((category) => (
                <SelectItem value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full">
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
          className={cn(buttonVariants(), "w-full sm:w-auto")}
          to="/market/new"
        >
          Add Yours!
        </Link>
      </div>

      <div className="grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-3 md:justify-start lg:grid-cols-4 xl:grid-cols-5">
        {filteredItems.map((item) => (
          <MarketItemCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}
