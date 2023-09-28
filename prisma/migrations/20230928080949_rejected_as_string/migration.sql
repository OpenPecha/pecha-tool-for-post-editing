/*
  Warnings:

  - You are about to drop the `_UserIgnoredText` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserRejectedText` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserIgnoredText" DROP CONSTRAINT "_UserIgnoredText_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserIgnoredText" DROP CONSTRAINT "_UserIgnoredText_B_fkey";

-- DropForeignKey
ALTER TABLE "_UserRejectedText" DROP CONSTRAINT "_UserRejectedText_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserRejectedText" DROP CONSTRAINT "_UserRejectedText_B_fkey";

-- AlterTable
ALTER TABLE "BO_EN_Text" ADD COLUMN     "rejected_by_id" TEXT;

-- AlterTable
ALTER TABLE "EN_BO_Text" ADD COLUMN     "rejected_by_id" TEXT;

-- DropTable
DROP TABLE "_UserIgnoredText";

-- DropTable
DROP TABLE "_UserRejectedText";

-- AddForeignKey
ALTER TABLE "BO_EN_Text" ADD CONSTRAINT "BO_EN_Text_rejected_by_id_fkey" FOREIGN KEY ("rejected_by_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EN_BO_Text" ADD CONSTRAINT "EN_BO_Text_rejected_by_id_fkey" FOREIGN KEY ("rejected_by_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
