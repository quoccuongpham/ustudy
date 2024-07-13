-- CreateTable
CREATE TABLE "Discount" (
    "courseId" INTEGER NOT NULL,
    "code" TEXT,
    "percentage" INTEGER NOT NULL DEFAULT 0,
    "expiredAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Discount_pkey" PRIMARY KEY ("courseId")
);

-- AddForeignKey
ALTER TABLE "Discount" ADD CONSTRAINT "Discount_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
