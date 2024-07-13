-- CreateEnum
CREATE TYPE "Area" AS ENUM ('ASIA', 'AMERICA', 'EUROPE', 'AFRICA');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "area" "Area" NOT NULL DEFAULT 'ASIA';
