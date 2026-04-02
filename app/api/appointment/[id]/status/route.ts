import { NextRequest, NextResponse } from "next/server";
import AppointmentService from "../../services/index.service";
import { authGuard } from "@/lib/auth-guard";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { getById, updateStatus } = AppointmentService();
    const appointment = await getById(params.id);

    const { error } = await authGuard(appointment.barbershopId);
    if (error) return error;

    const { status } = await req.json();
    const updated = await updateStatus(params.id, status);

    return NextResponse.json({ appointment: updated }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
