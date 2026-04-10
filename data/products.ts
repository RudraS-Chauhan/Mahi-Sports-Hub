export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  inStock: boolean;
  isBestSeller?: boolean;
}

export const categories = [
  "Cricket Bats",
  "Cricket Gear",
  "Custom Jerseys",
  "Custom Hats & Bags"
];

export const products: Product[] = [
  {
    id: "bat-1",
    name: "Premium English Willow Cricket Bat (Grade 1)",
    description: "Handcrafted Grade 1 English Willow cricket bat with massive edges and exquisite balance. Perfect for professional play.",
    price: 12500,
    originalPrice: 15000,
    category: "Cricket Bats",
    image: "https://picsum.photos/seed/bat1/600/600",
    inStock: true,
    isBestSeller: true,
  },
  {
    id: "bat-2",
    name: "Kashmir Willow Power Bat",
    description: "Durable Kashmir willow bat ideal for net practice and hard tennis ball cricket. Great value for money with a thick profile.",
    price: 1899,
    originalPrice: 2499,
    category: "Cricket Bats",
    image: "https://picsum.photos/seed/bat2/600/600",
    inStock: true,
  },
  {
    id: "bat-3",
    name: "Player Edition English Willow Bat",
    description: "Premium player edition bat with a mid-to-low sweet spot, designed for aggressive stroke play on subcontinent pitches.",
    price: 18500,
    category: "Cricket Bats",
    image: "https://picsum.photos/seed/bat3/600/600",
    inStock: true,
    isBestSeller: true,
  },
  {
    id: "gear-1",
    name: "Pro Series Batting Pads",
    description: "Lightweight, high-density foam batting pads offering maximum protection and mobility at the crease.",
    price: 2200,
    category: "Cricket Gear",
    image: "https://picsum.photos/seed/pad1/600/600",
    inStock: true,
    isBestSeller: true,
  },
  {
    id: "gear-2",
    name: "Test Match Batting Gloves",
    description: "Sheep leather palm batting gloves with sausage finger design for ultimate protection and comfort.",
    price: 1250,
    category: "Cricket Gear",
    image: "https://picsum.photos/seed/glove1/600/600",
    inStock: true,
  },
  {
    id: "gear-3",
    name: "Titanium Grille Cricket Helmet",
    description: "High-impact polymer shell helmet with a titanium grille. Offers superior head protection without compromising visibility.",
    price: 3500,
    originalPrice: 4200,
    category: "Cricket Gear",
    image: "https://picsum.photos/seed/helmet1/600/600",
    inStock: true,
  },
  {
    id: "jersey-1",
    name: "Custom Sublimation Team Jersey",
    description: "Fully customizable team jersey with breathable, moisture-wicking fabric. Add your team logo, name, and number.",
    price: 899,
    category: "Custom Jerseys",
    image: "https://picsum.photos/seed/jersey1/600/600",
    inStock: true,
    isBestSeller: true,
  },
  {
    id: "jersey-2",
    name: "Premium Cricket Whites (Set)",
    description: "Classic test match cricket whites. Includes a comfortable, stretchable shirt and trousers designed for long days in the field.",
    price: 1499,
    category: "Custom Jerseys",
    image: "https://picsum.photos/seed/whites1/600/600",
    inStock: true,
  },
  {
    id: "acc-1",
    name: "Pro Athletic Sports Socks (3-Pack)",
    description: "Cushioned sports socks with arch support and moisture-wicking technology. Perfect for long hours on the field.",
    price: 499,
    category: "Custom Hats & Bags",
    image: "https://picsum.photos/seed/socks1/600/600",
    inStock: true,
    isBestSeller: true,
  },
  {
    id: "acc-2",
    name: "Heavy Duty Cricket Kit Bag",
    description: "Spacious cricket kit bag with heavy-duty wheels, a dedicated bat compartment, and multiple pockets for all your gear.",
    price: 2800,
    category: "Custom Hats & Bags",
    image: "https://picsum.photos/seed/bag1/600/600",
    inStock: true,
  },
  {
    id: "acc-3",
    name: "Bat Grip Cone & Premium Grips",
    description: "Wooden bat grip applicator cone included with a pack of 3 premium chevron rubber bat grips.",
    price: 350,
    category: "Custom Hats & Bags",
    image: "https://picsum.photos/seed/grip1/600/600",
    inStock: true,
  }
];
