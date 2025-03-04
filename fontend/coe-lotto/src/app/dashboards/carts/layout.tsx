import React from 'react';

const CartLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="container mx-auto p-4">
      <header className="mb-4">
        <h1 className="text-2xl font-bold">Cart</h1>
      </header>
      <main>{children}</main>
      <footer className="mt-4">
        <p className="text-sm text-gray-600">Footer content here</p>
      </footer>
    </div>
  );
};


export default CartLayout;
