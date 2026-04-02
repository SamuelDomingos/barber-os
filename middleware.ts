import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const slug = pathname.split("/")[1];

  const isAuthRoute = pathname.startsWith("/auth");
  const isPublicSlug =
    slug &&
    !pathname.includes("dashboard") &&
    !pathname.includes("team") &&
    !pathname.includes("catalog") &&
    !pathname.includes("config") &&
    !pathname.includes("appointments") &&
    !pathname.includes("clients") &&
    !pathname.includes("financial");

  if (isPublicSlug) return NextResponse.next();

  if (!token) {
    if (isAuthRoute) return NextResponse.next();
    return NextResponse.redirect(new URL(`/${slug}`, req.url));
  }

  const role = token.role as string;
  const barbershopId = token.barbershopId as string | null;
  const onboardingDone = token.onboardingDone as boolean;
  const userSlug = token.slug as string;

  if (isAuthRoute) {
    if (!barbershopId || !onboardingDone)
      return NextResponse.redirect(new URL("/auth/onboarding", req.url));
    return NextResponse.redirect(new URL(`/${userSlug}/dashboard`, req.url));
  }

  if (!["ADMIN", "BARBER"].includes(role)) {
    return NextResponse.redirect(new URL(`/${slug}`, req.url));
  }

  if (!barbershopId || !onboardingDone) {
    return NextResponse.redirect(new URL("/auth/onboarding", req.url));
  }

  if (userSlug !== slug) {
    return NextResponse.redirect(new URL(`/${userSlug}/dashboard`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};
