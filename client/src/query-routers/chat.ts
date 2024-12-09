import { useQuery, useMutation } from "@tanstack/react-query";
import apiClient from "../lib/apiClient";

// Fetch All Chat Rooms
export const useFetchChatRooms = () =>
  useQuery({
    queryKey: ["chatRooms"],
    queryFn: async () => {
      const { data } = await apiClient.get("/chat/rooms");
      return data;
    },
  });

// Fetch Messages in a Chat Room
export const useFetchChatMessages = (roomId: string) =>
  useQuery({
    queryKey: ["chatMessages", roomId],
    queryFn: async () => {
      const { data } = await apiClient.get(`/chat/rooms/${roomId}/messages`);
      return data;
    },
    enabled: !!roomId,
  });

// Send a Message in a Chat Room
export const useSendChatMessage = () =>
  useMutation({
    mutationFn: async ({
      roomId,
      content,
    }: {
      roomId: string;
      content: string;
    }) => {
      const { data } = await apiClient.post(`/chat/rooms/${roomId}/messages`, {
        content,
      });
      return data;
    },
  });

// Create a Chat Room
export const useCreateChatRoom = () =>
  useMutation({
    mutationFn: async (participants: string[]) => {
      const { data } = await apiClient.post("/chat/rooms", { participants });
      return data;
    },
  });
