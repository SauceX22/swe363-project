import "@/App.css";
import Providers from "@/components/config/providers";
import { Navbar } from "@/components/layout/navbar";

import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => {
    // get path from url
    const isAuthPage = window.location.pathname.includes("/login");

    return (
      <body>
        {!isAuthPage ? <Navbar /> : null}
        <Providers>
          <Outlet />
        </Providers>
      </body>
    );
  },
});
