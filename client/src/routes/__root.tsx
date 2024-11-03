import "@/App.css";
import Providers from "@/components/config/providers";
import { Navbar } from "@/components/layout/navbar";

import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => {
    return (
      <body>
        <Navbar />
        <main className="px-64 py-8">
          <Providers>
            <Outlet />
          </Providers>
        </main>
      </body>
    );
  },
});
