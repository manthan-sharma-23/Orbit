/*
  Warnings:

  - You are about to drop the column `from` on the `ThreadMessage` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ThreadMessage" DROP CONSTRAINT "ThreadMessage_from_fkey";

-- AlterTable
ALTER TABLE "ThreadMessage" DROP COLUMN "from",
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "ThreadMessage" ADD CONSTRAINT "ThreadMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
