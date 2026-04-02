import { NextRequest, NextResponse } from "next/server";
import DashboardService from "./services/index.service";
import { authGuard } from "@/lib/auth-guard";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const barbershopId = searchParams.get("barbershopId") ?? "";

    // const { error } = await authGuard(barbershopId);
    // if (error) return error;

    const { getStats, getAppointmentsToday, getBarbersOccupation } =
      DashboardService();

    const [stats, appointments, barbers] = await Promise.all([
      getStats(barbershopId),
      getAppointmentsToday(barbershopId),
      getBarbersOccupation(barbershopId),
    ]);

    return NextResponse.json({ stats, appointments, barbers }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
