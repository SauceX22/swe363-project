import { ChatPage } from "@/components/chat-page";
import { NotFoundComponent } from "@/components/not-found";
import { getContacts } from "@/api/chat";
import { createFileRoute, redirect } from "@tanstack/react-router";

// routing for the page
export const Route = createFileRoute("/chat/$chatId")({
  // not found component boundary
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
  // executed before the loader and the page run
  beforeLoad: async ({ params: { chatId } }) => {
    // redirect to the chat page if the chat id doesn't exist
    if (!chatId) {
      throw redirect({
        to: "/chat",
      });
    }
  },
  // executed before the page renders
  loader: async ({ params: { chatId } }) => {
    // get all the contacts of this person
    const contacts = await getContacts();
    const selectedChat = contacts.find((c) => c.id === Number(chatId));
    // redirect to the chat page if the chat doesn't exist
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
