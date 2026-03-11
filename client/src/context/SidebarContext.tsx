'use client';

import { createContext, useState } from 'react';

interface SidebarContextType {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export const SidebarContext = createContext<SidebarContextType>({
  isCollapsed: false,
  toggleSidebar: () => {},
});

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        toggleSidebar: () => setIsCollapsed((prev) => !prev),
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};