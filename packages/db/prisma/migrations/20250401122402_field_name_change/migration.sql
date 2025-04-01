/*
  Warnings:

  - You are about to drop the column `timestamp` on the `WebsiteTick` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WebsiteTick" DROP COLUMN "timestamp",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
