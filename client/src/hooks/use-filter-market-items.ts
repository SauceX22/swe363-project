import { getAllCategories, isPriceInRange } from "@/lib/utils";
import type { MarketItem } from "@/../../types";
import { useState } from "react";

// custom hook to filter market items based on the search term, category, and sort order
// this is used in the market page for the header filters
export const useFilterMarketItems = (initialItems: MarketItem[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("any");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const filteredItems = initialItems
    .filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesPrice =
        priceRange !== "any" ? isPriceInRange(item.price, priceRange) : true;
      const matchesCategory = category !== "all" ? item.tag === category : true;
      return matchesSearch && matchesPrice && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        case "date_desc":
          return (
            new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime()
          );
        case "date_asc":
          return (
            new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime()
          );
        default:
          return 0;
      }
    });

  return {
    filteredItems,
    searchTerm,
    setSearchTerm,
    priceRange,
    setPriceRange,
    category,
    setCategory,
    sortBy,
    setSortBy,
    allCategories: getAllCategories(initialItems.map((item) => item.tag)),
  };
};
