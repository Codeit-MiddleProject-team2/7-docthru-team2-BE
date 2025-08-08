/*
  Warnings:

  - You are about to drop the column `canceled` on the `Translation` table. All the data in the column will be lost.
  - Added the required column `isSubmitted` to the `Translation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Translation" DROP COLUMN "canceled",
ADD COLUMN     "isSubmitted" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "isAdmin" SET DEFAULT false;
