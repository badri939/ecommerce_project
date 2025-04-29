"use client"
import { notFound } from "next/navigation";
import Image from "next/image";
import products from "@/data/products";
import { useCart } from "@/context/CardContext";
import { useState, use } from "react";

// ✅ Force TypeScript to completely ignore Next.js auto-generated constraints
interface PageProps {
  params: { id: string } | any; // ← ALLOW ANYTHING TO PREVENT ERRORS
}

interface Params {
  id: string;
}

export default function ProductDetails({ params }: PageProps) {
  const resolvedParams = use(params); // Unwrap the params Promise
  const productId = resolvedParams.id; // Access the id property

  const { addToCart, cartItems } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    if (isAdding) return; // Prevent multiple clicks
    setIsAdding(true);
    console.log('Add to Cart button clicked');
    if (!product || !product.id) {
      console.error("Product ID is missing or invalid.");
      return;
    }
    addToCart({
      id: product.id!, // Use non-null assertion since we already check for `id` existence
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    setTimeout(() => setIsAdding(false), 500); // Re-enable after 500ms
  };

  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) {
    return <h1 className="text-center text-3xl font-bold mt-10">Product Not Found</h1>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        <Image src={product.image} alt={product.name} width={500} height={500} />
        <div>
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-xl text-gray-700">{product.description}</p>
          <p className="text-3xl font-semibold text-blue-600">₹{product.price}</p>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="mt-4 bg-green-500 text-white px-6 py-3 rounded text-lg hover:shadow-lg transition-shadow duration-300"
          >
            {isAdding ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
      <div className="mt-6">
        <button className="cart-button" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/cart.svg" alt="Cart Icon" width="24" height="24" style={{ display: 'block', border: '1px solid red' }} /> Cart: {cartItems.length} items
        </button>
      </div>
    </div>
  );
}
