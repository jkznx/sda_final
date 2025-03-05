// app/dashboards/carts/page.tsx
'use client'

import React, { useState, useEffect } from 'react'
import wait from "@/app/@lib/wait" // Assuming this is your utility function

export default function Carts() {
  const [cartItems, setCartItems] = useState<{ name: string; price: number }[]>([])

  useEffect(() => {
    const loadInitialData = async () => {
      // Simulate loading delay
      await wait(5000)
      
      // Add initial item after delay
      addItemToCart({ name: 'Lottery Ticket', price: 10 })
    }

    loadInitialData()
  }, []) // Empty dependency array means this runs once on mount

  const addItemToCart = (item: { name: string; price: number }): void => {
    setCartItems([...cartItems, item])
  }

  const removeItemFromCart = (itemToRemove: { name: string; price: number }): void => {
    setCartItems(cartItems.filter(item => item !== itemToRemove))
  }

  const totalCost = cartItems.reduce((total, item) => total + (item.price || 0), 0)

  return (
    <>
      <h1 className="text-2xl font-bold">Carts</h1>
      <div className="mt-6">
        <ul className="list-disc pl-5">
          {cartItems.map((item: { name: string; price: number }, index: number) => (
            <li key={index} className="mb-2 flex items-center justify-between">
              <span>{item.name} - ${item.price}</span>
              <button 
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                onClick={() => removeItemFromCart(item)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        {cartItems.length === 0 && (
          <p className="mt-4 text-gray-500">Your cart is empty</p>
        )}
        <h2 className="text-xl font-semibold mt-4">Total: ${totalCost}</h2>
        <button 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => alert('Proceeding to checkout')}
        >
          Checkout
        </button>
      </div>
    </>
  )
}