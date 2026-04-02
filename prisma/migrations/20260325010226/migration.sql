/*
  Warnings:

  - You are about to drop the column `stock` on the `CatalogItem` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `CatalogItemPackage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CatalogItem" DROP COLUMN "stock";

-- AlterTable
ALTER TABLE "CatalogItemPackage" DROP COLUMN "quantity";
