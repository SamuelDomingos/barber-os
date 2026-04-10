import { auth } from "@/lib/auth";
import { authGuard } from "@/lib/auth-guard";
import prisma from "@/lib/prisma";
import { TCalendarView } from "@/components/calendar/types";

const calculateDateRange = (view: TCalendarView) => {
  const now = new Date();
  let startDate = new Date();
  let endDate = new Date();

  if (view === "day") {
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);
  } else if (view === "week") {
    const dayOfWeek = now.getDay();
    startDate.setDate(now.getDate() - dayOfWeek);
    startDate.setHours(0, 0, 0, 0);
    endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    endDate.setHours(23, 59, 59, 999);
  } else if (view === "month") {
    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    endDate = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999,
    );
  } else if (view === "year") {
    startDate = new Date(now.getFullYear(), 0, 1);
    endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
  } else if (view === "agenda") {
    startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 3);
  }

  return { startDate, endDate };
};

const getAppointments = async (slug: string, view?: TCalendarView) => {
  const session = await auth();
  const barbershopId = session?.user?.barbershopId;

  if (!barbershopId) return null;

  await authGuard(barbershopId);

  const { startDate, endDate } = view ? calculateDateRange(view) : {};

  const whereClause: any = { barbershop: { slug } };

  if (startDate && endDate) {
    whereClause.date = {
      gte: startDate,
      lte: endDate,
    };
  } else {
  }

  const appointments = await prisma.appointment.findMany({
    where: whereClause,
    orderBy: { date: "desc" },
    select: {
      id: true,
      date: true,
      status: true,
      client: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      items: {
        select: {
          catalogItem: {
            select: {
              duration: true,
            },
          },
        },
      },
    },
  });

  return appointments;
};

export default getAppointments;
