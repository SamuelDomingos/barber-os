/*
  Warnings:

  - You are about to drop the `AppointmentPackage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AppointmentProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AppointmentService` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Package` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PackageItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Service` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "CatalogItemType" AS ENUM ('SERVICE', 'PRODUCT', 'PACKAGE');

-- DropForeignKey
ALTER TABLE "AppointmentPackage" DROP CONSTRAINT "AppointmentPackage_appointmentId_fkey";

-- DropForeignKey
ALTER TABLE "AppointmentPackage" DROP CONSTRAINT "AppointmentPackage_packageId_fkey";

-- DropForeignKey
ALTER TABLE "AppointmentProduct" DROP CONSTRAINT "AppointmentProduct_appointmentId_fkey";

-- DropForeignKey
ALTER TABLE "AppointmentProduct" DROP CONSTRAINT "AppointmentProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "AppointmentService" DROP CONSTRAINT "AppointmentService_appointmentId_fkey";

-- DropForeignKey
ALTER TABLE "AppointmentService" DROP CONSTRAINT "AppointmentService_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "Package" DROP CONSTRAINT "Package_barbershopId_fkey";

-- DropForeignKey
ALTER TABLE "PackageItem" DROP CONSTRAINT "PackageItem_packageId_fkey";

-- DropForeignKey
ALTER TABLE "PackageItem" DROP CONSTRAINT "PackageItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "PackageItem" DROP CONSTRAINT "PackageItem_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_barbershopId_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_barbershopId_fkey";

-- DropTable
DROP TABLE "AppointmentPackage";

-- DropTable
DROP TABLE "AppointmentProduct";

-- DropTable
DROP TABLE "AppointmentService";

-- DropTable
DROP TABLE "Package";

-- DropTable
DROP TABLE "PackageItem";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "Service";

-- CreateTable
CREATE TABLE "CatalogItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(65,30) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "image" TEXT,
    "type" "CatalogItemType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration" INTEGER,
    "stock" INTEGER DEFAULT 0,
    "category" TEXT,
    "barbershopId" TEXT NOT NULL,

    CONSTRAINT "CatalogItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CatalogItemPackage" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "packageId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,

    CONSTRAINT "CatalogItemPackage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppointmentItem" (
    "id" TEXT NOT NULL,
    "appointmentId" TEXT NOT NULL,
    "catalogItemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "price" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "AppointmentItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CatalogItem" ADD CONSTRAINT "CatalogItem_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "Barbershop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CatalogItemPackage" ADD CONSTRAINT "CatalogItemPackage_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "CatalogItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CatalogItemPackage" ADD CONSTRAINT "CatalogItemPackage_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "CatalogItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentItem" ADD CONSTRAINT "AppointmentItem_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentItem" ADD CONSTRAINT "AppointmentItem_catalogItemId_fkey" FOREIGN KEY ("catalogItemId") REFERENCES "CatalogItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
