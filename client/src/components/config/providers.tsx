import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useState } from "react";

type ProviderProps = {
  children?: React.ReactNode;
};

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
      {children}
      <TanStackRouterDevtools />
    </QueryClientProvider>
  );
};

export default Providers;
