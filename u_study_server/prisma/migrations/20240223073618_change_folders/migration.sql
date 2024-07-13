-- AddForeignKey
ALTER TABLE "Folders" ADD CONSTRAINT "Folders_parentFolderId_fkey" FOREIGN KEY ("parentFolderId") REFERENCES "Folders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
