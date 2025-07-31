/*
  Warnings:

  - You are about to drop the `Problem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Problem" DROP CONSTRAINT "Problem_problemSetId_fkey";

-- DropTable
DROP TABLE "public"."Problem";

-- CreateTable
CREATE TABLE "public"."problem" (
    "id" TEXT NOT NULL,
    "problemSetId" TEXT NOT NULL,
    "problemName" TEXT NOT NULL,
    "optionA" TEXT NOT NULL,
    "optionB" TEXT NOT NULL,
    "optionC" TEXT NOT NULL,
    "optionD" TEXT NOT NULL,

    CONSTRAINT "problem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."problem" ADD CONSTRAINT "problem_problemSetId_fkey" FOREIGN KEY ("problemSetId") REFERENCES "public"."Problemset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
