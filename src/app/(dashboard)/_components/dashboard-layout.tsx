"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@radix-ui/react-dropdown-menu";
import {
  Apple,
  Boxes,
  ChevronDown,
  ChevronLeft,
  Menu,
  Ruler,
  Utensils,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";

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

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <Button size="icon" variant="outline">
            <Menu />
          </Button>
        </CollapsibleTrigger>
      </Collapsible>

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
              {ROUTE_GROUPS.map((routeGroup) => (
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
