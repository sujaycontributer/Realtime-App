-- CreateTable
CREATE TABLE "public"."Problemset" (
    "id" TEXT NOT NULL,
    "setName" TEXT NOT NULL,

    CONSTRAINT "Problemset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Problem" (
    "id" TEXT NOT NULL,
    "problemSetId" TEXT NOT NULL,

    CONSTRAINT "Problem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Problem" ADD CONSTRAINT "Problem_problemSetId_fkey" FOREIGN KEY ("problemSetId") REFERENCES "public"."Problemset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
