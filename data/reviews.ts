export interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
  tag?: string;
}

export const reviews: Review[] = [
  {
    id: 1,
    name: "Rahul Singh",
    rating: 5,
    text: "Very good behavior of the owner Ankur. Affordable price and authentic quality products. Highly recommend for cricket gear in Indira Nagar!",
    date: "2 months ago",
    tag: "Grade 1 Willow Bat"
  },
  {
    id: 2,
    name: "Amit Sharma",
    rating: 5,
    text: "Best sports shop in Lucknow. Ordered custom sublimated jerseys for our local cricket tournament. Vibrant colors, perfect fit, and fast delivery.",
    date: "3 weeks ago",
    tag: "Custom Team Jersey"
  },
  {
    id: 3,
    name: "Vikash Yadav",
    rating: 5,
    text: "Good collection of sports accessories. The owner is very knowledgeable and helped me pick the right bat weight and grain balance.",
    date: "1 month ago",
    tag: "Bat Selection Guidance"
  },
  {
    id: 4,
    name: "Priya Patel",
    rating: 5,
    text: "Purchased a Grade 1 English Willow bat for my brother. Genuine products with pre-oiling and machine knocking service. Will definitely visit again!",
    date: "4 months ago",
    tag: "English Willow Bat"
  },
  {
    id: 5,
    name: "Saurabh Mishra",
    rating: 5,
    text: "Wholesale pricing compared to other stores in Lucknow. Got full protective kit including pads, gloves, and helmet at unbeatable rates.",
    date: "2 weeks ago",
    tag: "Full Cricket Protection Kit"
  },
  {
    id: 6,
    name: "Deepak Verma",
    rating: 5,
    text: "Mahi Sports Hub is my go-to shop for club cricket gear. Honest advice, top-notch equipment, and super easy WhatsApp ordering.",
    date: "1 week ago",
    tag: "Club Cricket Gear"
  },
  {
    id: 7,
    name: "Aman Rastogi",
    rating: 5,
    text: "Great experience with store pickup! Checked stock on WhatsApp, reached the Indira Nagar store, and picked up my ready bat in 10 minutes.",
    date: "5 days ago",
    tag: "Store Express Pickup"
  }
];
