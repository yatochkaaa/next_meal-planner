"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronLeft, Menu } from "lucide-react";
import { ReactNode, useState } from "react";

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
        className="h-dv fixed top-0 left-0 z-20"
        open={open}
        onOpenChange={setOpen}
      >
        <CollapsibleContent forceMount>
          <div
            className={`bg-background fixed top-0 left-0 h-screen w-64 border p-4 transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
          >
            <div className="flex items-center justify-center">
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
          </div>
        </CollapsibleContent>
      </Collapsible>

      {children}
    </div>
  );
};

export { DashboardLayout };
