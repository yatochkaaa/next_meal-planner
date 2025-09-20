import { ReactNode } from "react";
import { DashboardLayout } from "@/app/(dashboard)/_components/dashboard-layout";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default Layout;
