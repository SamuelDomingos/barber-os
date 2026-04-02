/*
  Warnings:

  - Added the required column `color` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_barberId_fkey";

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "color" TEXT NOT NULL,
ALTER COLUMN "barberId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_barberId_fkey" FOREIGN KEY ("barberId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
