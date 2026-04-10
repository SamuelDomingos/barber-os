import { NextRequest, NextResponse } from "next/server";
import AppointmentService from "../services/index.service";
import { authGuard } from "@/lib/auth-guard";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { getById } = AppointmentService();
    const appointment = await getById(id);

    const session = await authGuard(appointment.barbershopId);
    if (!session) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    return NextResponse.json(appointment, { status: 200 });
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
    const { getById, put } = AppointmentService();
    const appointment = await getById(id);

    const session = await authGuard(appointment.barbershopId);
    if (!session) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const data = await req.json();
    const updated = await put(id, data);

    return NextResponse.json({ appointment: updated }, { status: 200 });
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
    const { getById, remove } = AppointmentService();
    const appointment = await getById(id);

    const session = await authGuard(appointment.barbershopId);
    if (!session) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    await remove(id);

    return NextResponse.json(
      { message: "Agendamento cancelado" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
