-- CreateTable
CREATE TABLE "Schedule" (
    "courseId" INTEGER NOT NULL,
    "uuid" TEXT NOT NULL,
    "day" JSONB NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("courseId","uuid")
);
