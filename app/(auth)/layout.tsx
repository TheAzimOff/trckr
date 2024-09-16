import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='w-screen h-screen flex items-center content-center'>
      {children}
    </div>
  );
};
export default Layout;
