/*
  Warnings:

  - You are about to drop the column `score` on the `Score_reading` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Score_reading" DROP COLUMN "score",
ADD COLUMN     "reading_score" INTEGER DEFAULT 0;
