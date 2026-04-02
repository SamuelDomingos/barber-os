import {
  LayoutDashboard,
  CalendarDays,
  Users,
  UsersRound,
  DollarSign,
  LayoutList,
} from "lucide-react";
import { useParams, usePathname } from "next/navigation";

const menuItems = [
  {
    label: "Geral",
    items: [
      { title: "Dashboard", href: "dashboard", icon: LayoutDashboard },
      { title: "Agendamentos", href: "appointments", icon: CalendarDays },
      { title: "Clientes", href: "clients", icon: Users },
      { title: "Financeiro", href: "financial", icon: DollarSign },
      { title: "Catálogo", href: "catalog", icon: LayoutList },
    ],
  },
  {
    label: "Equipe",
    items: [{ title: "Barbeiros", href: "team", icon: UsersRound, isAdmin: true }],
  },
];

const useSidebar = () => {
  const pathname = usePathname();
  const { slug } = useParams<{ slug: string }>();

  const buildHref = (href: string) => `/${slug}/${href}`;
  return { pathname, buildHref, menuItems };
};

export default useSidebar;
