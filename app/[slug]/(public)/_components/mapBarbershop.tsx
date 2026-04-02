"use client";

import { MapPin } from "lucide-react";
import dynamic from "next/dynamic";

const BarbershopMap = dynamic<{
  address: string;
  numberAddress: string;
  city: string;
  state: string;
  country: string;
}>(() => import("@/components/barbershopMap"), { ssr: false });

const MapBarbershop = ({
  location,
}: {
  location: {
    country: string;
    state: string;
    city: string;
    address: string;
    numberAddress: string;
    postalCode: string | null;
  };
}) => {
  return (
    <div className="rounded-2xl border bg-card p-5 space-y-3 flex flex-col">
      <div className="flex items-center gap-2 font-semibold text-sm">
        <MapPin className="w-4 h-4 text-primary" />
        Localização
      </div>
      <div className="flex-1 min-h-64">
        <BarbershopMap
          address={location.address}
          numberAddress={location.numberAddress}
          city={location.city}
          state={location.state}
          country={location.country}
        />
      </div>
    </div>
  );
};

export default MapBarbershop;
