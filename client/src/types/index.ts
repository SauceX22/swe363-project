export type MarketItem = {
  id: string;
  name: string;
  description: string;
  datePosted: Date;
  image: string | null;
  price: number;
  tag: string;
};

export type FoundItem = {
  id: string;
  name: string;
  description: string;
  datePosted: Date;
  image: string | null;
  tag: string;
};
