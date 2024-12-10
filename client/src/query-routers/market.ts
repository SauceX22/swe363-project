import { useQuery, useMutation } from "@tanstack/react-query";
import apiClient from "../lib/apiClient";
import type { MarketItemPost } from "@/types";

// Fetch All Market Items
export const useFetchMarketItems = () =>
  useQuery({
    queryKey: ["marketItems"],
    queryFn: async () => {
      const { data } = await apiClient.get("/market");
      return data as MarketItemPost[];
    },
  });

// Fetch a Single Market Item
export const useFetchMarketItemById = (id: string) =>
  useQuery({
    queryKey: ["marketItem", id],
    queryFn: async () => {
      const { data } = await apiClient.get(`/market/${id}`);
      return data as MarketItemPost | null;
    },
    enabled: !!id,
  });

// Create a Market Item
export const useCreateMarketItem = () =>
  useMutation({
    mutationFn: async (item: {
      title: string;
      description: string;
      category: string;
      price: number;
      condition: string;
    }) => {
      const { data } = await apiClient.post("/market", item);
      return data as MarketItemPost;
    },
  });

// Update a Market Item
export const useUpdateMarketItem = () =>
  useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: object }) => {
      const { data } = await apiClient.put(`/market/${id}`, updates);
      return data as MarketItemPost;
    },
  });

// Delete a Market Item
export const useDeleteMarketItem = () =>
  useMutation({
    mutationFn: async (id: string) => {
      const { data } = await apiClient.delete(`/market/${id}`);
      return data as MarketItemPost;
    },
  });
