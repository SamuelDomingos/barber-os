import { NextRequest, NextResponse } from "next/server";
import ClientService from "../services/index.service";
import { authGuard } from "@/lib/auth-guard";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { searchParams } = new URL(req.url);
    const barbershopId = searchParams.get("barbershopId") ?? "";

    const { error } = await authGuard(barbershopId);
    if (error) return error;

    if (!barbershopId) {
      return NextResponse.json(
        { error: "barbershopId obrigatório" },
        { status: 400 },
      );
    }

    const { getById } = ClientService();
    const clients = await getById(params.id);

    return NextResponse.json({ clients }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
