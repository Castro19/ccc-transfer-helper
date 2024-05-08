import { ReactNode } from "react";
import CombinedNavbar from "./navbar/CombinedNavbar";
type LayoutProps = {
  children: ReactNode;
};
const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div>
      <CombinedNavbar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
