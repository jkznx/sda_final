"use client"; // Add this directive at the top for client-side hooks

import React, { useEffect, useState } from 'react';

// Define the Cart interface for TypeScript typing
interface Cart {
  id: string | number;
  // Add other properties that your cart object might have
  // For example:
  // name?: string;
  // price?: number;
  // quantity?: number;
}

const CartsPage: React.FC = () => {
  const [cart, setCart] = useState<Cart[]>([]);

  useEffect(() => {
    fetch('') // You should add your API endpoint here
      .then((res) => res.json())
      .then((data: Cart[]) => setCart(data))
      .catch((error) => console.error('Error fetching cart:', error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Navigation Bar */}
      <nav className="w-full bg-purple-500 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">COE LOTTO</h1>
        <div className="space-x-4">
          <a href="/dashboards/carts" className="hover:text-gray-200 border-b-2 border-white">
            Carts
          </a>
        </div>
        <div className="w-8 h-8 bg-white rounded-full"></div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6 w-full max-w-4xl">
        <div className="bg-gray-200 rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-center">My Carts</h2>
          <div className="grid grid-cols-2 gap-4">
            <ul>
              {cart.map((cartItem) => (
                <li key={cartItem.id}>
                  {/* Add content for each cart item here */}
                  {/* For example: */}
                  {/* {cartItem.name} - ${cartItem.price} */}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartsPage;