import { NextRequest, NextResponse } from "next/server";
import ClientService from "./services/index.service";
import { getPaginationParams } from "@/lib/pagination";
import { authGuard } from "@/lib/auth-guard";

export async function GET(req: NextRequest) {
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

    const pagination = getPaginationParams(req);
    const { get } = ClientService();
    const data = await get(barbershopId, pagination);

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}