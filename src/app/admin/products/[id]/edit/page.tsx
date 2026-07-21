import { db } from "@/lib/db";
import ProductForm from "../../ProductForm";
import { notFound } from "next/navigation";

export default async function EditProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const product = await db.product.findUnique({
    where: { id: params.id },
  });

  if (!product) {
    notFound();
  }

  return <ProductForm initialData={product} />;
}
