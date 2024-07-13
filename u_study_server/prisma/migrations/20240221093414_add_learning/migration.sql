-- CreateTable
CREATE TABLE "Learning" (
    "videoId" INTEGER NOT NULL,
    "uuid" TEXT NOT NULL,
    "timeLearned" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Learning_pkey" PRIMARY KEY ("videoId","uuid")
);

-- AddForeignKey
ALTER TABLE "Learning" ADD CONSTRAINT "Learning_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Learning" ADD CONSTRAINT "Learning_uuid_fkey" FOREIGN KEY ("uuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
