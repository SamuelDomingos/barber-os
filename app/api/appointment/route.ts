import { NextRequest, NextResponse } from "next/server";
import AppointmentService from "./services/index.service";
import { authGuard } from "@/lib/auth-guard";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const session = await authGuard(data.barbershopId);

    const { postByBarbershop, postByClient } = AppointmentService();

    const appointment =
      data.origin === "client"
        ? await postByClient({ ...data, clientId: session.user.id })
        : await postByBarbershop(data);

    return NextResponse.json({ appointment }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}