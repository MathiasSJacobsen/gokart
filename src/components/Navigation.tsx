"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import React from "react";
import { cn } from "@/lib/utils";

export const Navigation = () => {
  const S1: { title: string; href: string; description?: string }[] = [
    {
      title: "Løp 1",
      href: "/sesong/1/1",
    },
    {
      title: "Løp 2",
      href: "/sesong/1/2",
    },
    {
      title: "Løp 3",
      href: "/sesong/1/3",
    },
    {
      title: "Løp 7",
      href: "/sesong/1/7",
    },
    {
      title: "Løp 8",
      href: "/sesong/1/8",
    },
    {
      title: "Løp 9",
      href: "/sesong/1/9",
    },
  ];
  const S2: { title: string; href: string; description?: string }[] = [
    {
      title: "Løp 1",
      href: "/sesong/2/1",
    },
    {
      title: "Løp 2",
      href: "/sesong/2/2",
    },
    {
      title: "Løp 3",
      href: "/sesong/2/3",
    },
  ];
  return (
    <NavigationMenu className="mx-auto">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Forside
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Sesong 1</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] bg-light gap-3 p-4 md:w-[300px] md:grid-cols-2 lg:w-[400px] ">
              {S1.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Sesong 2</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] bg-light gap-3 p-4 md:w-[300px] md:grid-cols-2 lg:w-[400px] ">
              {S2.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-dark hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          {children && (
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          )}
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
