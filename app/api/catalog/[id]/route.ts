import { NextRequest, NextResponse } from "next/server";
import CatalogService from "../services/index.service";
import { authGuard } from "@/lib/auth-guard";
import { uploadAvatar, deleteAvatar } from "@/lib/upload";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { getById } = CatalogService();
    const item = await getById(id);

    const { error } = await authGuard(item.barbershopId);
    if (error) return error;

    return NextResponse.json({ item }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const formData = await req.formData();

    const { getById, put } = CatalogService();
    const item = await getById(id);

    const { error } = await authGuard(item.barbershopId);
    if (error) return error;

    const imageFile = formData.get("image") as File | null;
    let imageUrl: string | undefined;
    if (imageFile && imageFile.size > 0) {
      if (item.image) await deleteAvatar(item.image);
      imageUrl = await uploadAvatar(imageFile);
    }

    const itemsRaw = formData.get("items") as string | null;

    const data = {
      name: (formData.get("name") as string) || undefined,
      description: (formData.get("description") as string) || undefined,
      price: formData.get("price") ? Number(formData.get("price")) : undefined,
      active: formData.get("active")
        ? formData.get("active") === "true"
        : undefined,
      image: imageUrl,
      duration: formData.get("duration")
        ? Number(formData.get("duration"))
        : undefined,
      stock: formData.get("stock") ? Number(formData.get("stock")) : undefined,
      category: (formData.get("category") as string) || undefined,
      items: itemsRaw ? JSON.parse(itemsRaw) : undefined,
    };

    const updated = await put(id, data);

    return NextResponse.json({ item: updated }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { getById, remove } = CatalogService();
    const item = await getById(id);

    const { error } = await authGuard(item.barbershopId);
    if (error) return error;

    if (item.image) await deleteAvatar(item.image);
    await remove(id);

    return NextResponse.json({ message: "Item desativado" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
