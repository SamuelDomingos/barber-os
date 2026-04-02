import { NextRequest, NextResponse } from "next/server";
import AppointmentService from "./services/index.service";
import { authGuard } from "@/lib/auth-guard";
import { getPaginationParams, paginationResponse } from "@/lib/pagination";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const barbershopId = searchParams.get("barbershopId") ?? "";

    const { error } = await authGuard(barbershopId);
    if (error) return error;

    const pagination = getPaginationParams(req);
    const { get } = AppointmentService();
    const { appointments, total } = await get(barbershopId, pagination);

    return NextResponse.json(
      paginationResponse(appointments, total, pagination),
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

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