"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { AlertDialogProvider } from "@/components/ui/alert-dialog-provider";

const queryClient = new QueryClient();

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="systeme"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster />
        <AlertDialogProvider />
      </NextThemesProvider>
    </QueryClientProvider>
  );
};

export { Providers };
