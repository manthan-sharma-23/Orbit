/*
  Warnings:

  - You are about to drop the column `Description` on the `Mail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Mail" DROP COLUMN "Description",
ADD COLUMN     "description" TEXT;
