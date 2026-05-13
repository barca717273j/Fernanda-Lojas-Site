export interface Review {
  name: string;
  comment: string;
  rating: number;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  originalPrice: number;
  promoPrice: number;
  images: string[];
  stock: number;
  isSoldOut: boolean;
  soldCount?: number;
  rating?: number;
  reviews?: Review[];
  checkoutUrl?: string;
  isBestSeller?: boolean;
}

export interface CartItem extends Product {
  partner1Size: string;
  partner2Size: string;
  quantity: number;
}

export interface User {
  name: string;
  email: string;
  password?: string;
}

export type AppView = 'home' | 'product' | 'partial-address' | 'checkout' | 'payment-pending';
