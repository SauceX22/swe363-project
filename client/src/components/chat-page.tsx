import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMessages, sendMessage } from "@/routers/chat";
import { FileText, Search, Send, Video, ArrowLeft, Info } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Contact, Message } from "@/types";

const placeholderImage = "/src/assets/placeholder.png";

export function ChatPage({
  contacts,
  initialSelectedContactId,
}: {
  contacts: Contact[];
  initialSelectedContactId?: number;
}) {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);
  const [showContactDetails, setShowContactDetails] = useState(false);
  const queryClient = useQueryClient();

  const { data: messages } = useQuery({
    queryKey: ["messages", selectedContact?.id],
    queryFn: () => {
      if (selectedContact?.id) return getMessages(selectedContact.id);
    },
    enabled: !!selectedContact,
  });

  const sendMessageMutation = useMutation({
    mutationFn: ({ chatId, content }: { chatId: number; content: string }) =>
      sendMessage(chatId, content),
    onSuccess: (newMessage) => {
      queryClient.setQueryData(
        ["messages", selectedContact?.id],
        (oldMessages: Message[] | undefined) => [
          ...(oldMessages || []),
          newMessage,
        ],
      );
    },
  });

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
    setShowContactDetails(false);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim() && selectedContact) {
      sendMessageMutation.mutate({
        chatId: selectedContact!.id,
        content: messageInput,
      });
      setMessageInput("");
    }
  };

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const ContactsList = () => (
    <Card className="h-full rounded-none border-0">
      <CardHeader>
        <CardTitle>Chats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative mb-4">
          <Input
            type="search"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
        </div>
        <ScrollArea className="h-[calc(100vh-180px)]">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className={`flex cursor-pointer items-center rounded-lg p-3 hover:bg-accent ${
                selectedContact?.id === contact.id ? "bg-accent" : ""
              }`}
              onClick={() => handleContactSelect(contact)}
            >
              <img
                src={contact.avatar ?? placeholderImage}
                alt={contact.name}
                className="mr-3 h-10 w-10 rounded-full"
              />
              <div>
                <h3 className="font-semibold">{contact.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {contact.lastMessageContent}
                </p>
              </div>
              <span className="ml-auto text-xs text-muted-foreground">
                {contact.lastMessageTime}
              </span>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );

  const ChatArea = () => (
    <Card className="flex h-full flex-col rounded-none border-0">
      <CardHeader className="flex flex-row items-center justify-between">
        {isMobileView && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedContact(null)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <CardTitle>{selectedContact?.name}</CardTitle>
        {isMobileView && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowContactDetails(true)}
          >
            <Info className="h-5 w-5" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea
          ref={scrollAreaRef}
          className="h-[calc(100vh-180px)] pr-4"
          style={{ scrollBehavior: "smooth" }}
        >
          <div className="flex min-h-full flex-col justify-end">
            {messages?.map((message) => (
              <div
                key={message.id}
                className={`mb-4 ${
                  message.contactId === 0 ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block rounded-lg p-2 ${
                    message.contactId === 0
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary"
                  }`}
                >
                  {message.content}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {message.timestamp}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardContent className="border-t">
        <form onSubmit={handleSendMessage} className="flex items-center">
          <Input
            type="text"
            placeholder="Type a message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            className="mr-2 flex-1"
          />
          <Button type="submit" size="icon" disabled={!messageInput.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );

  const ContactDetails = () => (
    <Card className="h-full rounded-none border-0">
      {isMobileView && (
        <CardHeader className="flex flex-row items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowContactDetails(false)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <CardTitle>Contact Details</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <div className="mb-4 text-center">
          <img
            src={selectedContact?.avatar ?? placeholderImage}
            alt={selectedContact?.name}
            className="mx-auto mb-2 h-24 w-24 rounded-full"
          />
          <h2 className="text-xl font-bold">{selectedContact?.name}</h2>
        </div>
        <div className="mb-4">
          <h3 className="mb-2 font-semibold">Phone Number</h3>
          <p>+1 (555) 123-4567</p>
        </div>
        <Tabs defaultValue="files">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
          </TabsList>
          <TabsContent value="files" className="mt-4">
            <div className="flex items-center justify-between rounded p-2 hover:bg-accent">
              <div className="flex items-center">
                <FileText className="mr-2 h-5 w-5 text-blue-500" />
                <span>Document.pdf</span>
              </div>
              <Button size="sm" variant="ghost">
                View
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="images" className="mt-4">
            <div className="grid grid-cols-3 gap-2">
              <img
                src={placeholderImage}
                alt="Image 1"
                className="h-20 w-full rounded object-cover"
              />
              <img
                src={placeholderImage}
                alt="Image 2"
                className="h-20 w-full rounded object-cover"
              />
              <img
                src={placeholderImage}
                alt="Image 3"
                className="h-20 w-full rounded object-cover"
              />
            </div>
          </TabsContent>
          <TabsContent value="videos" className="mt-4">
            <div className="flex items-center justify-between rounded p-2 hover:bg-accent">
              <div className="flex items-center">
                <Video className="mr-2 h-5 w-5 text-red-500" />
                <span>Video.mp4</span>
              </div>
              <Button size="sm" variant="ghost">
                Play
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );

  if (isMobileView) {
    if (showContactDetails) {
      return <ContactDetails />;
    }
    return (
      <div className="h-screen w-full">
        {selectedContact ? <ChatArea /> : <ContactsList />}
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full">
      <div className="w-1/4 border-r">
        <ContactsList />
      </div>
      <div className="w-1/2">
        {selectedContact ? (
          <ChatArea />
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-xl font-semibold text-muted-foreground">
              Select a contact to start chatting
            </p>
          </div>
        )}
      </div>
      <div className="w-1/4 border-l">
        {selectedContact ? (
          <ContactDetails />
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-center text-muted-foreground">
              Select a contact to view details
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
