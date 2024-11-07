import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { MarketItem } from "@/types";

export function MarketItemCard({ item }: { item: MarketItem }) {
  return (
    <Card className="flex h-full w-64 flex-col p-4">
      <CardHeader className="p-0">
        <img
          src={item.image}
          alt={item.name}
          className="aspect-square w-full object-cover"
        />
      </CardHeader>
      <CardContent className="p-0">
        <CardTitle className="mt-2 text-lg font-medium">{item.name}</CardTitle>
        <p className="text-lg font-medium">${item.price}</p>
        <CardDescription>{item.description}</CardDescription>
      </CardContent>
    </Card>
  );
}
