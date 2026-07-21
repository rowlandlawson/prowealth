import { getProducts } from "@/actions/products";
import ProductsClient from "./ProductsClient";

export const dynamic = "force-dynamic";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { search?: string; category?: string };
}) {
  const search = searchParams.search || "";
  const category = searchParams.category || "All";

  const products = await getProducts(search, category);

  return (
    <ProductsClient
      initialProducts={products}
      initialSearch={search}
      initialCategory={category}
    />
  );
}
