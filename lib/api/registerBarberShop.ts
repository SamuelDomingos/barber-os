export const registerBarberShop = async (data) => {
  const response = await fetch("/api/auth/register/barberShop", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro ao se registrar");
  }

  return response.json();
};
