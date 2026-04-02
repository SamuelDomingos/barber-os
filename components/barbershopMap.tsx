"use client";

import { geocodeAddress } from "@/lib/geocode";
import { useEffect, useRef, useState } from "react";

const openGoogleMaps = (address: string, city: string, state: string) => {
  const query = encodeURIComponent(`${address}, ${city}, ${state}`);
  window.open(
    `https://www.google.com/maps/search/?api=1&query=${query}`,
    "_blank",
  );
};

const BarbershopMapCard = ({
  address,
  numberAddress,
  city,
  state,
  country,
}: {
  address: string;
  numberAddress: string;
  city: string;
  state: string;
  country: string;
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null,
  );

  useEffect(() => {
    geocodeAddress(address, numberAddress, city, state, country).then(
      (result) => {
        if (result) setCoords(result);
      },
    );
  }, [address, numberAddress, city, state, country]);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current || !coords) return;

    import("leaflet").then((L) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current!).setView([coords.lat, coords.lng], 16);
      mapInstance.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      L.marker([coords.lat, coords.lng])
        .addTo(map)
        .bindPopup(`${address}, ${numberAddress} — ${city}`)
        .openPopup();
    });

    return () => {
      mapInstance.current?.remove();
      mapInstance.current = null;
    };
  }, [coords]);

  if (!coords) {
    return (
      <button
        onClick={() =>
          openGoogleMaps(`${address}, ${numberAddress}`, city, state)
        }
        className="w-full h-40 rounded-xl border border-border bg-muted/30 hover:bg-muted/50 transition flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
        <span className="text-sm font-medium">Ver no Google Maps</span>
        <span className="text-xs">
          {address}, {city}
        </span>
      </button>
    );
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <div
        ref={mapRef}
        className="w-full h-60 rounded-xl overflow-hidden border border-border z-0"
      />
    </>
  );
};

export default BarbershopMapCard;
