import { ReactNode } from "react";
import CombinedNavbar from "./navbar/CombinedNavbar";
import { Toaster } from "@/components/ui/toaster";

type LayoutProps = {
  children: ReactNode;
};
const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div>
      <CombinedNavbar />
      <div>{children}</div>
      <Toaster />
    </div>
  );
};

export default Layout;
