-- AlterTable
ALTER TABLE "BO_EN_Text" ADD COLUMN     "transcriber_id" TEXT;

-- AlterTable
ALTER TABLE "EN_BO_Text" ADD COLUMN     "transcriber_id" TEXT;

-- AddForeignKey
ALTER TABLE "BO_EN_Text" ADD CONSTRAINT "BO_EN_Text_transcriber_id_fkey" FOREIGN KEY ("transcriber_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EN_BO_Text" ADD CONSTRAINT "EN_BO_Text_transcriber_id_fkey" FOREIGN KEY ("transcriber_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
