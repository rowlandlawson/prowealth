import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(
  file: File,
  folder = "prowealth"
): Promise<{ url: string; publicId: string }> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Return a Promise so we can use async/await
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: "auto", // auto-detects image/video
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          reject(error);
        } else {
          resolve({
            url: result?.secure_url || "",
            publicId: result?.public_id || "",
          });
        }
      }
    );
    // Send the buffer to the stream
    uploadStream.end(buffer);
  });
}

export async function deleteImage(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}

export default cloudinary;