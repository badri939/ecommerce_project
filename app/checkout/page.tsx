"use client";

import { useCart } from "@/context/CardContext";
import { useState } from "react";
import { withAuth } from "@/context/AuthContext";

export default withAuth(function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const totalCost = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    clearCart();
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold text-green-600">Thank you for your purchase!</h1>
        <p className="text-lg mt-4">Your order has been placed successfully.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">Checkout</h1>

      <div className="mb-6">
        <h2 className="text-2xl font-bold">Order Summary</h2>
        <ul className="space-y-4 mt-4">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between items-center border-b pb-2">
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-sm text-gray-600">Price: ₹{item.price}</p>
              </div>
              <p className="text-lg font-bold">₹{item.price * item.quantity}</p>
            </li>
          ))}
        </ul>
        <h3 className="text-xl font-bold mt-4">Total: ₹{totalCost}</h3>
      </div>

      <form onSubmit={handleCheckout} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Payment Method</label>
          <select
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="credit-card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="cod">Cash on Delivery</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Place Order
        </button>
      </form>
    </div>
  );
});