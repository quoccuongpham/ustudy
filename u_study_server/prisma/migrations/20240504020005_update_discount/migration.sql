/*
  Warnings:

  - You are about to drop the column `code` on the `Discount` table. All the data in the column will be lost.
  - You are about to drop the column `scope` on the `Discount` table. All the data in the column will be lost.
  - Added the required column `type` to the `Discount` table without a default value. This is not possible if the table is not empty.
  - Made the column `courseId` on table `Discount` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('WITH_COUPON', 'WITHOUT_COUPON');

-- DropForeignKey
ALTER TABLE "Discount" DROP CONSTRAINT "Discount_courseId_fkey";

-- AlterTable
ALTER TABLE "Discount" DROP COLUMN "code",
DROP COLUMN "scope",
ADD COLUMN     "coupon" TEXT,
ADD COLUMN     "type" "DiscountType" NOT NULL,
ALTER COLUMN "courseId" SET NOT NULL;

-- DropEnum
DROP TYPE "DiscountScope";

-- AddForeignKey
ALTER TABLE "Discount" ADD CONSTRAINT "Discount_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
