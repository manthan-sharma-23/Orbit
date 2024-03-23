/*
  Warnings:

  - Made the column `from` on table `Invite` required. This step will fail if there are existing NULL values in that column.
  - Made the column `to` on table `Invite` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Invite" ALTER COLUMN "from" SET NOT NULL,
ALTER COLUMN "to" SET NOT NULL;
