-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "subtitleUrl" TEXT;

-- CreateTable
CREATE TABLE "Subtitle" (
    "id" SERIAL NOT NULL,
    "videoId" INTEGER NOT NULL,
    "from" INTEGER NOT NULL,
    "to" INTEGER NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Subtitle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subtitle" ADD CONSTRAINT "Subtitle_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
