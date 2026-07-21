import { Product as PrismaProduct } from '@/generated/prisma/client';

export type Product = Omit<PrismaProduct, 'imagePublicId' | 'createdAt' | 'updatedAt'> &
  Partial<Pick<PrismaProduct, 'imagePublicId' | 'createdAt' | 'updatedAt'>>;

export interface CartItem extends Product {
  quantity: number;
}
