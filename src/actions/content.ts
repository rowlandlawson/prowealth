"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { uploadImage } from "@/lib/cloudinary";

export async function getAllContent() {
  try {
    const content = await db.siteContent.findMany();
    return content;
  } catch (error) {
    console.error("Error fetching site content:", error);
    throw new Error("Failed to fetch site content");
  }
}

export async function getContentMap() {
  try {
    const content = await db.siteContent.findMany();
    const contentMap = content.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {} as Record<string, string>);
    return contentMap;
  } catch {
    return {};
  }
}

export async function updateContent(key: string, formData: FormData) {
  try {
    const isImage = formData.get("isImage") === "true";
    const section = formData.get("section") as string;
    let value = "";

    if (isImage) {
      const file = formData.get("value") as File;
      if (file && file.size > 0) {
        const uploadResult = await uploadImage(file, "prowealth/site");
        value = uploadResult.url;
      } else {
        // Did not provide a new file, just keep existing
        return { success: true };
      }
    } else {
      value = formData.get("value") as string;
    }

    await db.siteContent.upsert({
      where: { key },
      update: { value },
      create: {
        key,
        section: section || "General",
        value,
      }
    });

    revalidatePath("/");
    revalidatePath("/admin/content");
    return { success: true };
  } catch (error) {
    console.error(`Error updating content for key ${key}:`, error);
    throw new Error("Failed to update content");
  }
}
