-- DropForeignKey
ALTER TABLE "Notes" DROP CONSTRAINT "Notes_folderId_fkey";

-- AlterTable
ALTER TABLE "Notes" ALTER COLUMN "folderId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Folders" ADD CONSTRAINT "Folders_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
