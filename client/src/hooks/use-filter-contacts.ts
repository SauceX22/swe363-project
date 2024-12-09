import type { Contact } from "@/../../types";
import { useState } from "react";

// custom hook to filter contacts in chat page based on the search term
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
