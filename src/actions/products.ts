"use server";

import { db } from "@/lib/db";
import { uploadImage, deleteImage } from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

export async function getProducts(search?: string, category?: string) {
  try {
    const products = await db.product.findMany({
      where: {
        ...(search ? { name: { contains: search, mode: "insensitive" } } : {}),
        ...(category && category !== "All" ? { category } : {}),
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
}

export async function createProduct(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const category = formData.get("category") as string;
    const imageFile = formData.get("image") as File;
    const detailsString = formData.get("details") as string;
    const details = detailsString ? JSON.parse(detailsString) : [];

    let image = "";
    let imagePublicId = "";

    if (imageFile && imageFile.size > 0) {
      const uploadResult = await uploadImage(imageFile, "prowealth/products");
      image = uploadResult.url;
      imagePublicId = uploadResult.publicId;
    } else {
      throw new Error("Image is required");
    }

    const newProduct = await db.product.create({
      data: {
        name,
        description,
        price,
        category,
        image,
        imagePublicId,
        details,
      },
    });

    revalidatePath("/", "layout");
    return newProduct;
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Failed to create product");
  }
}

export async function updateProduct(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const category = formData.get("category") as string;
    const imageFile = formData.get("image") as File;
    const detailsString = formData.get("details") as string;
    const details = detailsString ? JSON.parse(detailsString) : [];

    const existingProduct = await db.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      throw new Error("Product not found");
    }

    let image = existingProduct.image;
    let imagePublicId = existingProduct.imagePublicId;

    // Check if a new file was provided (size > 0)
    console.log("[UPDATE] imageFile:", imageFile?.name, "size:", imageFile?.size, "type:", imageFile?.type);
    if (imageFile && imageFile.size > 0) {
      // Delete old image if it exists and has a publicId
      if (existingProduct.imagePublicId) {
        try {
          console.log("[UPDATE] Deleting old image:", existingProduct.imagePublicId);
          await deleteImage(existingProduct.imagePublicId);
          console.log("[UPDATE] Old image deleted successfully");
        } catch (delError) {
          console.error("[UPDATE] Failed to delete old image:", delError);
          // Proceed with upload anyway
        }
      }

      try {
        console.log("[UPDATE] Uploading new image...");
        const uploadResult = await uploadImage(imageFile, "prowealth/products");
        image = uploadResult.url;
        imagePublicId = uploadResult.publicId;
        console.log("[UPDATE] Upload successful:", image);
      } catch (uploadError) {
        console.error("[UPDATE] Upload FAILED:", uploadError);
        throw uploadError;
      }
    }

    const updatedProduct = await db.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        category,
        image,
        imagePublicId,
        details,
      },
    });

    revalidatePath("/", "layout");
    return updatedProduct;
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error("Failed to update product");
  }
}

export async function deleteProduct(id: string) {
  try {
    const product = await db.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    // Delete image from Cloudinary
    if (product.imagePublicId) {
      try {
        await deleteImage(product.imagePublicId);
      } catch (delError) {
        console.error("Failed to delete image from Cloudinary:", delError);
        // Continue to delete record anyway
      }
    }

    await db.product.delete({
      where: { id },
    });

    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Failed to delete product");
  }
}
