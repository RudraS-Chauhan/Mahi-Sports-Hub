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
  "Cricket Bat",
  "Batting Pads",
  "Batting Gloves",
  "Sports Gloves",
  "Yoga Mats",
  "Accessories",
  "Football",
  "Badminton",
  "Tennis",
  "Footwear",
  "Fitness"
];

export const products: Product[] = [
  {
    id: "bat-1",
    name: "Premium English Willow Cricket Bat",
    description: "Grade 1 English Willow cricket bat with massive edges and exquisite balance. Perfect for professional play.",
    price: 8500,
    originalPrice: 10500,
    category: "Cricket Bat",
    image: "https://picsum.photos/seed/bat1/600/600",
    inStock: true,
    isBestSeller: true,
  },
  {
    id: "bat-2",
    name: "Kashmir Willow Practice Bat",
    description: "Durable Kashmir willow bat ideal for net practice and tennis ball cricket. Great value for money.",
    price: 1499,
    originalPrice: 1999,
    category: "Cricket Bat",
    image: "https://picsum.photos/seed/bat2/600/600",
    inStock: true,
  },
  {
    id: "pad-1",
    name: "Pro Series Batting Pads",
    description: "Lightweight, high-density foam batting pads offering maximum protection and mobility at the crease.",
    price: 2200,
    category: "Batting Pads",
    image: "https://picsum.photos/seed/pad1/600/600",
    inStock: true,
    isBestSeller: true,
  },
  {
    id: "glove-1",
    name: "Test Match Batting Gloves",
    description: "Sheep leather palm batting gloves with sausage finger design for ultimate protection and comfort.",
    price: 1250,
    category: "Batting Gloves",
    image: "https://picsum.photos/seed/glove1/600/600",
    inStock: true,
  },
  {
    id: "sglove-1",
    name: "All-Weather Sports Gloves",
    description: "Breathable, anti-slip sports gloves suitable for gym, cycling, and general fitness training.",
    price: 450,
    category: "Sports Gloves",
    image: "https://picsum.photos/seed/sglove1/600/600",
    inStock: true,
  },
  {
    id: "yoga-1",
    name: "Anti-Slip TPE Yoga Mat (6mm)",
    description: "Eco-friendly, dual-color TPE yoga mat with alignment lines. Includes carrying strap.",
    price: 899,
    originalPrice: 1200,
    category: "Yoga Mats",
    image: "https://picsum.photos/seed/yoga1/600/600",
    inStock: true,
    isBestSeller: true,
  },
  {
    id: "acc-1",
    name: "Cricket Kit Bag with Wheels",
    description: "Spacious cricket kit bag with heavy-duty wheels and multiple compartments for all your gear.",
    price: 2800,
    category: "Accessories",
    image: "https://picsum.photos/seed/bag1/600/600",
    inStock: true,
  },
  {
    id: "acc-2",
    name: "Professional Skipping Rope",
    description: "Adjustable speed skipping rope with aluminum handles and steel wire cable for intense cardio.",
    price: 350,
    category: "Accessories",
    image: "https://picsum.photos/seed/rope1/600/600",
    inStock: true,
  },
  {
    id: "fb-1",
    name: "Pro Match Football Size 5",
    description: "FIFA quality pro match football with seamless surface for a more predictable trajectory and better touch.",
    price: 1299,
    originalPrice: 1599,
    category: "Football",
    image: "https://picsum.photos/seed/football1/600/600",
    inStock: true,
    isBestSeller: true,
  },
  {
    id: "bad-1",
    name: "Carbon Fiber Badminton Racket",
    description: "Ultra-lightweight carbon fiber badminton racket with high string tension for powerful smashes.",
    price: 1850,
    category: "Badminton",
    image: "https://picsum.photos/seed/badminton1/600/600",
    inStock: true,
  },
  {
    id: "ten-1",
    name: "Championship Tennis Racket",
    description: "Graphite composite tennis racket providing an excellent blend of power and control for intermediate players.",
    price: 3200,
    originalPrice: 4000,
    category: "Tennis",
    image: "https://picsum.photos/seed/tennis1/600/600",
    inStock: true,
  },
  {
    id: "shoe-1",
    name: "Athletic Running Shoes",
    description: "Breathable mesh running shoes with responsive cushioning and durable rubber outsole.",
    price: 2499,
    category: "Footwear",
    image: "https://picsum.photos/seed/shoes1/600/600",
    inStock: true,
    isBestSeller: true,
  },
  {
    id: "fit-1",
    name: "Adjustable Dumbbell Set (10kg)",
    description: "Cast iron adjustable dumbbell set with spinlock collars. Perfect for home workouts.",
    price: 1800,
    category: "Fitness",
    image: "https://picsum.photos/seed/dumbbells1/600/600",
    inStock: true,
  },
  {
    id: "acc-3",
    name: "Premium Gym Duffle Bag",
    description: "Water-resistant gym duffle bag with a dedicated shoe compartment and wet pocket.",
    price: 950,
    category: "Accessories",
    image: "https://picsum.photos/seed/gymbag1/600/600",
    inStock: true,
  },
  {
    id: "acc-4",
    name: "Stainless Steel Protein Shaker",
    description: "750ml stainless steel protein shaker bottle with wire whisk ball and leak-proof lid.",
    price: 599,
    category: "Accessories",
    image: "https://picsum.photos/seed/shaker1/600/600",
    inStock: true,
  }
];
