import { getAllCategories } from "@/lib/utils";
import type { FoundItemPost } from "../types";
import { useState } from "react";

// custom hook to filter found items based on the search term, category, and sort order
// this is used in the found page for the header filters
export const useFilterFoundItems = (initialItems: FoundItemPost[]) => {
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
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "date_asc":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
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
