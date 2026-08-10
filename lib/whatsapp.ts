export const MAHI_WHATSAPP_NUMBER = "918382908844"; // +91 8382908844

export function getWhatsAppUrl(message: string): string {
  return `https://wa.me/${MAHI_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(message: string) {
  const url = getWhatsAppUrl(message);
  if (typeof window !== "undefined") {
    window.open(url, "_blank");
  }
}

/**
 * Generate polite, professional WhatsApp message for general store inquiries
 */
export function buildGeneralInquiryMessage(): string {
  return (
    `Respected Mahi Sports Hub Team,\n\n` +
    `Greetings! I am visiting your store portal and would like to inquire about sports gear and custom equipment available at your Indira Nagar, Lucknow branch.\n\n` +
    `Kindly assist me with current availability and store hours.\n\n` +
    `Sincerely,\nValued Customer`
  );
}

/**
 * Generate polite, professional WhatsApp message for a specific product inquiry
 */
export function buildProductInquiryMessage(productName: string, itemNumber?: string, price?: number): string {
  let msg = `Respected Mahi Sports Hub Team,\n\n`;
  msg += `I am interested in inquiring about the following item from your store catalog:\n`;
  msg += `- *Product:* ${productName}\n`;
  if (itemNumber) msg += `- *Item Code:* ${itemNumber}\n`;
  if (price) msg += `- *Price:* ₹${price.toLocaleString("en-IN")}\n`;
  msg += `\nCould you please share details regarding stock availability, custom options, or store pickup?\n\n`;
  msg += `Thank you for your time and guidance.\n\n`;
  msg += `Sincerely,\nInterested Athlete / Customer`;
  return msg;
}

/**
 * Generate polite, professional WhatsApp message for ordering a single product directly
 */
export function buildQuickOrderMessage(productName: string, itemNumber?: string, price?: number): string {
  let msg = `Respected Mahi Sports Hub Team,\n\n`;
  msg += `I would like to place an order for the following item:\n`;
  msg += `- *Product:* ${productName}\n`;
  if (itemNumber) msg += `- *Item Code:* ${itemNumber}\n`;
  if (price) msg += `- *Price:* ₹${price.toLocaleString("en-IN")}\n`;
  msg += `\nKindly confirm availability and let me know the process for payment and store pickup/delivery in Lucknow.\n\n`;
  msg += `Thank you,\nValued Customer`;
  return msg;
}

/**
 * Generate comprehensive, polite, professional WhatsApp message for a full Checkout Order
 */
export function buildCheckoutOrderMessage(params: {
  invoiceId: string;
  date: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  alternatePhone?: string;
  fulfillmentType: "pickup" | "delivery";
  pickupTimeOrAddress: string;
  items: Array<{ name: string; itemNumber?: string; quantity: number; price: number }>;
  subtotal: number;
  discount: number;
  finalTotal: number;
  paymentMethod: string;
}): string {
  const {
    invoiceId,
    date,
    customerName,
    customerPhone,
    customerEmail,
    alternatePhone,
    fulfillmentType,
    pickupTimeOrAddress,
    items,
    subtotal,
    discount,
    finalTotal,
    paymentMethod,
  } = params;

  let msg = `*RESPECTED MAHI SPORTS HUB TEAM*\n`;
  msg += `*OFFICIAL STORE ORDER SUBMISSION*\n`;
  msg += `------------------------------------\n`;
  msg += `*Invoice ID:* ${invoiceId}\n`;
  msg += `*Order Date:* ${date}\n\n`;

  msg += `*CUSTOMER INFORMATION*\n`;
  msg += `• *Name:* ${customerName}\n`;
  msg += `• *Phone:* ${customerPhone}\n`;
  if (alternatePhone) msg += `• *Alt WhatsApp/Phone:* ${alternatePhone}\n`;
  msg += `• *Email:* ${customerEmail}\n\n`;

  msg += `*FULFILLMENT DETAILS*\n`;
  msg += `• *Mode:* ${fulfillmentType === "pickup" ? "🏬 Store Pickup (Indira Nagar Branch)" : "🚚 Express Local Delivery (Lucknow / UP)"}\n`;
  msg += `• *Details / Address:* ${pickupTimeOrAddress}\n\n`;

  msg += `*ITEMIZED ORDER SUMMARY*\n`;
  items.forEach((item, index) => {
    msg += `${index + 1}. [${item.itemNumber || "MSH"}] ${item.name}\n`;
    msg += `   Qty: ${item.quantity} × ₹${item.price.toLocaleString("en-IN")} = ₹${(item.quantity * item.price).toLocaleString("en-IN")}\n`;
  });

  msg += `------------------------------------\n`;
  msg += `• *Subtotal:* ₹${subtotal.toLocaleString("en-IN")}\n`;
  if (discount > 0) {
    msg += `• *Promo Discount:* -₹${discount.toLocaleString("en-IN")}\n`;
  }
  msg += `• *FINAL TOTAL:* ₹${finalTotal.toLocaleString("en-IN")}\n`;
  msg += `• *Payment Method:* ${paymentMethod}\n\n`;

  msg += `Kindly review and acknowledge this order at your earliest convenience. Thank you sincerely for your assistance!\n\n`;
  msg += `Best regards,\n${customerName}`;

  return msg;
}
