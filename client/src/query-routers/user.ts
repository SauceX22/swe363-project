import { useQuery, useMutation } from "@tanstack/react-query";
import apiClient from "../lib/apiClient";

// Fetch User Profile
export const useFetchUserProfile = () =>
  useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const { data } = await apiClient.get("/users/me");
      return data;
    },
  });

// Update User Profile
export const useUpdateUserProfile = () =>
  useMutation({
    mutationFn: async (updates: { name?: string; email?: string }) => {
      const { data } = await apiClient.put("/users/me", updates);
      return data;
    },
  });
