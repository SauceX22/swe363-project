import { NotFoundComponent } from "@/components/not-found";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUploadThing } from "@/lib/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "@uploadthing/react";
import { UploadIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  generateClientDropzoneAccept,
  generatePermittedFileTypes,
} from "uploadthing/client";
import { z } from "zod";
import { createFoundItemPost } from "@/api/found";

const schema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is too short" })
    .max(100, { message: "Name is too long" }),
  description: z
    .string()
    .min(1, { message: "Description is too short" })
    .max(1000, { message: "Description is too long" }),
  location: z
    .string()
    .min(1, { message: "Building name is too short" })
    .max(100, { message: "Building name is too long" }),
  tag: z
    .string()
    .min(1, { message: "Item Tag is too short" })
    .max(30, { message: "Item Tag is too long" }),
});

type FormData = z.infer<typeof schema>;

// routing for the page
export const Route = createFileRoute("/found/new")({
  component: AddFoundItem,
  // not found component boundary
  notFoundComponent: NotFoundComponent,
});

export default function AddFoundItem() {
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload, routeConfig } = useUploadThing("imageUploader", {
    onClientUploadComplete: (file) => {
      toast.success("uploaded successfully!", {
        id: "file-upload",
      });
    },
    onUploadError: (err) => {
      toast.error("error occurred while uploading", {
        id: "file-upload",
      });
    },
    onUploadBegin: (file) => {
      toast.info("upload has begun for " + file, {
        id: "file-upload",
      });
    },
  });

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      location: "",
      tag: "",
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => setFiles(acceptedFiles),
    accept: generateClientDropzoneAccept(
      generatePermittedFileTypes(routeConfig).fileTypes,
    ),
  });

  async function onSubmit(data: FormData) {
    let fileUrl = "";

    try {
      if (files.length > 0) {
        const uploadedFiles = await startUpload(files);
        fileUrl = uploadedFiles?.[0]?.url || "";
      }

      // Assuming createFoundItemPost is a function that posts the data to the backend
      await createFoundItemPost({
        name: data.name,
        description: data.description,
        tag: data.tag,
        location: data.location,
        image: fileUrl,
      });

      toast.success("Item added successfully");
    } catch (error) {
      toast.error("Error adding item");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200 p-4">
      <Card className="w-full max-w-3xl scale-125 bg-slate-600/90">
        <CardContent className="p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">
            Add Your Item
          </h2>
          <Form {...form}>
            <form
              noValidate
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-6 md:grid-cols-[300px,1fr]"
            >
              <div>
                <Label htmlFor="image-upload" className="text-slate-200">
                  Photo
                </Label>
                <div
                  {...getRootProps()}
                  className="flex aspect-square cursor-pointer items-center justify-center rounded-lg bg-slate-500 text-slate-300 hover:bg-slate-500/90"
                >
                  {files.length > 0 ? (
                    <img
                      src={URL.createObjectURL(files[0])}
                      alt="Preview"
                      className="h-full w-full rounded-lg object-cover"
                    />
                  ) : (
                    <UploadIcon className="h-8 w-8" />
                  )}
                  <input {...getInputProps()} />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Item Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Item Description"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Building Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Building Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tag"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Tag</FormLabel>
                      <FormControl>
                        <Input placeholder="Item Tag" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="mt-2">
                  Post Item
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
