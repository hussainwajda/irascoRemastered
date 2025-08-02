import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-irasco-midnight text-irasco-white">
      <main>
        {children}
      </main>
    </div>
  );
}; 