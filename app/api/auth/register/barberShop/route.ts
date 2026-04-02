import { NextRequest, NextResponse } from "next/server";
import RegisterService from "../services/index.service";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const { registerUser } = RegisterService();
    const user = await registerUser(data, "ADMIN");

    return NextResponse.json({ user }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
