"use client";

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
import { useFilterUserItems } from "@/hooks/use-filter-user-items";
import { cn } from "@/lib/utils";
import { getUserItems } from "@/routers/user";
import { createFileRoute, Link } from "@tanstack/react-router";
import { NotFoundComponent } from "@/components/not-found";
import { FoundItemCard } from "@/components/found-item-card";
import { MarketItemCard } from "@/components/market-item-card";
import type { FoundItemPost, MarketItemPost } from "../types";

// routing for the page
export const Route = createFileRoute("/myitems")({
  // not found component boundary
  notFoundComponent: NotFoundComponent,
  component: MyItemsPage,
  loader: async () => {
    return await getUserItems();
  },
});

function MyItemsPage() {
  const { items: initialItems } = Route.useLoaderData();
  const {
    filteredItems,
    searchTerm,
    setSearchTerm,
    category,
    setCategory,
    sortBy,
    setSortBy,
    allCategories,
  } = useFilterUserItems(initialItems);

  return (
    <main className="mx-auto w-fit px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="mb-4 text-2xl font-bold sm:mb-0">KFUPM User</h1>
      </div>
      <Separator className="my-4" />
      <div className="mb-8 grid items-end gap-4 sm:grid-cols-2 lg:grid-cols-5">
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
              <SelectItem value="date_desc">Date: Latest</SelectItem>
              <SelectItem value="date_asc">Date: Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Link
          className={cn(buttonVariants(), "w-full sm:w-auto")}
          to="/market/new"
        >
          Post New Market Item
        </Link>
        <Link
          className={cn(buttonVariants(), "w-full sm:w-auto")}
          to="/found/new"
        >
          Post a Lost Item
        </Link>
      </div>

      <div className="grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-3 md:justify-start lg:grid-cols-4 xl:grid-cols-5">
        {filteredItems.map((item) =>
          // item type of FoundItem or MarketItem
          "price" in item ? (
            <MarketItemCard key={item.id} item={item as MarketItemPost} />
          ) : (
            <FoundItemCard key={item.id} item={item as FoundItemPost} />
          ),
        )}
      </div>
    </main>
  );
}
