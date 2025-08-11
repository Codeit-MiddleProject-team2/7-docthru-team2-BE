/*
  Warnings:

  - You are about to drop the column `isAdmitted` on the `Challenge` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ChallengeState" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'DELETED');

-- AlterTable
ALTER TABLE "Challenge" DROP COLUMN "isAdmitted";

-- CreateTable
CREATE TABLE "ChallengeStatusManage" (
    "id" TEXT NOT NULL,
    "state" "ChallengeState" NOT NULL DEFAULT 'PENDING',
    "reason" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "challengeId" TEXT NOT NULL,

    CONSTRAINT "ChallengeStatusManage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChallengeStatusManage_challengeId_key" ON "ChallengeStatusManage"("challengeId");

-- AddForeignKey
ALTER TABLE "ChallengeStatusManage" ADD CONSTRAINT "ChallengeStatusManage_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;
