"use client"

import React, { useState } from "react";
import "@/app/globals.css";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import DarkModeToggle from "./DarkModeToggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import HeaderCharacters from "@/components/HeaderCharacters";

function BarsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

type ListItemProps = React.ComponentPropsWithoutRef<"a"> & {
  title: string;
  href: string; 
};

const ListItem = React.forwardRef<React.ElementRef<"a">, ListItemProps>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-bold leading-none">{title}</div>
            {children && (
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {children}
              </p>
            )}
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

const MobileListItem = React.forwardRef<React.ElementRef<"a">, ListItemProps>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-bold leading-none">{title}</div>
          {children && (
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          )}
        </Link>
      </li>
    );
  }
);
MobileListItem.displayName = "MobileListItem";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-background shadow text-mainColor">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <DarkModeToggle />

          <Link href="/" className="flex items-center">
            <Image
              src="/logos/RickMortyLogoBlack.png"
              alt="Rick and Morty Logo"
              width={360}
              height={360}
              quality={100}
              className="object-contain w-14 h-14 block dark:hidden"
            />
            <Image
              src="/logos/RickMortyLogoWhite.png"
              alt="Rick and Morty Logo"
              width={360}
              height={360}
              quality={100}
              className="object-contain w-14 h-14 hidden dark:block"
            />
          </Link>
          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-4">
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(navigationMenuTriggerStyle(), "font-bold")}
                  >
                    Origins
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                      <ListItem href="/characters/origin/earth" title="Earth">
                        Explore characters hailing from Earth, our home planet.
                      </ListItem>
                      <ListItem href="/characters/origin/abadango" title="Abadango">
                        Discover the mysterious culture of Abadango.
                      </ListItem>
                      <ListItem href="/characters/origin/citadel" title="Citadel of Ricks">
                        Meet the diverse Ricks from the sprawling Citadel.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/episodes"
                      className={cn(navigationMenuTriggerStyle(), "font-bold")}
                    >
                      Episodes
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(navigationMenuTriggerStyle(), "font-bold")}
                  >
                    Characters
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="p-4 w-[500px]">
                      <HeaderCharacters />
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
              <NavigationMenuViewport />
              <NavigationMenuIndicator />
            </NavigationMenu>
          </div>
          <div className="flex md:hidden">
            <button onClick={toggleMobileMenu} className="p-2 rounded-md">
              <BarsIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* mobile navigation menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white dark:bg-neutral-800 shadow">
          <div className="px-4 py-2 border-b border-gray-200 dark:border-neutral-600">
            <h2 className="text-lg font-bold">Explore Characters</h2>
          </div>
          <HeaderCharacters />
          <ul className="flex flex-col space-y-2 px-4 py-2">
            <MobileListItem
              onClick={closeMobileMenu}
              href="/characters/origin/earth"
              title="Earth"
            >
              Explore characters hailing from Earth, our home planet.
            </MobileListItem>
            <MobileListItem
              onClick={closeMobileMenu}
              href="/characters/origin/abadango"
              title="Abadango"
            >
              Discover the mysterious culture of Abadango.
            </MobileListItem>
            <MobileListItem
              onClick={closeMobileMenu}
              href="/characters/origin/citadel"
              title="Citadel of Ricks"
            >
              Meet the diverse Ricks from the sprawling Citadel.
            </MobileListItem>
            <li>
              <Link
                onClick={closeMobileMenu}
                href="/episodes"
                className={cn(navigationMenuTriggerStyle(), "font-bold", "block p-3")}
              >
                Episodes
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}