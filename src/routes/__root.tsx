import "../App.css";
import Providers from "../components/config/providers";
import "../index.css";

import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <div className="flex gap-2 p-2">
          <Link to="/" className="[&.active]:text-orange-500">
            Home
          </Link>
        </div>
        <hr />
        <Providers>
          <Outlet />
        </Providers>
        <TanStackRouterDevtools />
      </>
    );
  },
});
