/*
  Warnings:

  - You are about to drop the `Text` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Text" DROP CONSTRAINT "Text_modified_by_id_fkey";

-- DropForeignKey
ALTER TABLE "_UserIgnoredText" DROP CONSTRAINT "_UserIgnoredText_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserRejectedText" DROP CONSTRAINT "_UserRejectedText_A_fkey";

-- DropTable
DROP TABLE "Text";

-- CreateTable
CREATE TABLE "BO_EN_Text" (
    "id" SERIAL NOT NULL,
    "original_text" TEXT NOT NULL,
    "status" "Status",
    "modified_text" TEXT,
    "modified_by_id" TEXT,

    CONSTRAINT "BO_EN_Text_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EN_BO_Text" (
    "id" SERIAL NOT NULL,
    "original_text" TEXT NOT NULL,
    "status" "Status",
    "modified_text" TEXT,
    "modified_by_id" TEXT,

    CONSTRAINT "EN_BO_Text_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BO_EN_Text_id_key" ON "BO_EN_Text"("id");

-- CreateIndex
CREATE UNIQUE INDEX "EN_BO_Text_id_key" ON "EN_BO_Text"("id");

-- AddForeignKey
ALTER TABLE "BO_EN_Text" ADD CONSTRAINT "BO_EN_Text_modified_by_id_fkey" FOREIGN KEY ("modified_by_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EN_BO_Text" ADD CONSTRAINT "EN_BO_Text_modified_by_id_fkey" FOREIGN KEY ("modified_by_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserRejectedText" ADD CONSTRAINT "_UserRejectedText_A_fkey" FOREIGN KEY ("A") REFERENCES "EN_BO_Text"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserIgnoredText" ADD CONSTRAINT "_UserIgnoredText_A_fkey" FOREIGN KEY ("A") REFERENCES "EN_BO_Text"("id") ON DELETE CASCADE ON UPDATE CASCADE;
