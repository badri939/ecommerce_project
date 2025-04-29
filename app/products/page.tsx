"use client"
import Image from "next/image";
import Link from "next/link";
import products from "@/data/products";
import { useCart } from "@/context/CardContext";
import { useState } from "react";

export default function ProductsPage() {
  const { addToCart } = useCart();
  const [addingProductId, setAddingProductId] = useState<number | null>(null);

  const handleAddToCart = (product: { id: number; name: string; price: number; image: string; description: string; }) => {
    if (addingProductId === product.id) return; // Prevent multiple clicks for the same product
    setAddingProductId(product.id);
    addToCart({ ...product, quantity: 1 });
    setTimeout(() => setAddingProductId(null), 500); // Re-enable after 500ms
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className="rounded-lg"
            />
            <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-blue-600 font-bold">₹{product.price}</p>
            <div className="flex gap-2 mt-2">
              <Link href={{ pathname: `/products/${product.id}` }}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                  View Details
                </button>
              </Link>
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
