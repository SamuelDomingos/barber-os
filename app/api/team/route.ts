import { NextRequest, NextResponse } from "next/server";
import TeamService from "./services/index.service";
import { authGuard } from "@/lib/auth-guard";
import { getPaginationParams, paginationResponse } from "@/lib/pagination";
import { uploadAvatar } from "@/lib/upload";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const avatarFile = formData.get("avatar") as File | null;
    let avatarUrl: string | undefined;

    if (avatarFile && avatarFile.size > 0) {
      avatarUrl = await uploadAvatar(avatarFile);
    }

    if (avatarFile && avatarFile.size > 0) {
      const bytes = await avatarFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${avatarFile.name}`;
      const fs = await import("fs/promises");
      await fs.writeFile(`./public/uploads/${filename}`, buffer);
      avatarUrl = `/uploads/${filename}`;
    }

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || undefined,
      password: formData.get("password") as string,
      barbershopId: formData.get("barbershopId") as string,
      avatar: avatarUrl,
    };

    const { error } = await authGuard(data.barbershopId);
    if (error) return error;

    const { post } = TeamService();
    const barber = await post(data);

    return NextResponse.json({ barber }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const barbershopId = searchParams.get("barbershopId") ?? "";

    const { error } = await authGuard(barbershopId);
    if (error) return error;

    const pagination = getPaginationParams(req);
    const { get } = TeamService();
    const { barbers, total, stats } = await get(barbershopId, pagination);

    return NextResponse.json(
      { ...paginationResponse(barbers, total, pagination), stats },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
