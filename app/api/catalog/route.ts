import { NextRequest, NextResponse } from "next/server";
import CatalogService from "./services/index.service";
import { authGuard } from "@/lib/auth-guard";
import { uploadAvatar } from "@/lib/upload";
import { CatalogItemType } from "@/generated/enums";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const imageFile = formData.get("image") as File | null;
    let imageUrl: string | undefined;
    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadAvatar(imageFile);
    }

    const itemsRaw = formData.get("items") as string | null;

    const data = {
      name: formData.get("name") as string,
      description: (formData.get("description") as string) || undefined,
      price: Number(formData.get("price")),
      active: formData.get("active") === "true",
      type: formData.get("type") as CatalogItemType,
      barbershopId: formData.get("barbershopId") as string,
      image: imageUrl,
      duration: formData.get("duration")
        ? Number(formData.get("duration"))
        : undefined,
      category: (formData.get("category") as string) || undefined,
      items: itemsRaw ? JSON.parse(itemsRaw) : undefined,
    };

    const { error } = await authGuard(data.barbershopId);
    if (error) return error;

    const { post } = CatalogService();
    const item = await post(data);

    return NextResponse.json({ item }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
