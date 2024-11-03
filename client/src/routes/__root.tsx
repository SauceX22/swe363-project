import "@/App.css";
import Providers from "@/components/config/providers";

import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => {
    return (
      <body>
        <div className="flex gap-2 p-2">
          <Link to="/" className="[&.active]:text-orange-500">
            Home
          </Link>
        </div>
        <hr />
        <main>
          <Providers>
            <Outlet />
          </Providers>
        </main>
      </body>
    );
  },
});
