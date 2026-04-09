"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { CheckCircle2, ArrowLeft, MessageCircle, Wallet, QrCode } from "lucide-react";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // UPI & Device State
  const [isMobile, setIsMobile] = useState(false);
  const [isUpiModalOpen, setIsUpiModalOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppCheckout = (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    
    if (cart.length === 0) return;
    if (formRef.current && !formRef.current.reportValidity()) return;

    setIsSubmitting(true);

    let message = `New Order from Mahi Sports Hub!\n\n`;
    message += `Customer Details:\n`;
    message += `Name: ${formData.name}\n`;
    if (formData.phone) {
      message += `Phone: ${formData.phone}\n`;
    }
    message += `Address/Pickup: ${formData.address}\n\n`;

    message += `Order Summary:\n`;
    cart.forEach((item) => {
      message += `- ${item.quantity}x ${item.name} (₹${(item.price * item.quantity).toLocaleString('en-IN')})\n`;
    });

    message += `\nTotal Amount: ₹${cartTotal.toLocaleString('en-IN')}\n\n`;
    message += `Payment Method: UPI / Pay at Store\n`;
    message += `Please confirm my order and share your UPI QR code if applicable.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/918382908844?text=${encodedMessage}`, '_blank');

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      clearCart();
    }, 1000);
  };

  const handleUpiClick = () => {
    if (formRef.current && !formRef.current.reportValidity()) return;

    const orderId = `ORD${Date.now()}`;
    const upiLink = `upi://pay?pa=mahisports1992@okaxis&pn=Mahi%20Sports&am=${cartTotal}&cu=INR&tn=Order_${orderId}`;

    if (isMobile) {
      // Trigger Deep Link on Mobile
      window.location.href = upiLink;
    } else {
      // Open Modal on Desktop
      setIsUpiModalOpen(true);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold font-heading mb-4">Order Sent!</h2>
          <p className="text-gray-600 mb-8">
            Thank you, {formData.name}. Your order details have been sent via WhatsApp. We will confirm your order shortly.
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

  const orderIdForQr = `ORD${Date.now()}`;
  const upiLinkForQr = `upi://pay?pa=mahisports1992@okaxis&pn=Mahi%20Sports&am=${cartTotal}&cu=INR&tn=Order_${orderIdForQr}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiLinkForQr)}`;

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
              <h2 className="text-2xl font-bold font-heading mb-6">Customer Details</h2>
              
              <form ref={formRef} onSubmit={handleWhatsAppCheckout} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name *</label>
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
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-neon-green focus:border-transparent outline-none transition-all"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">Delivery Address or &quot;Local Pickup&quot; *</label>
                  <textarea
                    id="address"
                    name="address"
                    required
                    rows={3}
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-neon-green focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Enter your full delivery address or type 'Local Pickup'"
                  />
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100 space-y-4">
                  <button
                    type="button"
                    onClick={handleUpiClick}
                    className="w-full bg-white border-2 border-gray-200 text-gray-900 py-4 font-bold text-lg rounded-xl hover:border-[#6739B7] hover:text-[#6739B7] transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <QrCode className="w-6 h-6 text-[#6739B7]" />
                    Pay via UPI (GPay, PhonePe, Paytm)
                  </button>

                  <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="flex-shrink-0 mx-4 text-gray-400 text-sm font-bold tracking-wider">OR</span>
                    <div className="flex-grow border-t border-gray-200"></div>
                  </div>

                  <button
                    type="button"
                    onClick={handleWhatsAppCheckout}
                    disabled={isSubmitting}
                    className="w-full bg-[#25D366] text-white py-4 font-bold text-lg rounded-xl hover:bg-[#128C7E] transition-colors disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20"
                  >
                    <MessageCircle className="w-6 h-6" />
                    {isSubmitting ? "Processing..." : "Order via WhatsApp (Pay at Store)"}
                  </button>
                </div>
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
                <div className="flex justify-between text-xl font-bold pt-3 border-t border-gray-100">
                  <span>Total</span>
                  <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop UPI Modal */}
      {isUpiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl animate-in fade-in zoom-in duration-200">
            <h3 className="text-2xl font-bold font-heading mb-2">Scan to Pay via UPI</h3>
            <p className="text-gray-500 text-sm mb-6">Open GPay, PhonePe, or Paytm to scan</p>
            
            <div className="bg-white p-4 rounded-xl inline-block mb-6 border-2 border-gray-100 shadow-inner">
              <Image
                src={qrCodeUrl}
                alt="UPI QR Code"
                width={200}
                height={200}
                className="mx-auto"
                unoptimized
              />
            </div>
            
            <div className="bg-gray-50 rounded-lg py-3 px-4 mb-6 border border-gray-200">
              <p className="text-gray-500 text-sm mb-1">UPI ID</p>
              <p className="text-black font-bold tracking-wide">mahisports1992@okaxis</p>
            </div>
            
            <p className="text-2xl font-bold mb-8 text-[#6739B7]">
              Total: ₹{cartTotal.toLocaleString('en-IN')}
            </p>
            
            <button
              onClick={(e) => {
                setIsUpiModalOpen(false);
                handleWhatsAppCheckout(e);
              }}
              className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors shadow-lg"
            >
              I Have Paid (Complete Order)
            </button>
            
            <button
              onClick={() => setIsUpiModalOpen(false)}
              className="w-full mt-4 text-gray-500 font-medium hover:text-black transition-colors py-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
