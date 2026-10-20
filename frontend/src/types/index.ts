export interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: string | number; // Decimal from Prisma can serialize as string or number
  stock: number;
  imageUrl: string | null;
  categoryId: string;
  category?: Category;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  count?: number;
  data: T;
  message?: string;
  error?: string;
}
