import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { badgeVariant } from "../_libs/varients";
import { DashboardAppointment } from "@/lib/api/types/dashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarX } from "lucide-react";

const TableClientToday = ({
  appointments,
  isLoading,
}: {
  appointments: DashboardAppointment[];
  isLoading?: boolean;
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">
          Agendamentos de hoje
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Serviço</TableHead>
              <TableHead>Barbeiro</TableHead>
              <TableHead>Hora</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Skeleton className="w-7 h-7 rounded-full" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-10" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </TableCell>
                </TableRow>
              ))
            ) : appointments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <CalendarX size={32} strokeWidth={1.5} />
                    <p className="text-sm">Nenhum agendamento para hoje</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              appointments.map((a) => (
                <TableRow key={a.clientName + a.time}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium`}
                      >
                        a.clientName
                      </div>
                      <span className="text-sm">{a.clientName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{a.service}</TableCell>
                  <TableCell className="text-sm">{a.barberName}</TableCell>
                  <TableCell className="text-sm">{a.time}</TableCell>
                  <TableCell>
                    <Badge
                      variant={badgeVariant[a.status]}
                      className="text-xs font-normal"
                    >
                      {a.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TableClientToday;
