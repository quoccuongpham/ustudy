/*
  Warnings:

  - The primary key for the `Discount` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `scope` to the `Discount` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DiscountScope" AS ENUM ('ALL_COURSE_TEACHER', 'CODE', 'ALL_SYSTEM');

-- DropForeignKey
ALTER TABLE "Discount" DROP CONSTRAINT "Discount_courseId_fkey";

-- AlterTable
ALTER TABLE "Discount" DROP CONSTRAINT "Discount_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "scope" "DiscountScope" NOT NULL,
ALTER COLUMN "courseId" DROP NOT NULL,
ADD CONSTRAINT "Discount_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Discount" ADD CONSTRAINT "Discount_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
