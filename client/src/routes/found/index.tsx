import { FoundItemCard } from "@/components/found/found-item-card";
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
import { useFilterFoundItems } from "@/hooks/use-filter-found-items";
import { cn } from "@/lib/utils";
import { getFoundItems } from "@/routers/found";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/found/")({
  component: FoundItemsPage,
  loader: async () => {
    const { items } = await getFoundItems();
    return { items };
  },
});

function FoundItemsPage() {
  const { items: initialItems } = Route.useLoaderData();
  const {
    filteredItems,
    searchTerm,
    setSearchTerm,
    category,
    setCategory,
    sortBy,
    setSortBy,
  } = useFilterFoundItems(initialItems);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">KFUPM Found</h1>
      </div>
      <Separator className="my-4" />
      <div className="mb-8 flex flex-wrap items-end gap-4">
        <div className="w-full max-w-sm flex-grow sm:w-auto">
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full max-w-[12rem]">
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Fashion">Fashion</SelectItem>
              <SelectItem value="Others">Others</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full max-w-[12rem]">
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
          className={cn(buttonVariants(), "ml-auto w-full max-w-[16rem]")}
          // TsODO to="/found/new"
        >
          Add Yours!
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filteredItems.map((item) => (
          <FoundItemCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}
