import { NextRequest, NextResponse } from "next/server";
import AppointmentService from "../services/index.service";
import { authGuard } from "@/lib/auth-guard";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { getById } = AppointmentService();
    const appointment = await getById(params.id);

    const { error } = await authGuard(appointment.barbershopId);
    if (error) return error;

    return NextResponse.json({ appointment }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { getById, put } = AppointmentService();
    const appointment = await getById(params.id);

    const { error } = await authGuard(appointment.barbershopId);
    if (error) return error;

    const data = await req.json();
    const updated = await put(params.id, data);

    return NextResponse.json({ appointment: updated }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { getById, remove } = AppointmentService();
    const appointment = await getById(params.id);

    const { error } = await authGuard(appointment.barbershopId);
    if (error) return error;

    await remove(params.id);

    return NextResponse.json(
      { message: "Agendamento cancelado" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
