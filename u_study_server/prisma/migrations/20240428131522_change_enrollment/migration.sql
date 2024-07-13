-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_uuid_fkey" FOREIGN KEY ("uuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
