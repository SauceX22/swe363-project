import { getMarketItemDetailsSample } from "@/routers/market";
import { createFileRoute, redirect } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MarketItemCard } from "@/components/market/market-item-card";

export const Route = createFileRoute("/market/$itemId")({
  component: ItemDetails,
  loader: async ({ params }) => {
    const { itemId } = params;
    const { item, similarItems } = await getMarketItemDetailsSample({
      itemId,
    });
    // if the id isn't proper or doesn't exist, redirect to the market page
    if (!item) {
      throw redirect({
        to: "/market",
      });
    }
    return { item, similarItems };
  },
});

function ItemDetails() {
  const { item: itemDetails, similarItems } = Route.useLoaderData();

  return (
    <main className="flex min-h-screen flex-col items-center bg-background p-4 md:p-8">
      <Card className="mb-8 flex w-full flex-row gap-8 p-6 md:p-10 lg:w-11/12 xl:w-10/12">
        <CardHeader className="p-0">
          <img
            src={itemDetails.image ?? "/src/assets/placeholder.png"}
            alt={itemDetails.name}
            className="aspect-square h-64 rounded-lg object-cover md:h-[600px] md:w-1/2 lg:w-[650px]"
          />
        </CardHeader>
        <div className="flex flex-col items-start justify-between gap-4 p-0">
          <CardContent className="justify-between p-0 md:ml-10 md:mt-0 md:w-1/2">
            <div>
              <CardTitle className="text-3xl font-bold md:text-4xl">
                {itemDetails.name}
              </CardTitle>
              <Badge variant="secondary" className="mt-2 text-lg">
                {itemDetails.tag}
              </Badge>
              <p className="mt-4 text-2xl font-bold md:text-3xl">
                ${itemDetails.price}
              </p>
              <CardDescription className="mt-2 text-base md:text-lg">
                {itemDetails.description}
              </CardDescription>
            </div>
          </CardContent>
          <CardFooter className="w-full p-0">
            <Button size="lg" className="w-full">
              Get In Contact
            </Button>
          </CardFooter>
        </div>
      </Card>

      <Card className="w-full lg:w-11/12 xl:w-10/12">
        <CardHeader>
          <CardTitle className="text-2xl md:text-[1.75rem]">
            Similar Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Carousel className="w-full" opts={{ align: "start" }}>
            <CarouselContent className="-ml-4 flex snap-none">
              {similarItems.map((item: any) => (
                <CarouselItem
                  key={item.id}
                  className="basis-full pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-[1/4]"
                >
                  <MarketItemCard item={item} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious variant="default" className="h-full" />
            <CarouselNext variant="default" className="h-full" />
          </Carousel>
        </CardContent>
      </Card>
    </main>
  );
}
