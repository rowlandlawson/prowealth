"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getTestimonials() {
  try {
    const testimonials = await db.testimonial.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return testimonials;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    throw new Error("Failed to fetch testimonials");
  }
}

export async function createTestimonial(formData: FormData) {
  try {
    const authorName = formData.get("authorName") as string;
    const location = formData.get("location") as string;
    const content = formData.get("content") as string;
    const ratingString = formData.get("rating") as string;
    const rating = ratingString ? parseInt(ratingString, 10) : 5;

    const newTestimonial = await db.testimonial.create({
      data: {
        authorName,
        location,
        content,
        rating,
      },
    });

    revalidatePath("/", "layout");
    revalidatePath("/"); // Revalidate homepage where testimonials might be shown
    return newTestimonial;
  } catch (error) {
    console.error("Error creating testimonial:", error);
    throw new Error("Failed to create testimonial");
  }
}

export async function updateTestimonial(id: string, formData: FormData) {
  try {
    const authorName = formData.get("authorName") as string;
    const location = formData.get("location") as string;
    const content = formData.get("content") as string;
    const ratingString = formData.get("rating") as string;
    const rating = ratingString ? parseInt(ratingString, 10) : 5;

    const updatedTestimonial = await db.testimonial.update({
      where: { id },
      data: {
        authorName,
        location,
        content,
        rating,
      },
    });

    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return updatedTestimonial;
  } catch (error) {
    console.error("Error updating testimonial:", error);
    throw new Error("Failed to update testimonial");
  }
}

export async function deleteTestimonial(id: string) {
  try {
    await db.testimonial.delete({
      where: { id },
    });

    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    throw new Error("Failed to delete testimonial");
  }
}
