import { useQuery, useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import type { FoundItemPost } from "@/types";

// Fetch All Found Items
export const useFetchFoundItems = () =>
  useQuery({
    queryKey: ["foundItems"],
    queryFn: async () => {
      const { data } = await apiClient.get("/found");
      return data as FoundItemPost[];
    },
  });

// Fetch a Single Found Item
export const useFetchFoundItemById = (id: string) =>
  useQuery({
    queryKey: ["foundItem", id],
    queryFn: async () => {
      const { data } = await apiClient.get(`/found/${id}`);
      return data as FoundItemPost | null;
    },
    enabled: !!id, // Only run query if id is provided
  });

// Create a Found Item
export const useCreateFoundItem = () =>
  useMutation({
    mutationFn: async (item: {
      title: string;
      description: string;
      category: string;
      dateLost: string;
      location: string;
    }) => {
      const { data } = await apiClient.post("/found", item);
      return data as FoundItemPost;
    },
  });

// Update a Found Item
export const useUpdateFoundItem = () =>
  useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: object }) => {
      const { data } = await apiClient.put(`/found/${id}`, updates);
      return data as FoundItemPost;
    },
  });

// Delete a Found Item
export const useDeleteFoundItem = () =>
  useMutation({
    mutationFn: async (id: string) => {
      const { data } = await apiClient.delete(`/found/${id}`);
      return data as FoundItemPost;
    },
  });
