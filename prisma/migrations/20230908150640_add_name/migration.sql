/*
  Warnings:

  - You are about to drop the column `modified_by_id` on the `BO_EN_Text` table. All the data in the column will be lost.
  - You are about to drop the column `modified_text` on the `BO_EN_Text` table. All the data in the column will be lost.
  - You are about to drop the column `modified_by_id` on the `EN_BO_Text` table. All the data in the column will be lost.
  - You are about to drop the column `modified_text` on the `EN_BO_Text` table. All the data in the column will be lost.
  - Added the required column `name` to the `BO_EN_Text` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `EN_BO_Text` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'REVIEWER', 'ANNOTATOR');

-- DropForeignKey
ALTER TABLE "BO_EN_Text" DROP CONSTRAINT "BO_EN_Text_modified_by_id_fkey";

-- DropForeignKey
ALTER TABLE "EN_BO_Text" DROP CONSTRAINT "EN_BO_Text_modified_by_id_fkey";

-- AlterTable
ALTER TABLE "BO_EN_Text" DROP COLUMN "modified_by_id",
DROP COLUMN "modified_text",
ADD COLUMN     "duration" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "translated" TEXT,
ADD COLUMN     "translated_by_id" TEXT;

-- AlterTable
ALTER TABLE "EN_BO_Text" DROP COLUMN "modified_by_id",
DROP COLUMN "modified_text",
ADD COLUMN     "duration" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "translated" TEXT,
ADD COLUMN     "translated_by_id" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'ANNOTATOR';

-- AddForeignKey
ALTER TABLE "BO_EN_Text" ADD CONSTRAINT "BO_EN_Text_translated_by_id_fkey" FOREIGN KEY ("translated_by_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EN_BO_Text" ADD CONSTRAINT "EN_BO_Text_translated_by_id_fkey" FOREIGN KEY ("translated_by_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
