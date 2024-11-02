import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

type ProviderProps = {
  children?: React.ReactNode;
};

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
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Providers;
