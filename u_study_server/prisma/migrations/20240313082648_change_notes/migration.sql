/*
  Warnings:

  - A unique constraint covering the columns `[uuid,videoId]` on the table `Notes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Notes_uuid_videoId_key" ON "Notes"("uuid", "videoId");
