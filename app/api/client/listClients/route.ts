import { NextRequest, NextResponse } from "next/server";
import { authGuard } from "@/lib/auth-guard";
import ClientService from "../services/index.service";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const barbershopId = searchParams.get("barbershopId") ?? "";
    const search = searchParams.get("search") ?? "";

    const { error } = await authGuard(barbershopId);
    if (error) return error;

    if (!barbershopId) {
      return NextResponse.json(
        { error: "barbershopId obrigatório" },
        { status: 400 },
      );
    }
    const { getList } = ClientService();
    const data = await getList(barbershopId, search);

    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
