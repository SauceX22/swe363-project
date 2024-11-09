import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMessages, sendMessage } from "@/routers/chat";
import { FileText, Search, Send, Video } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Contact, Message } from "@/types";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";

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
  const queryClient = useQueryClient();

  // query for messages
  const { data: messages } = useQuery({
    queryKey: ["messages", selectedContact?.id],
    queryFn: () => {
      if (selectedContact?.id) return getMessages(selectedContact.id);
    },
    enabled: !!selectedContact,
  });

  // mutation for sending a message
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

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-full w-full select-none border"
    >
      <ResizablePanel
        defaultSize={25}
        minSize={20}
        maxSize={30}
        className="bg-primary text-primary-foreground"
      >
        <Card className="h-full rounded-none border-0 bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle>Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <Input
                type="search"
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-primary-foreground pl-10 text-primary"
              />
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            </div>
            <ScrollArea className="h-[calc(100vh-227px)]">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className={`flex cursor-pointer items-center rounded-lg p-3 hover:bg-primary-foreground/10 ${
                    selectedContact?.id === contact.id
                      ? "bg-primary-foreground/20"
                      : ""
                  }`}
                  onClick={() => handleContactSelect(contact)}
                >
                  <img
                    src={contact.avatar ?? "/src/assets/placeholder.png"}
                    alt={contact.name}
                    className="mr-3 h-10 w-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{contact.name}</h3>
                    <p className="text-sm text-primary-foreground/70">
                      {contact.lastMessageContent}
                    </p>
                  </div>
                  <span className="ml-auto text-xs text-primary-foreground/70">
                    {contact.lastMessageTime}
                  </span>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50} minSize={30} maxSize={60}>
        <Card className="flex h-full flex-col rounded-none border-0">
          {selectedContact && messages ? (
            <>
              <CardHeader>
                <CardTitle>{selectedContact.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden">
                <ScrollArea
                  ref={scrollAreaRef}
                  className="h-[calc(100vh-227px)] pr-4"
                  style={{ scrollBehavior: "smooth" }}
                >
                  <div className="flex min-h-full flex-col justify-end">
                    {messages?.map((message, index) => (
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
              <CardContent className="border-t border-gray-200">
                <form
                  onSubmit={handleSendMessage}
                  className="flex items-center"
                >
                  <Input
                    type="text"
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="mr-2 flex-1"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!messageInput.trim()}
                  >
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send message</span>
                  </Button>
                </form>
              </CardContent>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
              <p className="text-xl font-semibold">
                Select a contact to start chatting
              </p>
            </div>
          )}
        </Card>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        defaultSize={25}
        minSize={20}
        maxSize={30}
        className="bg-primary text-primary-foreground"
      >
        <Card className="h-full rounded-none border-0 bg-primary text-primary-foreground">
          {selectedContact ? (
            <>
              <CardHeader>
                <CardTitle>Contact Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 text-center">
                  <img
                    src={
                      selectedContact?.avatar ?? "/src/assets/placeholder.png"
                    }
                    alt={selectedContact?.name}
                    className="mx-auto mb-2 h-24 w-24 rounded-full"
                  />
                  <h2 className="text-xl font-bold">{selectedContact?.name}</h2>
                </div>
                <div className="mb-4">
                  <h3 className="mb-2 font-semibold">Phone Number</h3>
                  <p className="text-primary-foreground">+1 (555) 123-4567</p>
                </div>
                <Tabs defaultValue="files" className="text-primary-foreground">
                  <TabsList className="grid w-full grid-cols-3 bg-primary-foreground/40">
                    <TabsTrigger
                      value="files"
                      className="data-[state=active]:bg-primary-foreground"
                    >
                      Files
                    </TabsTrigger>
                    <TabsTrigger
                      value="images"
                      className="data-[state=active]:bg-primary-foreground"
                    >
                      Images
                    </TabsTrigger>
                    <TabsTrigger
                      value="videos"
                      className="data-[state=active]:bg-primary-foreground"
                    >
                      Videos
                    </TabsTrigger>
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
            </>
          ) : (
            <CardContent className="flex h-full items-center justify-center">
              <p className="text-center text-muted-foreground">
                Select a contact to view details
              </p>
            </CardContent>
          )}
        </Card>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
