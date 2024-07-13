/*
  Warnings:

  - A unique constraint covering the columns `[courseId,type]` on the table `Discount` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Discount_courseId_type_key" ON "Discount"("courseId", "type");
