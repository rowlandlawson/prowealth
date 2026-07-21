import { db } from "@/lib/db";
import Shop from '../../components/Shop';

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const products = await db.product.findMany({
    orderBy: { createdAt: "desc" }
  });

  return <Shop products={products} />;
}
