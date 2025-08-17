/*
  Warnings:

  - Added the required column `ans` to the `problem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."problem" ADD COLUMN     "ans" TEXT NOT NULL;
