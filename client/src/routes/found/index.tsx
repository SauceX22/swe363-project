import { FoundItemCard } from "@/components/found/found-item-card";
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
import { useFilterFoundItems } from "@/hooks/use-filter-found-items";
import { cn } from "@/lib/utils";
import { getFoundItems } from "@/routers/found";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/found/")({
  component: FoundItemsPage,
  notFoundComponent: NotFoundComponent,
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
    <main className="mx-auto w-fit px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="mb-4 text-2xl font-bold sm:mb-0">KFUPM Found</h1>
      </div>
      <Separator className="my-4" />
      <div className="mb-8 grid items-end gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Fashion">Fashion</SelectItem>
              <SelectItem value="Others">Others</SelectItem>
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
          to="/found/new"
        >
          Add Yours!
        </Link>
      </div>

      <div className="grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-3 md:justify-start lg:grid-cols-4 xl:grid-cols-5">
        {filteredItems.map((item) => (
          <FoundItemCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}
