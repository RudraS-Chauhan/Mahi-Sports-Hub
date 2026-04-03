"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { CheckCircle2, ArrowLeft, ExternalLink, CreditCard, Wallet } from "lucide-react";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "online",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formData.paymentMethod === "online") {
      // Simulate redirecting to an external payment gateway
      setTimeout(() => {
        setIsSubmitting(false);
        // In a real app, this would redirect to Stripe, Razorpay, etc.
        // window.location.href = "https://razorpay.com/pay/link...";
        
        // For demo purposes, we will simulate a successful payment return
        setIsSuccess(true);
        clearCart();
      }, 1500);
    } else {
      // COD
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        clearCart();
      }, 1500);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold font-heading mb-4">Order Confirmed!</h2>
          <p className="text-gray-600 mb-8">
            Thank you, {formData.name}. Your order has been placed successfully. A confirmation email has been sent to {formData.email}.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center w-full bg-black text-white py-4 font-bold rounded-lg hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Add some products to your cart to checkout.</p>
        <Link
          href="/products"
          className="inline-flex items-center justify-center bg-black text-white py-3 px-8 font-bold rounded-lg hover:bg-gray-800 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/cart" className="inline-flex items-center gap-2 text-gray-500 hover:text-black mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Cart
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold font-heading mb-6">Checkout Details</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-neon-green focus:border-transparent outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-neon-green focus:border-transparent outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-neon-green focus:border-transparent outline-none transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">Street Address</label>
                  <textarea
                    id="address"
                    name="address"
                    required
                    rows={2}
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-neon-green focus:border-transparent outline-none transition-all resize-none"
                    placeholder="House No, Street, Landmark"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-neon-green focus:border-transparent outline-none transition-all"
                      placeholder="Lucknow"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">PIN Code</label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      required
                      value={formData.pincode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-neon-green focus:border-transparent outline-none transition-all"
                      placeholder="226016"
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-gray-100">
                  <h3 className="text-lg font-bold">Payment Method</h3>
                  
                  <div className="space-y-3">
                    <label className={`flex items-start p-4 border rounded-xl cursor-pointer transition-colors ${formData.paymentMethod === 'online' ? 'border-neon-green bg-green-50/50' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <div className="flex items-center h-5">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="online"
                          checked={formData.paymentMethod === "online"}
                          onChange={handleChange}
                          className="w-4 h-4 text-neon-green focus:ring-neon-green border-gray-300"
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <span className="block font-bold text-gray-900 flex items-center gap-2">
                          <CreditCard className="w-5 h-5" /> Pay Online
                        </span>
                        <span className="block text-sm text-gray-500 mt-1">
                          Secure payment via Razorpay/Stripe (Credit Card, UPI, NetBanking)
                        </span>
                      </div>
                    </label>
                    
                    <label className={`flex items-start p-4 border rounded-xl cursor-pointer transition-colors ${formData.paymentMethod === 'cod' ? 'border-neon-green bg-green-50/50' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <div className="flex items-center h-5">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={formData.paymentMethod === "cod"}
                          onChange={handleChange}
                          className="w-4 h-4 text-neon-green focus:ring-neon-green border-gray-300"
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <span className="block font-bold text-gray-900 flex items-center gap-2">
                          <Wallet className="w-5 h-5" /> Cash on Delivery (COD)
                        </span>
                        <span className="block text-sm text-gray-500 mt-1">
                          Pay with cash upon delivery.
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-neon-green text-black py-4 font-bold text-lg rounded-xl hover:bg-[#2ce60f] transition-colors disabled:opacity-70 flex items-center justify-center gap-2 mt-8 shadow-lg shadow-neon-green/20"
                >
                  {isSubmitting ? (
                    "Processing..."
                  ) : formData.paymentMethod === "online" ? (
                    <>Proceed to Payment Gateway <ExternalLink className="w-5 h-5" /></>
                  ) : (
                    <>Place Order • ₹{cartTotal.toLocaleString('en-IN')}</>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold font-heading mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm line-clamp-2">{item.name}</h4>
                      <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                    </div>
                    <div className="font-bold text-sm">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-3 border-t border-gray-100">
                  <span>Total</span>
                  <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
