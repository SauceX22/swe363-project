import { useState } from "react";
import { Link, useRouter, type LinkProps } from "@tanstack/react-router";
import { MenuIcon, XIcon, ChevronDownIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCookie, setCookie } from "@/lib/utils";

// application's navbar
export function Navbar() {
  // track state for mobile sheet dropdown
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  function handleSignOut() {
    // set the cookie if isLoggedIn is false
    setCookie("isLoggedIn", "false");
    router.navigate({
      to: "/",
    });
  }

  return (
    <nav className="select-none bg-primary shadow-md">
      <div className="mx-auto max-w-[110rem] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <img
                  className="mr-2 h-8 w-8 transition-transform duration-200 ease-in-out hover:scale-105"
                  src="/logo.svg"
                  alt="Mafqood Logo"
                />
                <span className="text-xl font-bold text-gray-800 transition-opacity duration-300 ease-in-out">
                  Mafqood
                </span>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink to="/found">Found Items</NavLink>
                <NavLink to="/market">KFUPM Market</NavLink>
                <NavLink to="/found/new">Post Lost & Found Item</NavLink>
                <NavLink to="/myitems">My Items</NavLink>
                <NavLink to="/chat">Chat</NavLink>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {getCookie("isLoggedIn") === "true" ? (
                <ProfileDropdown handleSignOut={handleSignOut} />
              ) : (
                <Link
                  to="/login"
                  className={buttonVariants({
                    variant: "secondary",
                  })}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition-colors duration-200 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XIcon className="block h-6 w-6 transition-transform duration-200 ease-in-out" />
              ) : (
                <MenuIcon className="block h-6 w-6 transition-transform duration-200 ease-in-out" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out md:hidden ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          <NavLink to="/found" mobile>
            Found Items
          </NavLink>
          <NavLink to="/market" mobile>
            KFUPM Market
          </NavLink>
          <NavLink to="/found/new" mobile>
            Post Lost & Found Item
          </NavLink>
          <NavLink to="/myitems" mobile>
            My Items
          </NavLink>
          <NavLink to="/chat" mobile>
            Chat
          </NavLink>
        </div>
        <div className="border-t border-gray-200 pb-3 pt-4">
          <div className="flex items-center px-5">
            <div className="flex-shrink-0">
              <Avatar>
                <AvatarImage src="/placeholder.svg" alt="User Avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-gray-800">
                John Doe
              </div>
              <div className="text-sm font-medium text-gray-500">
                john@example.com
              </div>
            </div>
          </div>
          <div className="mt-3 space-y-1 px-2">
            <Link
              to="/myitems"
              className="block rounded-md px-3 py-2 text-base font-medium text-secondary-foreground transition-colors duration-200 ease-in-out"
            >
              Your Posted Items
            </Link>
            <Button
              className="block rounded-md px-3 py-2 text-base font-medium transition-colors duration-200 ease-in-out hover:bg-gray-100 hover:text-gray-800"
              onClick={handleSignOut}
            >
              Sign out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

// general navigation link for the header, to run on desktop/mobile
function NavLink({
  to,
  children,
  mobile = false,
}: {
  to: LinkProps["to"];
  children: React.ReactNode;
  mobile?: boolean;
}) {
  const desktopClasses = "px-3 py-2 rounded-md text-sm font-medium";
  const mobileClasses = "block px-3 py-2 rounded-md text-base font-medium";

  return (
    <Link
      to={to}
      className={`text-primary-foreground transition-colors duration-200 ease-in-out hover:bg-primary/80 hover:text-primary-foreground/80 hover:underline ${mobile ? mobileClasses : desktopClasses}`}
    >
      {children}
    </Link>
  );
}

// user profile dropdown menu for the navigation links
function ProfileDropdown({ handleSignOut }: { handleSignOut: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center bg-secondary transition-colors duration-200 ease-in-out hover:bg-secondary/80"
        >
          <Avatar className="mr-2 h-8 w-8">
            <AvatarImage src="/placeholder.svg" alt="User Avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-gray-700">John Doe</span>
          <ChevronDownIcon className="ml-1 h-4 w-4 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to="/myitems" className="flex w-full">
            Your Posted Items
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button className="flex w-full" onClick={handleSignOut}>
            Sign out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
