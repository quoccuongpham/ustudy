-- AlterTable
CREATE SEQUENCE video_sequencenumber_seq;
ALTER TABLE "Video" ALTER COLUMN "sequenceNumber" SET DEFAULT nextval('video_sequencenumber_seq');
ALTER SEQUENCE video_sequencenumber_seq OWNED BY "Video"."sequenceNumber";
