"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, Check, Instagram, Facebook, ArrowLeft } from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const waMsg =
      `Respected Mahi Sports Hub Team,\n\n` +
      `Greetings! I am reaching out regarding a ${formData.subject}:\n\n` +
      `• *Name:* ${formData.name}\n` +
      `• *Phone:* ${formData.phone}\n` +
      `• *Email:* ${formData.email}\n` +
      `• *Subject:* ${formData.subject}\n\n` +
      `*Message Details:*\n${formData.message}\n\n` +
      `Kindly assist me at your earliest convenience. Thank you sincerely.\n\n` +
      `Best regards,\n${formData.name}`;

    openWhatsApp(waMsg);

    // Formspree submission in background
    try {
      await fetch("https://formspree.io/f/mahisports1992@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch {
      // Fallback
    }

    setLoading(false);
    setSubmitted(true);
  };

  const triggerDirectWhatsApp = (subject: string, text: string) => {
    const message =
      `Respected Mahi Sports Hub Team,\n\n` +
      `Greetings! I would like to inquire regarding *${subject}*:\n` +
      `"${text}"\n\n` +
      `Kindly guide me with details.\n\n` +
      `Sincerely,\nInterested Customer`;
    openWhatsApp(message);
  };


  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-black text-white py-16 md:py-24 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-neon-green mb-6 hover:underline">
            <ArrowLeft className="w-3.5 h-3.5" /> Return Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-extrabold font-heading tracking-tight mb-4">
            INQUIRE <span className="text-neon-green">NOW</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
            Have questions about custom team jerseys, Grade 1 English Willow bats, or store pickups in Indira Nagar? Get in touch directly.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Quick Instant Inquiry Cards */}
        <div className="mb-16">
          <h2 className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-6 text-center">
            Instant WhatsApp Topics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={() => triggerDirectWhatsApp("Team Jerseys", "I would like a custom quote for our cricket team's sublimated jerseys and shorts.")}
              className="p-6 bg-gray-50 border border-gray-200 hover:border-black rounded-xl text-left transition-all hover:shadow-md group"
            >
              <div className="w-12 h-12 bg-black text-neon-green rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-black mb-1">Custom Team Apparel</h3>
              <p className="text-sm text-gray-600 mb-3">Order sublimation jerseys, shorts, and caps with your team logo and numbers.</p>
              <span className="text-xs font-mono font-bold text-black group-hover:text-neon-green transition-colors flex items-center gap-1">
                Chat via WhatsApp &rarr;
              </span>
            </button>

            <button
              onClick={() => triggerDirectWhatsApp("Cricket Bat Knocking & Selection", "I need advice on selecting a Grade 1 English Willow or Kashmir Willow bat.")}
              className="p-6 bg-gray-50 border border-gray-200 hover:border-black rounded-xl text-left transition-all hover:shadow-md group"
            >
              <div className="w-12 h-12 bg-black text-neon-green rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-black mb-1">Cricket Bat Guidance</h3>
              <p className="text-sm text-gray-600 mb-3">Ask about Willow grains, weight balance, oiled bats, and knocking-in service.</p>
              <span className="text-xs font-mono font-bold text-black group-hover:text-neon-green transition-colors flex items-center gap-1">
                Chat via WhatsApp &rarr;
              </span>
            </button>

            <button
              onClick={() => triggerDirectWhatsApp("Store Pickup & Availability", "I want to check store stock availability for gear pickup today.")}
              className="p-6 bg-gray-50 border border-gray-200 hover:border-black rounded-xl text-left transition-all hover:shadow-md group"
            >
              <div className="w-12 h-12 bg-black text-neon-green rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-black mb-1">Store Pickup & Stock</h3>
              <p className="text-sm text-gray-600 mb-3">Check item availability at our Indira Nagar retail branch before visiting.</p>
              <span className="text-xs font-mono font-bold text-black group-hover:text-neon-green transition-colors flex items-center gap-1">
                Chat via WhatsApp &rarr;
              </span>
            </button>
          </div>
        </div>

        {/* Contact Form & Information */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form */}
          <div className="lg:col-span-7 bg-white p-8 border border-gray-200 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold font-heading mb-6 text-black">
              Send a Direct Message
            </h2>

            {submitted ? (
              <div className="p-8 bg-black text-white rounded-xl text-center">
                <div className="w-16 h-16 bg-neon-green text-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold font-heading mb-2">Message Dispatched!</h3>
                <p className="text-gray-300 text-sm mb-6">
                  Thank you, {formData.name}. Your inquiry has been transmitted and opened in WhatsApp for instant response.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-neon-green text-black font-bold rounded-lg text-sm hover:bg-white transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ankur Sharma"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-gray-700 mb-2">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="athlete@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-gray-700 mb-2">Inquiry Category</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:border-black focus:ring-1 focus:ring-black outline-none bg-white transition-all"
                    >
                      <option>General Inquiry</option>
                      <option>Custom Team Jerseys</option>
                      <option>English Willow Bats</option>
                      <option>Store Pickup Query</option>
                      <option>Bulk Equipment Order</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-gray-700 mb-2">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about your gear requirements, preferred size, or quantity..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white py-4 font-bold rounded-lg text-base hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-neon-green" />
                  {loading ? "Transmitting..." : "Submit & Connect on WhatsApp"}
                </button>
              </form>
            )}
          </div>

          {/* Details & Map */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-gray-50 p-8 border border-gray-200 rounded-2xl space-y-6">
              <h3 className="text-xl font-bold font-heading text-black border-b border-gray-200 pb-4">
                Store Location & Info
              </h3>

              <div className="space-y-4 text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-black shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-black">Address</p>
                    <p>C-2028, Aravali Marg, near Hanuman Mandir, Block C, Indira Nagar, Lucknow, Uttar Pradesh 226016</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-black shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-black">Phone & WhatsApp</p>
                    <a href="tel:+918382908844" className="hover:underline text-black font-mono">+91 83829 08844</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-black shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-black">Email</p>
                    <a href="mailto:mahisports1992@gmail.com" className="hover:underline font-mono text-black">mahisports1992@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-black shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-black">Store Operating Hours</p>
                    <p>Open Daily: 10:45 AM – 10:30 PM</p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs font-mono font-bold uppercase text-gray-500 mb-3">Follow Mahi Sports Hub</p>
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/mshcricketofficial/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-black text-white rounded-lg hover:bg-neon-green hover:text-black transition-colors flex items-center gap-2 text-xs font-mono"
                  >
                    <Instagram className="w-4 h-4" /> Instagram
                  </a>
                  <a
                    href="https://www.facebook.com/105935738173710"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-black text-white rounded-lg hover:bg-neon-green hover:text-black transition-colors flex items-center gap-2 text-xs font-mono"
                  >
                    <Facebook className="w-4 h-4" /> Facebook
                  </a>
                </div>
              </div>
            </div>

            {/* Embedded Google Maps */}
            <div className="h-64 rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.9882202672!2d80.9930!3d26.8720!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be2c000000001%3A0x0!2zMjbCsDUyJzE5LjIiTiA4MMKwNTknMzQuOCJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Mahi Sports Hub Store Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
