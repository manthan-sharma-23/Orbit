/*
  Warnings:

  - A unique constraint covering the columns `[roomId]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - Made the column `roomId` on table `Team` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "roomId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Team_roomId_key" ON "Team"("roomId");

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
