import { ChatPage } from "@/components/chat-page";
import { NotFoundComponent } from "@/components/not-found";
import { getContacts } from "@/api/chat";
import { createFileRoute } from "@tanstack/react-router";

// routing for the page
export const Route = createFileRoute("/chat/")({
  // not found component boundary
  notFoundComponent: NotFoundComponent,
  component: () => {
    const contacts = Route.useLoaderData();
    return (
      <ChatPage contacts={contacts} initialSelectedContactId={undefined} />
    );
  },
  loader: async () => {
    const contacts = await getContacts();
    return contacts;
  },
});
