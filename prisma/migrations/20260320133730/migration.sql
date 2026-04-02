/*
  Warnings:

  - A unique constraint covering the columns `[barbershopId]` on the table `ThemeConfig` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "ConfigAppointmentBarber" (
    "id" TEXT NOT NULL,
    "barbershopId" TEXT NOT NULL,
    "slotInterval" INTEGER NOT NULL DEFAULT 15,
    "autoAdjustVisibleHours" BOOLEAN NOT NULL DEFAULT true,
    "visibleStartMinutes" INTEGER,
    "visibleEndMinutes" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConfigAppointmentBarber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkingHours" (
    "id" TEXT NOT NULL,
    "barbershopId" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "startMinutes" INTEGER NOT NULL,
    "endMinutes" INTEGER NOT NULL,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkingHours_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ConfigAppointmentBarber_barbershopId_key" ON "ConfigAppointmentBarber"("barbershopId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkingHours_barbershopId_dayOfWeek_key" ON "WorkingHours"("barbershopId", "dayOfWeek");

-- CreateIndex
CREATE UNIQUE INDEX "ThemeConfig_barbershopId_key" ON "ThemeConfig"("barbershopId");

-- AddForeignKey
ALTER TABLE "ConfigAppointmentBarber" ADD CONSTRAINT "ConfigAppointmentBarber_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "Barbershop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkingHours" ADD CONSTRAINT "WorkingHours_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "Barbershop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
