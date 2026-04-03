"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, MessageCircle, ArrowLeft, ShieldCheck, Truck } from "lucide-react";
import { products, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === params.id);

  useEffect(() => {
    if (!product) {
      router.push('/products');
    }
  }, [product, router]);

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleWhatsAppOrder = () => {
    const message = `Hi, I want to order ${quantity}x ${product.name} from Mahi Sports Hub.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/918382908844?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/products" className="inline-flex items-center gap-2 text-gray-500 hover:text-black mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-20">
          {/* Image Gallery */}
          <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden border border-gray-200">
            {product.isBestSeller && (
              <div className="absolute top-4 left-4 z-10 bg-black text-neon-green text-sm font-bold px-4 py-1 uppercase tracking-wider">
                Best Seller
              </div>
            )}
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-2 text-sm font-bold text-gray-500 uppercase tracking-wider">
              {product.category}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-heading mb-4">{product.name}</h1>
            
            <div className="flex items-end gap-3 mb-6">
              <span className="text-4xl font-bold">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through mb-1">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <div className="prose prose-lg text-gray-600 mb-8">
              <p>{product.description}</p>
            </div>

            {/* Stock Status */}
            <div className="mb-8">
              {product.inStock ? (
                <span className="inline-flex items-center gap-2 text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-green-600"></span> In Stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 text-red-600 font-bold bg-red-50 px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-red-600"></span> Out of Stock
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-4 mt-auto">
              <div className="flex gap-4">
                <div className="flex items-center border-2 border-gray-200 rounded-lg">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-gray-50 transition-colors"
                  >-</button>
                  <span className="w-12 text-center font-bold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 hover:bg-gray-50 transition-colors"
                  >+</button>
                </div>
                <button
                  onClick={() => addToCart(product, quantity)}
                  disabled={!product.inStock}
                  className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-3 px-6 font-bold text-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
              
              <button
                onClick={handleWhatsAppOrder}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 px-6 font-bold text-lg hover:bg-[#128C7E] transition-colors rounded-lg"
              >
                <MessageCircle className="w-5 h-5" />
                Order via WhatsApp
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-3 text-gray-600">
                <ShieldCheck className="w-6 h-6 text-neon-green" />
                <span className="text-sm font-medium">100% Authentic<br/>Products</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Truck className="w-6 h-6 text-neon-green" />
                <span className="text-sm font-medium">Local Pickup<br/>Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="pt-16 border-t border-gray-200">
            <h2 className="text-2xl font-bold font-heading mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
