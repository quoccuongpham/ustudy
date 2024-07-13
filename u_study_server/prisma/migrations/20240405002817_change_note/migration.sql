-- DropIndex
DROP INDEX "Notes_uuid_videoId_key";

-- AlterTable
ALTER TABLE "Notes" ADD COLUMN     "time" INTEGER;
