import fs from "fs/promises";
import path from "path";

type UploadProvider = "local"; // futuramente: "s3" | "cloudinary"

interface UploadResult {
  url: string;
}

const uploadLocal = async (file: File): Promise<UploadResult> => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = `${Date.now()}-${file.name.replace(/\s/g, "-")}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");

  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(path.join(uploadDir, filename), buffer);

  return { url: `/uploads/${filename}` };
};

// futuramente:
// const uploadS3 = async (file: File): Promise<UploadResult> => { ... }
// const uploadCloudinary = async (file: File): Promise<UploadResult> => { ... }

export const uploadAvatar = async (
  file: File,
  provider: UploadProvider = "local",
): Promise<string> => {
  if (!file || file.size === 0) throw new Error("Arquivo inválido");

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    throw new Error("Tipo de arquivo não permitido. Use JPG, PNG ou WEBP");
  }

  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    throw new Error("Arquivo muito grande. Máximo 5MB");
  }

  switch (provider) {
    case "local":
      return (await uploadLocal(file)).url;
    // futuramente:
    // case "s3":
    //   return (await uploadS3(file)).url;
    // case "cloudinary":
    //   return (await uploadCloudinary(file)).url;
    default:
      throw new Error("Provider de upload não suportado");
  }
};

export const deleteAvatar = async (
  url: string,
  provider: UploadProvider = "local",
): Promise<void> => {
  if (!url) return;

  if (provider === "local") {
    const filename = url.split("/uploads/")[1];
    if (!filename) return;
    const filePath = path.join(process.cwd(), "public", "uploads", filename);
    await fs.unlink(filePath).catch(() => null);
  }
};