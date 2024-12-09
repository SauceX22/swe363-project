import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NotFoundComponent } from "@/components/not-found";

// routing for the page
export const Route = createFileRoute("/contact-us")({
  component: ContactUsForm,
  // not found component boundary
  notFoundComponent: NotFoundComponent,
});

// validation schema for the form using zod
const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  message: z.string().min(1, { message: "Message is required" }),
});

type FormData = z.infer<typeof schema>;

type EmailResponse = {
  error?: string;
  success?: string;
};

// send the email to the server method
async function sendEmail(data: FormData): Promise<EmailResponse> {
  "use server";

  try {
    // simulate sending an email
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Email sent:", data);

    // 10% error that could happen
    if (Math.random() < 0.1) {
      return { error: "Failed to send email. Please try again." };
    }

    return { success: "Email sent successfully!" };
  } catch (error) {
    return { error: "An unexpected error occurred. Please try again." };
  }
}

export default function ContactUsForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // submission handler
  const onSubmit = async (data: FormData) => {
    try {
      setServerError(null);
      setServerSuccess(null);

      const result = await sendEmail(data);

      if (result.error) {
        setServerError(result.error);
      } else if (result.success) {
        setServerSuccess(result.success);
        reset();
      }
    } catch (error) {
      setServerError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="m-16">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
          <CardDescription>
            Send us a message and we'll get back to you as soon as possible.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                {...register("subject")}
                placeholder="What's this about?"
              />
              {errors.subject && (
                <p className="text-sm text-red-500">{errors.subject.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                {...register("message")}
                placeholder="Your message here..."
                className="min-h-[120px]"
              />
              {errors.message && (
                <p className="text-sm text-red-500">{errors.message.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-4">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
            {serverError && (
              <p className="text-sm text-red-500">{serverError}</p>
            )}
            {serverSuccess && (
              <p className="text-sm text-green-500">{serverSuccess}</p>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
