import { NextRequest, NextResponse } from "next/server";
import RegisterUserService from "../services/index.service";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const { registerOnBoarding } = RegisterUserService();
    const onBoarding = await registerOnBoarding(data);

    return NextResponse.json({ onBoarding }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
