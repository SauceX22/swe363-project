import type { Contact } from "@/types";
import { useState } from "react";

export const useFilterContacts = (initialItems: Contact[]) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = initialItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return {
    filteredItems,
    searchTerm,
    setSearchTerm,
  };
};
