import React, { ReactNode } from 'react';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold">Personal Blog Platform</h1>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
