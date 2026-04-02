import { NextRequest, NextResponse } from "next/server";
import TeamService from "../services/index.service";
import { authGuard } from "@/lib/auth-guard";
import { deleteAvatar, uploadAvatar } from "@/lib/upload";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { getById } = TeamService();
    const barber = await getById(params.id);

    const { error } = await authGuard(barber.barbershopId ?? "");
    if (error) return error;

    return NextResponse.json({ barber }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.mensagem }, { status: 400 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { getById, put } = TeamService();
    const barber = await getById(params.id);

    const formData = await req.formData();

    const avatarFile = formData.get("avatar") as File | null;
    let avatarUrl: string | undefined;

    if (avatarFile && avatarFile.size > 0) {
      const bytes = await avatarFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${avatarFile.name}`;
      const fs = await import("fs/promises");
      await fs.writeFile(`./public/uploads/${filename}`, buffer);
      avatarUrl = `/uploads/${filename}`;
    }

    const data = {
      name: (formData.get("name") as string) || undefined,
      email: (formData.get("email") as string) || undefined,
      phone: (formData.get("phone") as string) || undefined,
      ...(avatarUrl && { avatar: avatarUrl }),
    };

    if (avatarFile && avatarFile.size > 0) {
      if (barber.avatar) await deleteAvatar(barber.avatar);
      avatarUrl = await uploadAvatar(avatarFile);
    }

    const { error } = await authGuard(barber.barbershopId ?? "");
    if (error) return error;

    const updated = await put(params.id, data);

    return NextResponse.json({ barber: updated }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.mensagem }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const { getById, remove } = TeamService();
    const barber = await getById(id);

    const { error } = await authGuard(barber.barbershopId ?? "");
    if (error) return error;

    if (barber.avatar) await deleteAvatar(barber.avatar);

    await remove(id);

    return NextResponse.json({ message: "Barbeiro desativado" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
