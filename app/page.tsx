import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative w-full h-screen">
      <Image
        src="/images/hero.webp"  // Ensure the path is correct
        alt="Hero Image"
        fill   // Replaces layout="fill"
        className="object-cover"
        priority  // Ensures the image loads first
      />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold">Welcome to Kalika Creations</h1>
        <p className="text-lg">Discover the latest trends in fashion</p>
        
        {/* Wrap the button inside Link */}
        <Link href="/products" passHref>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Shop Now
          </button>
        </Link>
      </div>
    </div>
  );
}
