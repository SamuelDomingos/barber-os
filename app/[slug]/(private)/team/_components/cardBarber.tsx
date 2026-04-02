import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { statusVariant } from "@/app/[slug]/(private)/dashboard/_libs/varients";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
import { getInitials } from "@/lib/utils";
import DropdownMenuBarber from "./molecules/dropdownMenuBarber";

const CardBarber = ({
  barbers,
}: {
  barbers: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    avatar: string | null;
    active: boolean;
  }[];
}) => {

  if (!barbers || barbers.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-16 text-muted-foreground">
        <Users size={32} strokeWidth={1.5} />
        <p className="text-sm">Nenhum barbeiro cadastrado</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {barbers.map((member) => {
        const status = statusVariant[member.active ? "Ativo" : "Inativo"];
        return (
          <Card key={member.id}>
            <CardContent className="pt-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-11 h-11">
                    <AvatarImage src={member.avatar ?? undefined} />
                    <AvatarFallback className={`text-sm font-medium`}>
                      {getInitials(member.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{member.name}</p>
                    <p className="text-xs text-muted-foreground">Barbeiro</p>
                  </div>
                </div>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 ${status.badge}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                  {member.active ? "Ativo" : "Inativo"}
                </span>
              </div>

              <div className="border-t pt-4 mb-4">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-base font-medium">—</p>
                    <p className="text-xs text-muted-foreground">Cortes</p>
                  </div>
                  <div>
                    <p className="text-base font-medium">—</p>
                    <p className="text-xs text-muted-foreground">Avaliação</p>
                  </div>
                  <div>
                    <p className="text-base font-medium">—</p>
                    <p className="text-xs text-muted-foreground">Comissão</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{member.email}</span>

                <DropdownMenuBarber data={member} key={member.id} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default CardBarber;
