import { useQuery, useMutation } from "@tanstack/react-query";
import apiClient from "../lib/apiClient";

// Fetch All Contact Messages (Admin Only)
export const useFetchContactMessages = () =>
  useQuery({
    queryKey: ["contactMessages"],
    queryFn: async () => {
      const { data } = await apiClient.get("/contact");
      return data;
    },
  });

// Submit a Contact Message
export const useCreateContactMessage = () =>
  useMutation({
    mutationFn: async (message: {
      name: string;
      email: string;
      message: string;
    }) => {
      const { data } = await apiClient.post("/contact", message);
      return data;
    },
  });
