"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { customErrorMap } from "@/lib/customErrorMap";
import { Avatar } from "@radix-ui/react-avatar";
import { DropdownMenu, Separator } from "@radix-ui/react-dropdown-menu";
import {
  Apple,
  Boxes,
  ChevronDown,
  ChevronLeft,
  LogOut,
  Menu,
  Ruler,
  Utensils,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import z from "zod/v3";
import { Session } from "next-auth";
import { useSignOut } from "@/app/(auth)/sign-in/_services/use-sign-in-mutations";
import { Role } from "$/generated/prisma";

z.setErrorMap(customErrorMap);

interface RouteGroupType {
  group: string;
  items: { label: string; href: string; icon: ReactNode }[];
}

const ROUTE_GROUPS: RouteGroupType[] = [
  {
    group: "Foods Management",
    items: [
      {
        label: "Foods",
        href: "/admin/foods-management/foods",
        icon: <Apple className="mr-2 size-3" />,
      },
      {
        label: "Categories",
        href: "/admin/foods-management/categories",
        icon: <Boxes className="mr-2 size-3" />,
      },
      {
        label: "Serving Units",
        href: "/admin/foods-management/serving-units",
        icon: <Ruler className="mr-2 size-3" />,
      },
    ],
  },
  {
    group: "Meals Management",
    items: [
      {
        label: "Meals",
        href: "/client",
        icon: <Utensils className="mr-2 size-3" />,
      },
    ],
  },
];

type RouteGroupProps = RouteGroupType;

const RouteGroup = ({ group, items }: RouteGroupProps) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <Button
          className="text-foreground/80 flex w-full justify-between font-normal"
          variant="ghost"
        >
          {group}
          <div className={`transition-transform ${open ? "rotate-180" : ""}`}>
            <ChevronDown />
          </div>
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent forceMount>
        <motion.div
          className={`flex flex-col gap-2 ${!open ? "pointer-events-none" : ""}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {items.map(({ label, href, icon }) => (
            <Button
              className="w-full justify-start font-normal"
              variant="link"
              asChild
              key={href}
            >
              <Link
                className={`flex items-center rounded-md px-5 py-1 transition-all ${
                  pathname === href
                    ? "bg-foreground/10 hover:bg-foreground/5"
                    : "hover:bg-foreground/10"
                }`}
                href={href}
              >
                {icon}
                <span className="text-sm">{label}</span>
              </Link>
            </Button>
          ))}
        </motion.div>
      </CollapsibleContent>
    </Collapsible>
  );
};

type DashboardLayoutProps = {
  children: ReactNode;
  session: Session;
};

const DashboardLayout = ({ children, session }: DashboardLayoutProps) => {
  const [open, setOpen] = useState(false);
  const signOutMutation = useSignOut();
  const userRole = session.user.role;

  const filteredRouteGroups = ROUTE_GROUPS.filter((group) => {
    if (userRole === Role.ADMIN) {
      return group.group === "Foods Management";
    } else {
      return group.group === "Meals Management";
    }
  });

  const handleLogout = () => {
    signOutMutation.mutate();
  };

  return (
    <div className="flex">
      <div className="bg-background fixed z-10 flex h-13 w-screen items-center justify-between border px-2">
        <Collapsible className="h-full" open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger className="m-2" asChild>
            <Button size="icon" variant="outline">
              <Menu />
            </Button>
          </CollapsibleTrigger>
        </Collapsible>

        <div className="flex">
          <ThemeToggle />

          {session && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex h-9 items-center gap-2 px-2"
                >
                  <Avatar className="size-8">
                    <AvatarFallback>{session.user.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline">{session.user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="flex items-center gap-3 px-2 py-1.5">
                  <Avatar className="size-10">
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="text-sm font-medium">{session.user.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {session.user.email}
                    </p>
                  </div>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                  <LogOut className="size-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      <Collapsible
        className="fixed top-0 left-0 z-20 h-dvh"
        open={open}
        onOpenChange={setOpen}
      >
        <CollapsibleContent forceMount>
          <div
            className={`bg-background fixed top-0 left-0 h-screen w-64 border p-4 transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold">Admin Dashboard</h1>

              <CollapsibleTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  <ChevronLeft />
                </Button>
              </CollapsibleTrigger>
            </div>

            <Separator className="my-2" />

            <div className="mt-4">
              {filteredRouteGroups.map((routeGroup) => (
                <RouteGroup key={routeGroup.group} {...routeGroup} />
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <main
        className={`transition-margin mt-13 flex-1 p-4 duration-300 ${open ? "ml-64" : "ml-0"}`}
      >
        {children}
      </main>
    </div>
  );
};

export { DashboardLayout };
