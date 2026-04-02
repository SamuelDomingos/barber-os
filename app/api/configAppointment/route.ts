import { NextRequest, NextResponse } from "next/server";
import { authGuard } from "@/lib/auth-guard";
import ConfigAppointmentService from "./services/index.service";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const { error } = await authGuard(data.barbershopId);
    if (error) return error;

    const { post } = ConfigAppointmentService();

    const result = post(data);

    return NextResponse.json({ result }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  try {

    const data = await req.json();

    const { error } = await authGuard(data.barbershopId);
    if (error) return error;

    const { put } = ConfigAppointmentService();

    const result = put(data);

    return NextResponse.json({ result }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
