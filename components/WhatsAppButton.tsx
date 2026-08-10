"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { openWhatsApp, buildGeneralInquiryMessage } from "@/lib/whatsapp";

export default function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    openWhatsApp(buildGeneralInquiryMessage());
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
      aria-label="Chat on WhatsApp with Mahi Sports Hub"
    >
      <MessageCircle className="w-8 h-8" />
      <span className="absolute right-full mr-4 bg-black text-white text-xs font-mono font-bold py-2 px-3 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none border border-gray-800">
        Inquire via WhatsApp
      </span>
    </button>
  );
}

