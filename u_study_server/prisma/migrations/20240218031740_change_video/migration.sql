-- AlterTable
ALTER TABLE "Video" ALTER COLUMN "sequenceNumber" DROP DEFAULT;
DROP SEQUENCE "video_sequencenumber_seq";
