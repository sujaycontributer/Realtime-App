/*
  Warnings:

  - Added the required column `emailId` to the `Problemset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Problemset" ADD COLUMN     "emailId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."Problemset" ADD CONSTRAINT "Problemset_emailId_fkey" FOREIGN KEY ("emailId") REFERENCES "public"."User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
