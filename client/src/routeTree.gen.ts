/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from "@tanstack/react-router";

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as NotFoundImport } from "./routes/not-found";
import { Route as MainPageImport } from "./routes/mainPage";
import { Route as ContactUsImport } from "./routes/contact-us";
import { Route as MarketIndexImport } from "./routes/market/index";
import { Route as FoundIndexImport } from "./routes/found/index";
import { Route as MarketItemIdImport } from "./routes/market/$itemId";
import { Route as FoundItemIdImport } from "./routes/found/$itemId";

// Create Virtual Routes

const MyitemsLazyImport = createFileRoute("/myitems")();
const LoginLazyImport = createFileRoute("/login")();

// Create/Update Routes

const MyitemsLazyRoute = MyitemsLazyImport.update({
  id: "/myitems",
  path: "/myitems",
  getParentRoute: () => rootRoute,
} as any).lazy(() => import("./routes/myitems.lazy").then((d) => d.Route));

const LoginLazyRoute = LoginLazyImport.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => rootRoute,
} as any).lazy(() => import("./routes/login.lazy").then((d) => d.Route));

const NotFoundRoute = NotFoundImport.update({
  id: "/not-found",
  path: "/not-found",
  getParentRoute: () => rootRoute,
} as any);

const MainPageRoute = MainPageImport.update({
  id: "/mainPage",
  path: "/mainPage",
  getParentRoute: () => rootRoute,
} as any);

const ContactUsRoute = ContactUsImport.update({
  id: "/contact-us",
  path: "/contact-us",
  getParentRoute: () => rootRoute,
} as any);

const IndexLazyRoute = IndexLazyImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => rootRoute,
} as any);

const MarketIndexRoute = MarketIndexImport.update({
  id: "/market/",
  path: "/market/",
  getParentRoute: () => rootRoute,
} as any);

const FoundIndexRoute = FoundIndexImport.update({
  id: "/found/",
  path: "/found/",
  getParentRoute: () => rootRoute,
} as any);

const MarketItemIdRoute = MarketItemIdImport.update({
  id: "/market/$itemId",
  path: "/market/$itemId",
  getParentRoute: () => rootRoute,
} as any);

const FoundItemIdRoute = FoundItemIdImport.update({
  id: "/found/$itemId",
  path: "/found/$itemId",
  getParentRoute: () => rootRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      id: "/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    "/contact-us": {
      id: "/contact-us";
      path: "/contact-us";
      fullPath: "/contact-us";
      preLoaderRoute: typeof ContactUsImport;
      parentRoute: typeof rootRoute;
    };
    "/not-found": {
      id: "/not-found";
      path: "/not-found";
      fullPath: "/not-found";
      preLoaderRoute: typeof NotFoundImport;
      parentRoute: typeof rootRoute;
    };
    "/contact-us": {
      id: "/contact-us";
      path: "/contact-us";
      fullPath: "/contact-us";
      preLoaderRoute: typeof ContactUsImport;
      parentRoute: typeof rootRoute;
    };
    "/mainPage": {
      id: "/mainPage";
      path: "/mainPage";
      fullPath: "/mainPage";
      preLoaderRoute: typeof MainPageImport;
      parentRoute: typeof rootRoute;
    };
    "/not-found": {
      id: "/not-found";
      path: "/not-found";
      fullPath: "/not-found";
      preLoaderRoute: typeof NotFoundImport;
      parentRoute: typeof rootRoute;
    };
    "/login": {
      id: "/login";
      path: "/login";
      fullPath: "/login";
      preLoaderRoute: typeof LoginLazyImport;
      parentRoute: typeof rootRoute;
    };
    "/myitems": {
      id: "/myitems";
      path: "/myitems";
      fullPath: "/myitems";
      preLoaderRoute: typeof MyitemsLazyImport;
      parentRoute: typeof rootRoute;
    };
    "/found/$itemId": {
      id: "/found/$itemId";
      path: "/found/$itemId";
      fullPath: "/found/$itemId";
      preLoaderRoute: typeof FoundItemIdImport;
      parentRoute: typeof rootRoute;
    };
    "/market/$itemId": {
      id: "/market/$itemId";
      path: "/market/$itemId";
      fullPath: "/market/$itemId";
      preLoaderRoute: typeof MarketItemIdImport;
      parentRoute: typeof rootRoute;
    };
    "/found/": {
      id: "/found/";
      path: "/found";
      fullPath: "/found";
      preLoaderRoute: typeof FoundIndexImport;
      parentRoute: typeof rootRoute;
    };
    "/market/": {
      id: "/market/";
      path: "/market";
      fullPath: "/market";
      preLoaderRoute: typeof MarketIndexImport;
      parentRoute: typeof rootRoute;
    };
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  "/": typeof IndexLazyRoute;
  "/contact-us": typeof ContactUsRoute;
  "/mainPage": typeof MainPageRoute;
  "/not-found": typeof NotFoundRoute;
  "/login": typeof LoginLazyRoute;
  "/myitems": typeof MyitemsLazyRoute;
  "/found/$itemId": typeof FoundItemIdRoute;
  "/market/$itemId": typeof MarketItemIdRoute;
  "/found": typeof FoundIndexRoute;
  "/market": typeof MarketIndexRoute;
}

export interface FileRoutesByTo {
  "/": typeof IndexLazyRoute;
  "/contact-us": typeof ContactUsRoute;
  "/mainPage": typeof MainPageRoute;
  "/not-found": typeof NotFoundRoute;
  "/login": typeof LoginLazyRoute;
  "/myitems": typeof MyitemsLazyRoute;
  "/found/$itemId": typeof FoundItemIdRoute;
  "/market/$itemId": typeof MarketItemIdRoute;
  "/found": typeof FoundIndexRoute;
  "/market": typeof MarketIndexRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  "/": typeof IndexLazyRoute;
  "/contact-us": typeof ContactUsRoute;
  "/mainPage": typeof MainPageRoute;
  "/not-found": typeof NotFoundRoute;
  "/login": typeof LoginLazyRoute;
  "/myitems": typeof MyitemsLazyRoute;
  "/found/$itemId": typeof FoundItemIdRoute;
  "/market/$itemId": typeof MarketItemIdRoute;
  "/found/": typeof FoundIndexRoute;
  "/market/": typeof MarketIndexRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths:
    | "/"
    | "/contact-us"
    | "/mainPage"
    | "/not-found"
    | "/login"
    | "/myitems"
    | "/found/$itemId"
    | "/market/$itemId"
    | "/found"
    | "/market";
  fileRoutesByTo: FileRoutesByTo;
  to:
    | "/"
    | "/contact-us"
    | "/mainPage"
    | "/not-found"
    | "/login"
    | "/myitems"
    | "/found/$itemId"
    | "/market/$itemId"
    | "/found"
    | "/market";
  id:
    | "__root__"
    | "/"
    | "/contact-us"
    | "/mainPage"
    | "/not-found"
    | "/login"
    | "/myitems"
    | "/found/$itemId"
    | "/market/$itemId"
    | "/found/"
    | "/market/";
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute;
  ContactUsRoute: typeof ContactUsRoute;
  MainPageRoute: typeof MainPageRoute;
  NotFoundRoute: typeof NotFoundRoute;
  LoginLazyRoute: typeof LoginLazyRoute;
  MyitemsLazyRoute: typeof MyitemsLazyRoute;
  FoundItemIdRoute: typeof FoundItemIdRoute;
  MarketItemIdRoute: typeof MarketItemIdRoute;
  FoundIndexRoute: typeof FoundIndexRoute;
  MarketIndexRoute: typeof MarketIndexRoute;
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ContactUsRoute: ContactUsRoute,
  NotFoundRoute: NotFoundRoute,
  LoginLazyRoute: LoginLazyRoute,
  MyitemsLazyRoute: MyitemsLazyRoute,
  FoundItemIdRoute: FoundItemIdRoute,
  MarketItemIdRoute: MarketItemIdRoute,
  FoundIndexRoute: FoundIndexRoute,
  MarketIndexRoute: MarketIndexRoute,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/contact-us",
        "/not-found",
        "/login",
        "/myitems",
        "/found/$itemId",
        "/market/$itemId",
        "/found/",
        "/market/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/contact-us": {
      "filePath": "contact-us.tsx"
    },
    "/not-found": {
      "filePath": "not-found.tsx"
    },
    "/contact-us": {
      "filePath": "contact-us.tsx"
    },
    "/not-found": {
      "filePath": "not-found.tsx"
    },
    "/login": {
      "filePath": "login.lazy.tsx"
    },
    "/myitems": {
      "filePath": "myitems.lazy.tsx"
    },
    "/found/$itemId": {
      "filePath": "found/$itemId.tsx"
    },
    "/market/$itemId": {
      "filePath": "market/$itemId.tsx"
    },
    "/found/": {
      "filePath": "found/index.tsx"
    },
    "/market/": {
      "filePath": "market/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
