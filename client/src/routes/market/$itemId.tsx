import { MarketItemCard } from "@/components/market-item-card";
import { NotFoundComponent } from "@/components/not-found";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { getMarketItemDetails } from "@/routers/market";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";

// routing for the page
export const Route = createFileRoute("/market/$itemId")({
  component: MarketItemDetailsPage,
  // not found component boundary
  notFoundComponent: NotFoundComponent,
  // executed before the page renders
  loader: async ({ params }) => {
    const { itemId } = params;
    const { item, similarItems } = await getMarketItemDetails({
      itemId,
    });
    // if the id isn't proper or doesn't exist, redirect to the market page
    if (!item) {
      throw notFound();
    }
    return { item, similarItems };
  },
});

function MarketItemDetailsPage() {
  const { item: itemDetails, similarItems } = Route.useLoaderData();

  return (
    <main className="flex min-h-screen flex-col items-center bg-background p-4 sm:p-6 md:p-8">
      <Card className="mb-8 w-full lg:w-10/12 xl:w-9/12">
        <CardContent className="p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="flex flex-col md:flex-row md:items-start md:gap-8">
            <div className="mb-6 md:mb-0 md:w-1/2">
              <img
                src={itemDetails.image ?? "/src/assets/placeholder.png"}
                alt={itemDetails.name}
                className="aspect-square w-full rounded-lg object-cover"
              />
            </div>
            <div className="flex flex-col justify-between md:h-full md:w-1/2">
              <div>
                <CardTitle className="text-2xl font-bold sm:text-3xl md:text-4xl">
                  {itemDetails.name}
                </CardTitle>
                <Badge
                  variant="secondary"
                  className="mt-2 w-fit text-sm sm:text-base md:text-lg"
                >
                  {itemDetails.tag}
                </Badge>
                <p className="mt-4 text-2xl font-bold md:text-3xl">
                  ${itemDetails.price}
                </p>
                <CardDescription className="mt-4 text-sm sm:text-base md:text-lg">
                  {itemDetails.description}
                </CardDescription>
              </div>
              <div className="mt-6 md:mt-8">
                <Link
                  to="/chat"
                  className={cn("w-full", buttonVariants({ size: "lg" }))}
                >
                  Get In Contact
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full lg:w-10/12 xl:w-9/12">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl md:text-[1.75rem]">
            Similar Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="w-full whitespace-nowrap rounded-md">
            <div className="flex w-max gap-4 p-4">
              {similarItems.map((item: any) => (
                <div
                  key={item.id}
                  className="w-[200px] flex-shrink-0 snap-center sm:w-[250px]"
                >
                  <MarketItemCard item={item} />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>
    </main>
  );
}
