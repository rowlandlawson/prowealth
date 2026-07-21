import { Product as PrismaProduct } from '@/generated/prisma/client';

export type Product = PrismaProduct;

export interface CartItem extends Product {
  quantity: number;
}
