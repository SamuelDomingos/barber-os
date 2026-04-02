import NextAuth, { NextAuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      name: string;
      email: string;
      avatar: string | null;
      barbershopId: string | null;
      role: string;
      slug: string | null;
      onboardingDone: boolean;
      themeStyle: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
    barbershopId: string | null;
    role: string;
    slug: string | null;
    onboardingDone: boolean;
    themeStyle: string | null;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
        context: { label: "Context", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password)
          throw new Error("Credenciais incompletas");

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: { id: true, password: true, role: true },
        });

        if (!user) throw new Error("Usuário não encontrado");

        const senhaValida = await bcrypt.compare(
          credentials.password,
          user.password,
        );
        if (!senhaValida) throw new Error("Senha incorreta");

        const isBarberShopContext = credentials.context === "barbershop";
        const isClientContext = credentials.context === "client";

        if (isBarberShopContext && !["ADMIN", "BARBER"].includes(user.role))
          throw new Error("Acesso restrito à barbearia");

        if (isClientContext && !["CLIENT"].includes(user.role))
          throw new Error("Acesso restrito a clientes");

        return {
          id: user.id,
          email: credentials.email,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger }) {
      const userId = user?.id ?? token.id;

      if (!userId) {
        return token;
      }

      if (user || trigger === "update") {
        const dbUser = await prisma.user.findUnique({
          where: { id: userId },
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            barbershopId: true,
            role: true,
            barbershop: {
              select: {
                slug: true,
                locations: { take: 1, select: { id: true } },
                themeConfig: { select: { id: true, style: true } },
              },
            },
          },
        });

        if (dbUser) {
          token.id = dbUser.id;
          token.name = dbUser.name;
          token.email = dbUser.email;
          token.avatar = dbUser.avatar ?? null;
          token.barbershopId = dbUser.barbershopId ?? null;
          token.role = dbUser.role;
          token.slug = dbUser.barbershop?.slug ?? null;
          token.themeStyle = dbUser.barbershop?.themeConfig?.style ?? null;
          token.onboardingDone =
            (dbUser.barbershop?.locations?.length ?? 0) > 0 &&
            !!dbUser.barbershop?.themeConfig;
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.avatar = token.avatar;
      session.user.barbershopId = token.barbershopId;
      session.user.role = token.role;
      session.user.slug = token.slug;
      session.user.onboardingDone = token.onboardingDone;
      session.user.themeStyle = token.themeStyle;
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
