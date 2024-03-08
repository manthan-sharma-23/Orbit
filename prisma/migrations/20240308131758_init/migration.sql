/*
  Warnings:

  - You are about to drop the `TeamChannel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TeamChannel" DROP CONSTRAINT "TeamChannel_channelId_fkey";

-- DropForeignKey
ALTER TABLE "TeamChannel" DROP CONSTRAINT "TeamChannel_teamId_fkey";

-- DropTable
DROP TABLE "TeamChannel";
