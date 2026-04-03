"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-20 px-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold font-heading mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8 text-lg">Looks like you haven&apos;t added anything to your cart yet.</p>
        <Link
          href="/products"
          className="inline-flex items-center justify-center bg-neon-green text-black py-4 px-8 font-bold text-lg hover:bg-white border-2 border-transparent hover:border-black transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold font-heading mb-10">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 p-6 border-b border-gray-100 bg-gray-50 text-sm font-bold text-gray-500 uppercase tracking-wider">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              <div className="divide-y divide-gray-100">
                {cart.map((item) => (
                  <div key={item.id} className="p-6 flex flex-col md:grid md:grid-cols-12 gap-4 items-center">
                    {/* Product Info */}
                    <div className="col-span-6 flex items-center gap-4 w-full">
                      <Link href={`/products/${item.id}`} className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </Link>
                      <div className="flex-1">
                        <Link href={`/products/${item.id}`} className="font-bold text-lg hover:text-neon-orange transition-colors line-clamp-2">
                          {item.name}
                        </Link>
                        <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 text-sm font-medium mt-2 flex items-center gap-1 hover:underline"
                        >
                          <X className="w-4 h-4" /> Remove
                        </button>
                      </div>
                    </div>

                    {/* Price (Desktop) */}
                    <div className="hidden md:block col-span-2 text-center font-medium">
                      ₹{item.price.toLocaleString('en-IN')}
                    </div>

                    {/* Quantity */}
                    <div className="col-span-2 flex justify-center w-full md:w-auto mt-4 md:mt-0">
                      <div className="flex items-center border border-gray-200 rounded-lg bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-50 transition-colors text-gray-600"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-50 transition-colors text-gray-600"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="col-span-2 text-right w-full md:w-auto mt-4 md:mt-0 flex justify-between md:block">
                      <span className="md:hidden font-medium text-gray-500">Total:</span>
                      <span className="font-bold text-lg">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-2xl font-bold font-heading mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-black">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping Estimate</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span className="font-medium text-black">Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold">Estimated Total</span>
                  <span className="text-3xl font-bold text-neon-orange">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full flex items-center justify-center gap-2 bg-black text-white py-4 font-bold text-lg hover:bg-gray-800 transition-colors rounded-lg"
              >
                Proceed to Checkout <ArrowRight className="w-5 h-5" />
              </Link>
              
              <div className="mt-4 text-center">
                <Link href="/products" className="text-sm font-medium text-gray-500 hover:text-black hover:underline">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
