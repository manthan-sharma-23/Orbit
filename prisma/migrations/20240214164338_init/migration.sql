-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" TEXT DEFAULT 'available',
ADD COLUMN     "view" TEXT DEFAULT 'public';
