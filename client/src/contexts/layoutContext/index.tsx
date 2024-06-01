import { useState, useContext, createContext, ReactNode } from "react";

type LayoutContextType = {
  isSidebarVisible: boolean;
  handleSidebarVisibility: (isVisible: boolean) => void;
};

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

type LayoutProviderProps = {
  children: ReactNode;
};

export const LayoutProvider = ({
  children,
}: LayoutProviderProps): JSX.Element => {
  // Layout
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const handleSidebarVisibility = (isVisible: boolean) => {
    setIsSidebarVisible(isVisible);
  };

  return (
    <LayoutContext.Provider
      value={{ isSidebarVisible, handleSidebarVisibility }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = (): LayoutContextType => {
  const layoutContext = useContext(LayoutContext);
  if (!layoutContext) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return layoutContext;
};
