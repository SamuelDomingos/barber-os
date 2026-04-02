import { authGuard } from "@/lib/auth-guard";
import { NextRequest, NextResponse } from "next/server";
import CatalogService from "../services/index.service";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const barbershopId = searchParams.get("barbershopId") ?? "";
    const search = searchParams.get("search") ?? undefined;

    const { error } = await authGuard(barbershopId);
    if (error) return error;

    const { getServices } = CatalogService();
    const result = await getServices(barbershopId, search);

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
