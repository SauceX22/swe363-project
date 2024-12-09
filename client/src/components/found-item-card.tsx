import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { FoundItem } from "@/types";
import { Link } from "@tanstack/react-router";

// card component for the found items posted by users
export function FoundItemCard({ item }: { item: FoundItem }) {
  return (
    <Link to={`/found/${item.id}`} className="w-fit">
      <Card className="flex h-full w-64 flex-col bg-primary p-4 text-primary-foreground hover:bg-primary/90">
        <CardHeader className="p-0">
          <img
            src={item.image ?? "/assets/placeholder.png"}
            alt={item.name}
            className="aspect-square w-full rounded-md object-cover"
          />
        </CardHeader>
        <CardContent className="p-0">
          <CardTitle className="mt-2 text-lg font-medium">
            {item.name}
          </CardTitle>
          <CardDescription className="text-wrap text-muted">
            {item.description}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
