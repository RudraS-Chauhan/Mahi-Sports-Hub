"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, MessageCircle } from "lucide-react";
import SafeImage from "@/components/SafeImage";
import { openWhatsApp } from "@/lib/whatsapp";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;
    
    let message =
      `Respected Mahi Sports Hub Team,\n\n` +
      `Greetings! I would like to inquire & place an order for the following items in my shopping bag:\n\n`;
      
    cart.forEach((item, index) => {
      message += `  ${index + 1}. *[${item.itemNumber}]* ${item.name} — Qty: ${item.quantity} (₹${(item.price * item.quantity).toLocaleString("en-IN")})\n`;
    });
    
    message +=
      `\n*Estimated Bag Total:* ₹${cartTotal.toLocaleString("en-IN")}\n\n` +
      `Kindly confirm stock availability and store pickup / delivery arrangement at Indira Nagar Lucknow.\n\n` +
      `Sincerely,\nValued Customer`;
    
    openWhatsApp(message);
  };


  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-20 px-4 animate-in fade-in duration-300">
        <div className="w-24 h-24 bg-black text-neon-green rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-extrabold font-heading mb-3 text-black">Your Shopping Bag is Empty</h1>
        <p className="text-gray-500 mb-8 text-sm max-w-md text-center">
          Browse our catalog of Grade 1 English Willow bats, protective gear, and team sportswear to add items.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center justify-center bg-black text-white py-4 px-8 font-bold text-sm uppercase tracking-wider rounded-lg hover:bg-neon-green hover:text-black transition-colors"
        >
          Explore Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 animate-in fade-in duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-extrabold font-heading mb-10 text-black uppercase tracking-tight">
          SHOPPING BAG ({cart.reduce((sum, item) => sum + item.quantity, 0)} ITEMS)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="hidden md:grid grid-cols-12 gap-4 p-5 border-b border-gray-200 bg-gray-50 text-xs font-mono font-bold text-gray-500 uppercase tracking-wider">
                <div className="col-span-6">Item Description</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>

              <div className="divide-y divide-gray-100">
                {cart.map((item) => (
                  <div key={item.id} className="p-6 flex flex-col md:grid md:grid-cols-12 gap-4 items-center">
                    {/* Item Detail */}
                    <div className="col-span-6 flex items-center gap-4 w-full">
                      <Link href={`/products/${item.id}`} className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0 border border-gray-200">
                        <SafeImage src={item.image} alt={item.name} fill className="object-cover" />
                      </Link>

                      <div className="flex-1 min-w-0">
                        <span className="font-mono text-[10px] bg-black text-neon-green px-1.5 py-0.5 rounded font-bold">
                          {item.itemNumber}
                        </span>
                        <Link href={`/products/${item.id}`} className="block font-bold text-base text-black hover:underline line-clamp-2 mt-1">
                          {item.name}
                        </Link>
                        <p className="text-xs text-gray-500 uppercase font-mono">{item.category}</p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-500 text-xs font-mono font-bold mt-2 flex items-center gap-1 hover:text-black transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-black" /> Remove Item
                        </button>
                      </div>
                    </div>

                    {/* Price (Desktop) */}
                    <div className="hidden md:block col-span-2 text-center font-mono font-bold text-black text-sm">
                      ₹{item.price.toLocaleString("en-IN")}
                    </div>

                    {/* Quantity Control */}
                    <div className="col-span-2 flex justify-center w-full md:w-auto mt-4 md:mt-0">
                      <div className="flex items-center border border-black rounded-lg bg-white overflow-hidden font-mono">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1.5 hover:bg-gray-100 transition-colors font-bold text-black"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-10 text-center font-bold text-sm text-black">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1.5 hover:bg-gray-100 transition-colors font-bold text-black"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="col-span-2 text-right w-full md:w-auto mt-4 md:mt-0 flex justify-between md:block font-mono">
                      <span className="md:hidden font-bold text-xs uppercase text-gray-500">Subtotal:</span>
                      <span className="font-extrabold text-base text-black">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm sticky top-24 space-y-6">
              <h2 className="text-xl font-bold font-heading text-black border-b border-gray-100 pb-4 uppercase">
                Order Summary
              </h2>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Bag Subtotal</span>
                  <span className="font-bold text-black">₹{cartTotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Fulfillment Option</span>
                  <span className="font-bold text-black">In-Store Pickup / Local Courier</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 font-mono">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-bold uppercase text-gray-600">Total Payable</span>
                  <span className="text-3xl font-extrabold text-black">
                    ₹{cartTotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  href="/checkout"
                  className="w-full flex items-center justify-center gap-2 bg-black text-white py-4 font-bold text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors rounded-xl"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4 text-neon-green" />
                </Link>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 font-bold text-sm uppercase tracking-wider hover:bg-[#128C7E] transition-colors rounded-xl"
                >
                  <MessageCircle className="w-5 h-5" />
                  Order Bag via WhatsApp
                </button>
              </div>

              <div className="pt-2 text-center">
                <Link href="/products" className="text-xs font-mono font-bold text-gray-500 hover:text-black uppercase tracking-wider">
                  &larr; Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
