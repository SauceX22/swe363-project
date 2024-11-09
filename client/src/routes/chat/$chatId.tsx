import { ChatPage } from "@/components/chat-page";
import { NotFoundComponent } from "@/components/not-found";
import { getContacts } from "@/routers/chat";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/chat/$chatId")({
  notFoundComponent: NotFoundComponent,
  component: () => {
    const { contacts, selectedChat } = Route.useLoaderData();

    return (
      <ChatPage
        contacts={contacts}
        initialSelectedContactId={selectedChat.id}
      />
    );
  },
  beforeLoad: async ({ params: { chatId } }) => {
    if (!chatId) {
      throw redirect({
        to: "/chat",
      });
    }
  },
  loader: async ({ params: { chatId } }) => {
    const contacts = await getContacts();
    const selectedChat = contacts.find((c) => c.id === Number(chatId));
    if (!selectedChat) {
      throw redirect({
        to: "/chat",
      });
    }

    return {
      contacts,
      selectedChat,
    };
  },
});
