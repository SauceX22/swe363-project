import { getAllCategories } from "@/lib/utils";
import { useState } from "react";
import type { FoundItem, MarketItem } from "@/types";

// custom hook to filter user items based on the search term, category, and sort order
// this is used in the user page for the header filters
export const useFilterUserItems = (
  initialItems: (FoundItem | MarketItem)[],
) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const filteredItems = initialItems
    .filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory = category !== "all" ? item.tag === category : true;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
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
    category,
    setCategory,
    sortBy,
    setSortBy,
    allCategories: getAllCategories(initialItems.map((item) => item.tag)),
  };
};
