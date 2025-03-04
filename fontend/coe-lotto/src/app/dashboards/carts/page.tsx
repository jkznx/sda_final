<<<<<<< HEAD
import wait from "@/app/@lib/wait";

export default async function Carts() {
  await wait(5000);
=======
"use client";

import React, { useState, useEffect } from 'react';


import CartLayout from './layout';

export default function Carts() {
  const [cartItems, setCartItems] = useState<{ name: string; price: number }[]>([]);  
  useEffect(() => {
    // Example of adding an item to the cart
    addItemToCart({ name: 'Lottery Ticket', price: 10 });
  }, []);


  
const addItemToCart = (item: { name: string; price: number }): void => {


    setCartItems([...cartItems, item]);
  };

const removeItemFromCart = (itemToRemove: { name: string; price: number }): void => {


    setCartItems(cartItems.filter(item => item !== itemToRemove));
  };

const totalCost = cartItems.reduce((total, item) => total + (item.price || 0), 0);


>>>>>>> main
  return (
    <CartLayout>
      <h1 className="text-2xl font-bold">Carts</h1>

      <ul className="list-disc pl-5">

{cartItems.map((item: { name: string; price: number }, index: number) => (

          <li key={index}>
            {item.name} - ${item.price}
            <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => removeItemFromCart(item)}>Remove</button>

          </li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold">Total: ${totalCost}</h2>

      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => alert('Proceeding to checkout')}>Checkout</button>

    </CartLayout>
  ); 
}
