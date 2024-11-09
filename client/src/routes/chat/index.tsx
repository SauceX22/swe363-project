import { ChatPage } from "@/components/chat-page";
import { NotFoundComponent } from "@/components/not-found";
import { getContacts } from "@/routers/chat";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/chat/")({
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
