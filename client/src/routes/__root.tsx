import "@/App.css";
import Providers from "@/components/config/providers";
import { Navbar } from "@/components/layout/navbar";
import { NotFoundComponent } from "@/components/not-found";

import {
  createRootRoute,
  Outlet,
  ScrollRestoration,
} from "@tanstack/react-router";

// root routing setup for all pages
export const Route = createRootRoute({
  // not found component boundary
  notFoundComponent: NotFoundComponent,
  component: () => {
    // get path from url
    const isAuthPage = window.location.pathname.includes("/login");

    return (
      <body>
        {/* if it's the login page dont show the navbar */}
        {!isAuthPage ? <Navbar /> : null}
        <Providers>
          {/* used to restore scroll position to the top of the page in SPA apps */}
          <ScrollRestoration />
          {/* where the routes are actually rendered */}
          <Outlet />
        </Providers>
      </body>
    );
  },
});
