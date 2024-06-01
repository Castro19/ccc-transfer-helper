import { ReactNode } from "react";
import Navbar from "./Navbar";
import { Toaster } from "@/components/ui/toaster";

type LayoutProps = {
  children: ReactNode;
};
const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
      <Toaster />
    </div>
  );
};

export default Layout;
