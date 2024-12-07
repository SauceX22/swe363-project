import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useState } from "react";
import { ClerkProvider } from "@clerk/clerk-react";

type ProviderProps = {
  children?: React.ReactNode;
};

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

// required providers for react-query, and other react libraries that need a wrapper around the whole app like theming libraries
const Providers = ({ children }: ProviderProps) => {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: 3,
        },
      },
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        {children}
      </ClerkProvider>
      <TanStackRouterDevtools />
    </QueryClientProvider>
  );
};

export default Providers;
