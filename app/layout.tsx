"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider, useCart } from "@/context/CardContext";
import Link from "next/link";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <div className="fixed top-4 right-4 bg-white shadow-lg p-4 rounded-lg z-50">
            <CartSummary />
          </div>
          {children}
        </body>
      </html>
    </CartProvider>
  );
}

function ClearCartButton() {
  const { clearCart } = useCart();

  return (
    <button
      onClick={clearCart}
      className="bg-red-500 text-white px-4 py-2 rounded mt-2"
    >
      Clear Cart
    </button>
  );
}

function CartSummary() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      <p className="text-lg font-bold">Cart: {totalItems} items</p>
      <ClearCartButton />
    </div>
  );
}
