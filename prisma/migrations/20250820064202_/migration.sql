/*
  Warnings:

  - A unique constraint covering the columns `[challengeId]` on the table `ChallengeStatusManage` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Translation" ADD COLUMN     "title" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "ChallengeStatusManage_challengeId_key" ON "ChallengeStatusManage"("challengeId");
