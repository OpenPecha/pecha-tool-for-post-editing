/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `BO_EN_Text` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `EN_BO_Text` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BO_EN_Text_name_key" ON "BO_EN_Text"("name");

-- CreateIndex
CREATE INDEX "BO_EN_Text_name_idx" ON "BO_EN_Text"("name");

-- CreateIndex
CREATE UNIQUE INDEX "EN_BO_Text_name_key" ON "EN_BO_Text"("name");

-- CreateIndex
CREATE INDEX "EN_BO_Text_name_idx" ON "EN_BO_Text"("name");
