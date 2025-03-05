'use client';

import { useState, useEffect } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';

interface CartItem {
  id: string;
  lotto6number: string;
  lotto4number: string;
  price: number;
  count: number;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = sessionStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems((prevItems) => {
      const updatedCart = prevItems.map((item) =>
        item.id === id ? { ...item, count: newQuantity } : item
      );

      sessionStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.filter((item) => item.id !== id);
      sessionStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.count, 0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-purple-600">My Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center mt-6">Your cart is empty</p>
        ) : (
          <div className="mt-6 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                <div>
                  <p className="font-medium text-lg text-gray-700">Number: {item.lotto6number}</p>
                  <p className="text-sm text-gray-600">Price: ${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.count - 1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="text-sm">{item.count}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.count + 1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-gray-700">Total:</span>
            <span className="text-lg font-bold text-gray-700">${totalPrice.toFixed(2)}</span>
          </div>
          <button className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
