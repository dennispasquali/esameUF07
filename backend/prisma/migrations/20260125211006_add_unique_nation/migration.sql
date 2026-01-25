/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Nation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Nation_name_key" ON "Nation"("name");
