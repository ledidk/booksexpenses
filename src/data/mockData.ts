import { Product, Category } from '../types';

export const categories: Category[] = [
  { id: 'all', name: 'All Products', slug: 'all', count: 24 },
  { id: 'electronics', name: 'Electronics', slug: 'electronics', count: 8 },
  { id: 'clothing', name: 'Clothing', slug: 'clothing', count: 6 },
  { id: 'home', name: 'Home & Garden', slug: 'home', count: 5 },
  { id: 'books', name: 'Books', slug: 'books', count: 3 },
  { id: 'sports', name: 'Sports', slug: 'sports', count: 2 },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Noise-Canceling Headphones',
    price: 299.99,
    originalPrice: 399.99,
    description: 'Premium wireless headphones with industry-leading noise cancellation technology. Perfect for music lovers and professionals.',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'electronics',
    rating: 4.8,
    reviews: 1247,
    inStock: true,
    featured: true,
    tags: ['wireless', 'noise-canceling', 'premium']
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 249.99,
    description: 'Advanced fitness tracking with heart rate monitoring, GPS, and 7-day battery life. Your perfect workout companion.',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'electronics',
    rating: 4.6,
    reviews: 892,
    inStock: true,
    featured: true
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    price: 29.99,
    description: 'Soft, breathable organic cotton t-shirt. Sustainably made with eco-friendly materials.',
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'clothing',
    rating: 4.4,
    reviews: 324,
    inStock: true
  },
  {
    id: '4',
    name: 'Ceramic Coffee Mug Set',
    price: 39.99,
    description: 'Beautiful handcrafted ceramic mugs. Set of 4 perfect for your morning coffee ritual.',
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'home',
    rating: 4.7,
    reviews: 156,
    inStock: true
  },
  {
    id: '5',
    name: 'Bluetooth Portable Speaker',
    price: 79.99,
    originalPrice: 99.99,
    description: 'Compact wireless speaker with rich, room-filling sound. Waterproof design for any adventure.',
    image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'electronics',
    rating: 4.5,
    reviews: 678,
    inStock: true,
    featured: true
  },
  {
    id: '6',
    name: 'Classic Denim Jacket',
    price: 89.99,
    description: 'Timeless denim jacket with a modern fit. Perfect for layering in any season.',
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'clothing',
    rating: 4.3,
    reviews: 445,
    inStock: true
  },
  {
    id: '7',
    name: 'Indoor Plant Collection',
    price: 59.99,
    description: 'Set of 3 low-maintenance indoor plants. Perfect for brightening up your living space.',
    image: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'home',
    rating: 4.6,
    reviews: 234,
    inStock: true
  },
  {
    id: '8',
    name: 'Programming Fundamentals Book',
    price: 34.99,
    description: 'Comprehensive guide to programming fundamentals. Perfect for beginners and intermediate developers.',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'books',
    rating: 4.8,
    reviews: 567,
    inStock: true
  },
  {
    id: '9',
    name: 'Wireless Mouse',
    price: 49.99,
    description: 'Ergonomic wireless mouse with precision tracking. Perfect for work and gaming.',
    image: 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'electronics',
    rating: 4.4,
    reviews: 789,
    inStock: true
  },
  {
    id: '10',
    name: 'Cozy Wool Sweater',
    price: 79.99,
    description: 'Warm and comfortable wool sweater. Perfect for chilly days and cozy evenings.',
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'clothing',
    rating: 4.5,
    reviews: 312,
    inStock: true
  },
  {
    id: '11',
    name: 'Kitchen Knife Set',
    price: 129.99,
    originalPrice: 179.99,
    description: 'Professional-grade kitchen knives for all your culinary needs. Includes storage block.',
    image: 'https://images.pexels.com/photos/2534343/pexels-photo-2534343.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'home',
    rating: 4.9,
    reviews: 423,
    inStock: true
  },
  {
    id: '12',
    name: 'Running Shoes',
    price: 119.99,
    description: 'Lightweight running shoes with superior cushioning and support. Built for performance.',
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'sports',
    rating: 4.7,
    reviews: 634,
    inStock: true
  }
];