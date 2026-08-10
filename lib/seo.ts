export interface PageSEO {
  title: string;
  description: string;
}

export const ROUTE_SEO_MAP: Record<string, PageSEO> = {
  "/": {
    title: "Home - Mahi Sports Hub | Premium Sports Gear in Lucknow",
    description: "Premium cricket bats, custom jerseys, protective gear in Indira Nagar, Lucknow. 4.8★ Rated by local athletes.",
  },
  "/products": {
    title: "Shop - Mahi Sports Hub",
    description: "Explore English Willow bats, Kashmir Willow bats, protective gear, and sublimated custom apparel.",
  },
  "/cart": {
    title: "Bag - Mahi Sports Hub",
    description: "Review items in your shopping bag and proceed to order via WhatsApp or store checkout.",
  },
  "/checkout": {
    title: "Checkout - Mahi Sports Hub",
    description: "Complete your sports gear order with local Indira Nagar store pickup or express delivery in UP.",
  },
  "/contact": {
    title: "Contact Us - Mahi Sports Hub",
    description: "Visit our store in Indira Nagar, Lucknow or contact us via phone and WhatsApp for sports equipment inquiries.",
  },
  "/about": {
    title: "About Us - Mahi Sports Hub",
    description: "Learn about Mahi Sports Hub, Lucknow's premier sports store founded by Ankur Srivastava.",
  },
};

export function getPageSEO(pathname: string): PageSEO {
  if (ROUTE_SEO_MAP[pathname]) {
    return ROUTE_SEO_MAP[pathname];
  }

  const pageName = pathname
    .split("/")
    .filter(Boolean)
    .pop();

  if (!pageName) {
    return ROUTE_SEO_MAP["/"];
  }

  const formattedName = pageName.charAt(0).toUpperCase() + pageName.slice(1);
  return {
    title: `${formattedName} - Mahi Sports Hub`,
    description: `Mahi Sports Hub - Premium Sports Equipment and Custom Sportswear in Lucknow.`,
  };
}

export function updateDocumentSEO(pathname: string) {
  if (typeof window === "undefined") return;

  const { title, description } = getPageSEO(pathname);

  document.title = title;

  let metaTag = document.querySelector('meta[name="description"]');
  if (!metaTag) {
    metaTag = document.createElement("meta");
    metaTag.setAttribute("name", "description");
    document.head.appendChild(metaTag);
  }
  metaTag.setAttribute("content", description);
}
