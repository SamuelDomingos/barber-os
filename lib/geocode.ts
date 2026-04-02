// lib/geocode.ts
export const geocodeAddress = async (
  address: string,
  numberAddress: string,
  city: string,
  state: string,
  country: string
): Promise<{ lat: number; lng: number } | null> => {
  try {
    const query = encodeURIComponent(
      `${address}, ${numberAddress}, ${city}, ${state}, ${country}`
    );

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`,
      {
        headers: {
          "Accept-Language": "pt-BR",
          "User-Agent": "BarberOS/1.0",
        },
      }
    );

    const data = await res.json();

    if (!data.length) return null;

    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    };
  } catch {
    return null;
  }
};