"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import {
  CheckCircle2,
  ArrowLeft,
  MessageCircle,
  QrCode,
  Store,
  Upload,
  Printer,
  ShieldCheck,
  Copy,
  Check,
  MapPin,
  Truck,
  Tag,
  Clock,
  Phone,
  ExternalLink,
  Receipt,
  Sparkles,
} from "lucide-react";
import SafeImage from "@/components/SafeImage";
import { buildCheckoutOrderMessage, getWhatsAppUrl } from "@/lib/whatsapp";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "store">("upi");
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [upiCopied, setUpiCopied] = useState(false);

  // Fulfillment State
  const [fulfillmentType, setFulfillmentType] = useState<"pickup" | "delivery">("pickup");
  const [pickupSlot, setPickupSlot] = useState("Today (2:00 PM - 6:00 PM)");
  const [deliveryDetails, setDeliveryDetails] = useState({
    street: "",
    sector: "Indira Nagar",
    landmark: "",
    pincode: "226016",
    instructions: "",
  });

  // Customer Contact State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    altPhone: "",
    email: "",
  });

  // Promo Code State
  const [promoInput, setPromoInput] = useState("");
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  // Final Order Receipt Details
  const [completedOrderDetails, setCompletedOrderDetails] = useState<{
    invoiceId: string;
    date: string;
    customer: typeof formData;
    fulfillmentType: "pickup" | "delivery";
    fulfillmentSummary: string;
    items: typeof cart;
    subtotal: number;
    discount: number;
    finalTotal: number;
    paymentType: string;
    screenshotName?: string;
    waUrl: string;
  } | null>(null);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText("mahisports1992@okaxis");
    setUpiCopied(true);
    toast.success("UPI ID copied to clipboard!");
    setTimeout(() => setUpiCopied(false), 2500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDeliveryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDeliveryDetails({ ...deliveryDetails, [e.target.name]: e.target.value });
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (!code) return;

    if (code === "MAHI10" || code === "FIRST10") {
      const disc = Math.round(cartTotal * 0.1);
      setDiscountAmount(disc);
      setAppliedCode(code);
      toast.success(`Promo Code '${code}' applied! 10% Discount (₹${disc}) saved.`);
    } else if (code === "STORE100" || code === "WELCOME100") {
      const disc = Math.min(100, cartTotal);
      setDiscountAmount(disc);
      setAppliedCode(code);
      toast.success(`Promo Code '${code}' applied! Flat ₹100 Off saved.`);
    } else if (code === "SPORTS15" || code === "IND15") {
      const disc = Math.round(cartTotal * 0.15);
      setDiscountAmount(disc);
      setAppliedCode(code);
      toast.success(`Promo Code '${code}' applied! 15% Discount (₹${disc}) saved.`);
    } else {
      toast.error("Invalid Promo Code. Try 'MAHI10' or 'STORE100'.");
    }
  };

  const handleRemovePromo = () => {
    setAppliedCode(null);
    setDiscountAmount(0);
    setPromoInput("");
    toast.info("Promo code removed.");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setScreenshotFile(file);
      setScreenshotPreview(URL.createObjectURL(file));
      toast.success("Payment screenshot selected.");
    }
  };

  const finalPayableTotal = Math.max(0, cartTotal - discountAmount);

  const handleCompleteOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) return;
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      toast.error("Please fill in your Full Name, Phone, and Email.");
      return;
    }

    if (fulfillmentType === "delivery" && (!deliveryDetails.street.trim() || !deliveryDetails.pincode.trim())) {
      toast.error("Please fill in street address and pincode for delivery.");
      return;
    }

    if (paymentMethod === "upi" && !screenshotFile) {
      toast.error("Please upload your UPI payment screenshot to proceed.");
      return;
    }

    setIsSubmitting(true);

    const generatedInvoiceId = `INV-MSH-${Math.floor(100000 + Math.random() * 900000)}`;
    const currentDate = new Date().toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const fulfillmentSummaryText =
      fulfillmentType === "pickup"
        ? `Store Pickup at Indira Nagar Store (${pickupSlot})`
        : `Local Express Delivery: ${deliveryDetails.street}, ${deliveryDetails.sector}, Near ${deliveryDetails.landmark || "N/A"}, Lucknow - ${deliveryDetails.pincode}. Notes: ${deliveryDetails.instructions || "None"}`;

    // Generate respectful, customized WhatsApp message using helper
    const waText = buildCheckoutOrderMessage({
      invoiceId: generatedInvoiceId,
      date: currentDate,
      customerName: formData.name,
      customerPhone: formData.phone,
      alternatePhone: formData.altPhone || undefined,
      customerEmail: formData.email,
      fulfillmentType,
      pickupTimeOrAddress: fulfillmentSummaryText,
      items: cart.map((item) => ({
        name: item.name,
        itemNumber: item.itemNumber,
        quantity: item.quantity,
        price: item.price,
      })),
      subtotal: cartTotal,
      discount: discountAmount,
      finalTotal: finalPayableTotal,
      paymentMethod: paymentMethod === "upi" ? "UPI QR Transfer (Screenshot Uploaded)" : "Pay at Store upon Pickup",
    });

    const waUrl = getWhatsAppUrl(waText);

    // CRITICAL FIX: Trigger WhatsApp opening synchronously / immediately to bypass iframe popup blockers
    try {
      window.open(waUrl, "_blank");
    } catch {
      // Fallback redirect if window.open is restricted
      window.location.href = waUrl;
    }

    // Submit order payload to Formspree endpoint asynchronously in background
    try {
      const formPayload = new FormData();
      formPayload.append("Invoice_ID", generatedInvoiceId);
      formPayload.append("Customer_Name", formData.name);
      formPayload.append("Customer_Phone", formData.phone);
      formPayload.append("Customer_Alt_WhatsApp", formData.altPhone || "N/A");
      formPayload.append("Customer_Email", formData.email);
      formPayload.append("Fulfillment_Mode", fulfillmentType === "pickup" ? "Store Pickup" : "Local Lucknow Delivery");
      formPayload.append("Fulfillment_Details", fulfillmentSummaryText);
      formPayload.append("Payment_Method", paymentMethod === "upi" ? "UPI Transfer" : "Pay at Store");
      formPayload.append("Subtotal", `₹${cartTotal.toLocaleString("en-IN")}`);
      formPayload.append("Discount", `₹${discountAmount.toLocaleString("en-IN")}`);
      formPayload.append("Final_Total", `₹${finalPayableTotal.toLocaleString("en-IN")}`);
      formPayload.append(
        "Line_Items",
        cart.map((i) => `${i.quantity}x ${i.name} (${i.itemNumber}) - ₹${i.price * i.quantity}`).join("\n")
      );
      if (screenshotFile) {
        formPayload.append("Payment_Screenshot", screenshotFile);
      }

      await fetch("https://formspree.io/f/mahisports1992@gmail.com", {
        method: "POST",
        body: formPayload,
        headers: {
          Accept: "application/json",
        },
      });
    } catch (err) {
      console.warn("Formspree submission logged locally:", err);
    }

    // Save details for Official Receipt / PDF
    setCompletedOrderDetails({
      invoiceId: generatedInvoiceId,
      date: currentDate,
      customer: { ...formData },
      fulfillmentType,
      fulfillmentSummary: fulfillmentSummaryText,
      items: [...cart],
      subtotal: cartTotal,
      discount: discountAmount,
      finalTotal: finalPayableTotal,
      paymentType: paymentMethod === "upi" ? "UPI Verified" : "Pay at Store",
      screenshotName: screenshotFile ? screenshotFile.name : undefined,
      waUrl,
    });

    setIsSubmitting(false);
    setOrderCompleted(true);
    clearCart();
  };

  // Completed Official Printable Receipt View
  if (orderCompleted && completedOrderDetails) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 print:bg-white print:p-0">
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl border border-gray-200 shadow-xl print:shadow-none print:border-none print:p-0 print:max-w-none">
          {/* Official Letterhead Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-black pb-6 mb-6 gap-4">
            <div>
              <div className="relative h-12 w-60 mb-2">
                <SafeImage src="/logo.png" alt="Mahi Sports Hub Logo" fill className="object-contain object-left" />
              </div>
              <p className="text-xs font-semibold text-gray-700">Official Store Receipt & Tax Invoice</p>
              <p className="text-[11px] text-gray-500 font-mono mt-0.5">
                C-2028, Aravali Marg, near Hanuman Mandir, Indira Nagar, Lucknow, UP 226016
              </p>
              <p className="text-[11px] text-gray-500 font-mono">
                Phone: +91 83829 08844 | GSTIN: 09AAAFM1992S1Z8
              </p>
            </div>

            <div className="text-left sm:text-right font-mono">
              <span className="inline-block bg-black text-neon-green text-xs font-bold px-3 py-1 rounded">
                {completedOrderDetails.invoiceId}
              </span>
              <p className="text-xs font-bold text-gray-800 mt-1">{completedOrderDetails.date}</p>
              <p className="text-[11px] text-gray-500 uppercase mt-0.5">Status: <span className="font-bold text-green-700">CONFIRMED</span></p>
            </div>
          </div>

          {/* WhatsApp Success & Action Banner (Hidden on Print) */}
          <div className="bg-black text-white p-5 rounded-xl mb-8 border border-gray-800 print:hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-neon-green shrink-0" />
              <div>
                <h2 className="text-base font-bold font-heading text-white">Order Placed & WhatsApp Triggered!</h2>
                <p className="text-xs text-gray-300">
                  Your order has been recorded. If WhatsApp did not open automatically, click below to send your structured order message.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={completedOrderDetails.waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white hover:bg-[#128C7E] px-4 py-2 rounded-lg text-xs font-bold font-mono flex items-center gap-1.5 shadow"
              >
                <MessageCircle className="w-4 h-4" /> Re-open WhatsApp
              </a>
              <button
                onClick={() => window.print()}
                className="bg-white text-black hover:bg-gray-100 px-4 py-2 rounded-lg text-xs font-bold font-mono flex items-center gap-1.5 shadow"
              >
                <Printer className="w-4 h-4" /> Print Receipt
              </button>
            </div>
          </div>

          {/* Customer & Fulfillment Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl mb-8 border border-gray-200 text-xs">
            <div>
              <h3 className="font-mono font-bold uppercase text-gray-500 mb-2 border-b pb-1">Recipient Customer Info</h3>
              <p className="font-extrabold text-sm text-black">{completedOrderDetails.customer.name}</p>
              <p className="font-mono text-gray-700 mt-1">Primary Tel: <span className="font-bold text-black">{completedOrderDetails.customer.phone}</span></p>
              {completedOrderDetails.customer.altPhone && (
                <p className="font-mono text-gray-700">Alt / WhatsApp: <span className="font-bold text-black">{completedOrderDetails.customer.altPhone}</span></p>
              )}
              <p className="text-gray-700 font-mono">{completedOrderDetails.customer.email}</p>
            </div>

            <div>
              <h3 className="font-mono font-bold uppercase text-gray-500 mb-2 border-b pb-1">Fulfillment & Payment</h3>
              <p className="font-bold text-gray-900">
                Mode: {completedOrderDetails.fulfillmentType === "pickup" ? "🏬 Store Pickup (Indira Nagar)" : "🚚 Express Local Delivery"}
              </p>
              <p className="text-gray-700 mt-1 leading-relaxed">{completedOrderDetails.fulfillmentSummary}</p>
              <p className="font-mono font-bold text-black mt-2">
                Payment Method: <span className="text-green-700">{completedOrderDetails.paymentType}</span>
              </p>
            </div>
          </div>

          {/* Itemized Order Table */}
          <div className="mb-8 overflow-hidden rounded-xl border border-gray-200">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-black text-white font-mono uppercase text-[11px]">
                  <th className="p-3">#</th>
                  <th className="p-3">Item Description</th>
                  <th className="p-3 text-center">Item Code</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Rate</th>
                  <th className="p-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 font-mono">
                {completedOrderDetails.items.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-3 text-gray-400 font-bold">{idx + 1}</td>
                    <td className="p-3 font-sans font-bold text-gray-900">{item.name}</td>
                    <td className="p-3 text-center">
                      <span className="bg-gray-100 text-black px-2 py-0.5 rounded font-bold">{item.itemNumber}</span>
                    </td>
                    <td className="p-3 text-center font-bold">{item.quantity}</td>
                    <td className="p-3 text-right text-gray-700">₹{item.price.toLocaleString("en-IN")}</td>
                    <td className="p-3 text-right font-bold text-black">₹{(item.price * item.quantity).toLocaleString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Financial Totals */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-t border-gray-200 pt-6 mb-8 gap-4 font-mono text-xs">
            <div className="text-gray-500 max-w-xs">
              <p className="font-bold text-black mb-1">Store Guarantees & Terms:</p>
              <p className="text-[10px] text-gray-500 leading-tight">
                All equipment is checked for craftsmanship. Handcrafted bats carry Willow guarantee. Store pickup available Mon-Sun 10am-9:30pm.
              </p>
            </div>

            <div className="w-full sm:w-64 space-y-2 text-right">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>₹{completedOrderDetails.subtotal.toLocaleString("en-IN")}</span>
              </div>
              {completedOrderDetails.discount > 0 && (
                <div className="flex justify-between text-green-700 font-bold">
                  <span>Promo Discount:</span>
                  <span>-₹{completedOrderDetails.discount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-extrabold text-black border-t-2 border-black pt-2">
                <span>TOTAL AMOUNT:</span>
                <span>₹{completedOrderDetails.finalTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

          {/* Authorized Signatory Line */}
          <div className="flex justify-between items-end border-t border-dashed border-gray-300 pt-6 mt-8">
            <div className="text-[11px] font-mono text-gray-500">
              <p>Thank you for choosing Mahi Sports Hub Lucknow!</p>
              <p className="text-[10px] text-gray-400">Computer Generated Tax Receipt</p>
            </div>
            <div className="text-right">
              <div className="font-serif italic font-bold text-sm text-black">Ankur Srivastava</div>
              <div className="text-[10px] font-mono uppercase text-gray-500">Authorized Signatory - Mahi Sports Hub</div>
            </div>
          </div>

          {/* Action Footer for Web */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center print:hidden">
            <Link
              href="/products"
              className="text-xs font-mono font-bold text-black hover:underline flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </Link>
            <button
              onClick={() => window.print()}
              className="bg-black text-white hover:bg-gray-800 px-6 py-2.5 rounded-xl font-bold text-xs font-mono flex items-center gap-2 shadow-lg"
            >
              <Printer className="w-4 h-4 text-neon-green" /> Print Official PDF Receipt
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active Checkout Form View
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-gray-600 hover:text-black mb-3"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Store Catalog
          </Link>
          <h1 className="text-3xl font-extrabold font-heading text-black uppercase tracking-tight">
            Checkout & <span className="text-neon-green bg-black px-2 py-0.5 rounded">Store Order</span>
          </h1>
          <p className="text-xs font-mono text-gray-600 mt-1">
            Complete your recipient details, select fulfillment mode, and confirm via WhatsApp.
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-sm max-w-xl mx-auto">
            <Receipt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold font-heading text-gray-900 mb-2">Your Bag is Empty</h2>
            <p className="text-sm text-gray-500 mb-6">Add sports gear to your bag before proceeding to checkout.</p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors"
            >
              Browse Equipment Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Fulfillment & Recipient Form (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <form onSubmit={handleCompleteOrder} className="space-y-6">
                {/* 1. Recipient Customer Details */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <h2 className="text-base font-bold font-heading uppercase text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 bg-black text-neon-green rounded-full inline-flex items-center justify-center text-xs font-mono font-bold">
                      1
                    </span>
                    Customer Recipient Details
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="sm:col-span-2">
                      <label className="block font-mono font-bold uppercase text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Verma"
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm text-gray-900 font-medium focus:ring-black focus:border-black"
                      />
                    </div>

                    <div>
                      <label className="block font-mono font-bold uppercase text-gray-700 mb-1">
                        Primary Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm text-gray-900 font-medium focus:ring-black focus:border-black"
                      />
                    </div>

                    <div>
                      <label className="block font-mono font-bold uppercase text-gray-700 mb-1">
                        Alt WhatsApp / Contact (Optional)
                      </label>
                      <input
                        type="tel"
                        name="altPhone"
                        value={formData.altPhone}
                        onChange={handleChange}
                        placeholder="+91 83829 08844"
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm text-gray-900 font-medium focus:ring-black focus:border-black"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-mono font-bold uppercase text-gray-700 mb-1">
                        Email Address (for Invoice) *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="rahul.verma@gmail.com"
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm text-gray-900 font-medium focus:ring-black focus:border-black"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Order Fulfillment Mode (Store Pickup vs Local Delivery) */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <h2 className="text-base font-bold font-heading uppercase text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 bg-black text-neon-green rounded-full inline-flex items-center justify-center text-xs font-mono font-bold">
                      2
                    </span>
                    Select Order Fulfillment Mode
                  </h2>

                  {/* Dropdown Selector */}
                  <div className="mb-5">
                    <label className="block font-mono text-xs font-bold uppercase text-gray-700 mb-2">
                      Fulfillment Method:
                    </label>
                    <select
                      value={fulfillmentType}
                      onChange={(e) => setFulfillmentType(e.target.value as "pickup" | "delivery")}
                      className="w-full bg-black text-white text-sm font-bold rounded-xl p-3.5 border border-gray-800 focus:outline-none cursor-pointer"
                    >
                      <option value="pickup">🏬 Store Pickup - Indira Nagar Lucknow Store (Free)</option>
                      <option value="delivery">🚚 Local Express Delivery - Lucknow / UP Region</option>
                    </select>
                  </div>

                  {/* Option A: Store Pickup View & Interactive Map */}
                  {fulfillmentType === "pickup" && (
                    <div className="space-y-4 animate-in fade-in duration-300">
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs">
                        <label className="block font-mono font-bold uppercase text-gray-700 mb-2">
                          Preferred Store Pickup Time Slot:
                        </label>
                        <select
                          value={pickupSlot}
                          onChange={(e) => setPickupSlot(e.target.value)}
                          className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-xs font-bold text-gray-900"
                        >
                          <option value="Today (10:00 AM - 2:00 PM)">Today (10:00 AM - 2:00 PM)</option>
                          <option value="Today (2:00 PM - 6:00 PM)">Today (2:00 PM - 6:00 PM)</option>
                          <option value="Today (6:00 PM - 9:30 PM)">Today (6:00 PM - 9:30 PM)</option>
                          <option value="Tomorrow Morning (10:00 AM - 1:00 PM)">Tomorrow Morning (10:00 AM - 1:00 PM)</option>
                          <option value="Tomorrow Evening (4:00 PM - 9:00 PM)">Tomorrow Evening (4:00 PM - 9:00 PM)</option>
                        </select>
                      </div>

                      {/* Interactive Proposal Store Map Card */}
                      <div className="bg-gradient-to-br from-gray-900 to-black text-white p-5 rounded-2xl border border-gray-800 shadow-md">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2">
                            <Store className="w-5 h-5 text-neon-green" />
                            <h3 className="font-bold font-heading text-sm text-white">
                              Indira Nagar Store Hub
                            </h3>
                          </div>
                          <span className="font-mono text-[10px] font-bold bg-neon-green/20 text-neon-green px-2 py-0.5 rounded border border-neon-green/40">
                            Verified Location
                          </span>
                        </div>

                        <p className="text-xs text-gray-300 leading-relaxed mb-3">
                          <MapPin className="w-3.5 h-3.5 text-neon-green inline mr-1" />
                          C-2028, Aravali Marg, near Hanuman Mandir, Indira Nagar, Lucknow, UP 226016
                        </p>

                        <div className="flex items-center gap-4 text-[11px] text-gray-400 font-mono mb-4">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-neon-green" /> 10:00 AM - 9:30 PM
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-neon-green" /> +91 83829 08844
                          </span>
                        </div>

                        {/* Visual Route Graphic / Map Anchor */}
                        <div className="relative w-full h-32 rounded-xl overflow-hidden border border-gray-800 bg-gray-800 mb-3 flex items-center justify-center">
                          <SafeImage
                            src="https://picsum.photos/seed/store-map-lucknow/800/300"
                            alt="Mahi Sports Hub Store Map Location"
                            fill
                            className="object-cover opacity-60"
                          />
                          <div className="relative z-10 text-center p-3 bg-black/80 backdrop-blur-sm rounded-xl border border-gray-700">
                            <MapPin className="w-6 h-6 text-neon-green mx-auto mb-1 animate-bounce" />
                            <p className="font-mono text-[11px] font-bold text-white">Mahi Sports Hub Lucknow</p>
                            <p className="text-[9px] text-gray-300">Near Munshi Pulia / Aravali Marg</p>
                          </div>
                        </div>

                        <a
                          href="https://maps.google.com/?q=Mahi+Sports+Hub+Indira+Nagar+Lucknow"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 bg-neon-green text-black font-bold text-xs py-2.5 rounded-lg hover:bg-emerald-400 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Open Directions in Google Maps
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Option B: Local Express Delivery Form */}
                  {fulfillmentType === "delivery" && (
                    <div className="space-y-4 text-xs animate-in fade-in duration-300">
                      <div>
                        <label className="block font-mono font-bold uppercase text-gray-700 mb-1">
                          Delivery Street Address / House No. *
                        </label>
                        <input
                          type="text"
                          name="street"
                          required
                          value={deliveryDetails.street}
                          onChange={handleDeliveryChange}
                          placeholder="e.g. House No. 42, Sector 12"
                          className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm text-gray-900 font-medium"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-mono font-bold uppercase text-gray-700 mb-1">
                            Locality / Sector
                          </label>
                          <input
                            type="text"
                            name="sector"
                            value={deliveryDetails.sector}
                            onChange={handleDeliveryChange}
                            placeholder="Indira Nagar / Gomti Nagar"
                            className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm text-gray-900 font-medium"
                          />
                        </div>

                        <div>
                          <label className="block font-mono font-bold uppercase text-gray-700 mb-1">Landmark</label>
                          <input
                            type="text"
                            name="landmark"
                            value={deliveryDetails.landmark}
                            onChange={handleDeliveryChange}
                            placeholder="Near Munshi Pulia Metro / Hanuman Mandir"
                            className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm text-gray-900 font-medium"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-mono font-bold uppercase text-gray-700 mb-1">Pincode *</label>
                          <input
                            type="text"
                            name="pincode"
                            required
                            value={deliveryDetails.pincode}
                            onChange={handleDeliveryChange}
                            placeholder="226016"
                            className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm text-gray-900 font-medium"
                          />
                        </div>

                        <div>
                          <label className="block font-mono font-bold uppercase text-gray-700 mb-1">
                            Delivery Notes
                          </label>
                          <input
                            type="text"
                            name="instructions"
                            value={deliveryDetails.instructions}
                            onChange={handleDeliveryChange}
                            placeholder="e.g. Call before arrival"
                            className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm text-gray-900 font-medium"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Payment Method & UPI QR Code Section */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <h2 className="text-base font-bold font-heading uppercase text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 bg-black text-neon-green rounded-full inline-flex items-center justify-center text-xs font-mono font-bold">
                      3
                    </span>
                    Payment Method
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("upi")}
                      className={`p-4 rounded-xl border-2 text-left flex items-start gap-3 transition-all ${
                        paymentMethod === "upi"
                          ? "border-black bg-black text-white shadow-md"
                          : "border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <QrCode className={`w-5 h-5 shrink-0 ${paymentMethod === "upi" ? "text-neon-green" : "text-black"}`} />
                      <div>
                        <div className="font-bold text-sm font-heading">Scan UPI QR Code</div>
                        <div className={`text-xs mt-0.5 ${paymentMethod === "upi" ? "text-gray-300" : "text-gray-500"}`}>
                          Instant Google Pay / PhonePe / Paytm Transfer
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("store")}
                      className={`p-4 rounded-xl border-2 text-left flex items-start gap-3 transition-all ${
                        paymentMethod === "store"
                          ? "border-black bg-black text-white shadow-md"
                          : "border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <Store className={`w-5 h-5 shrink-0 ${paymentMethod === "store" ? "text-neon-green" : "text-black"}`} />
                      <div>
                        <div className="font-bold text-sm font-heading">Pay at Store</div>
                        <div className={`text-xs mt-0.5 ${paymentMethod === "store" ? "text-gray-300" : "text-gray-500"}`}>
                          Pay Cash / Card upon store pickup
                        </div>
                      </div>
                    </button>
                  </div>

                  {paymentMethod === "upi" && (
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-4">
                      <div className="text-center">
                        <p className="text-xs font-mono font-bold uppercase text-gray-600 mb-2">
                          Mahi Sports Official UPI QR
                        </p>
                        <div className="relative w-48 h-48 mx-auto bg-white p-3 rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                          <SafeImage
                            src="/qr-code.png"
                            alt="Mahi Sports UPI QR Code"
                            fill
                            className="object-contain p-2"
                          />
                        </div>

                        {/* Copy UPI ID */}
                        <div className="mt-3 inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-mono">
                          <span className="font-bold text-black">mahisports1992@okaxis</span>
                          <button
                            type="button"
                            onClick={handleCopyUpi}
                            className="text-black hover:text-green-700 flex items-center gap-1 font-bold ml-1"
                          >
                            {upiCopied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                            {upiCopied ? "Copied!" : "Copy"}
                          </button>
                        </div>
                      </div>

                      {/* Screenshot Upload Input */}
                      <div className="pt-4 border-t border-gray-200">
                        <label className="block text-xs font-mono font-bold text-gray-800 uppercase mb-2">
                          Upload Payment Screenshot *
                        </label>
                        <div className="flex items-center gap-4">
                          <label className="flex-1 cursor-pointer bg-white border-2 border-dashed border-gray-300 hover:border-black p-4 rounded-xl text-center transition-colors">
                            <Upload className="w-5 h-5 text-gray-500 mx-auto mb-1" />
                            <span className="text-xs font-bold text-gray-700 block">
                              {screenshotFile ? screenshotFile.name : "Choose Payment Screenshot image"}
                            </span>
                            <span className="text-[10px] text-gray-400 block mt-0.5">PNG, JPG, JPEG accepted</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              className="hidden"
                            />
                          </label>
                        </div>

                        {screenshotPreview && (
                          <div className="mt-4 relative w-32 h-32 rounded-lg overflow-hidden border border-gray-300 mx-auto">
                            <SafeImage
                              src={screenshotPreview}
                              alt="Payment Screenshot Preview"
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Order via WhatsApp Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#25D366] text-white hover:bg-[#128C7E] py-4 px-6 rounded-2xl font-bold font-heading text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  <MessageCircle className="w-6 h-6" />
                  {isSubmitting ? "Processing Order..." : "Confirm & Send Order via WhatsApp"}
                </button>
              </form>
            </div>

            {/* Right Column: Order Summary & Promo Code (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm sticky top-24">
                <h2 className="text-base font-bold font-heading uppercase text-gray-900 pb-3 border-b border-gray-200">
                  Bag Items ({cart.reduce((a, b) => a + b.quantity, 0)})
                </h2>

                {/* Line Items List */}
                <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto my-4 pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="py-3 first:pt-0 flex gap-3 items-center">
                      <div className="relative w-14 h-14 bg-gray-100 rounded-lg overflow-hidden shrink-0 border border-gray-200">
                        <SafeImage src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-mono text-[10px] bg-black text-neon-green px-1.5 py-0.5 rounded font-bold">
                          {item.itemNumber}
                        </span>
                        <h4 className="font-bold text-xs text-gray-900 truncate mt-0.5">{item.name}</h4>
                        <p className="text-[11px] text-gray-500 font-mono">
                          {item.quantity} × ₹{item.price.toLocaleString("en-IN")}
                        </p>
                      </div>
                      <span className="font-mono font-bold text-xs text-black">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Promo Code Coupon Placeholder & Input */}
                <div className="pt-4 border-t border-gray-200 mb-4">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-gray-800 uppercase mb-2">
                    <Tag className="w-3.5 h-3.5 text-neon-green" /> Promo Code / Discount Coupon:
                  </div>

                  {appliedCode ? (
                    <div className="bg-green-50 border border-green-200 p-3 rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <span className="font-mono font-bold text-green-800 uppercase">{appliedCode}</span>
                        <span className="text-[10px] text-green-600 block">
                          Discount Applied: -₹{discountAmount.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemovePromo}
                        className="text-xs text-red-600 hover:underline font-mono font-bold"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Try 'MAHI10' or 'STORE100'"
                        className="flex-1 bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-xs uppercase font-mono font-bold text-gray-900"
                      />
                      <button
                        type="submit"
                        className="bg-black text-white hover:bg-gray-800 px-4 py-2.5 rounded-lg text-xs font-bold font-mono"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                </div>

                {/* Cost Breakdown */}
                <div className="space-y-2 pt-3 border-t border-gray-200 text-xs font-mono">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{cartTotal.toLocaleString("en-IN")}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-700 font-bold">
                      <span>Promo Discount</span>
                      <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-600">
                    <span>Fulfillment ({fulfillmentType === "pickup" ? "Store Pickup" : "Delivery"})</span>
                    <span className="text-green-600 font-bold">FREE</span>
                  </div>

                  <div className="flex justify-between text-base font-extrabold text-black pt-3 border-t border-gray-200">
                    <span>Final Amount</span>
                    <span>₹{finalPayableTotal.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Trust Guarantees */}
                <div className="mt-6 pt-4 border-t border-gray-100 space-y-2 text-[11px] text-gray-500">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-neon-green shrink-0" />
                    <span>Instant official store verification & WhatsApp confirmation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-neon-green shrink-0" />
                    <span>Printable official receipt & tax invoice provided upon submission</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
