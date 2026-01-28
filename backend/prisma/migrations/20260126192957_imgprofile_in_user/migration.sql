/*
  Warnings:

  - You are about to drop the column `imgProfile` on the `Customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "imgProfile" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Customer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "phonePrefix" BIGINT NOT NULL,
    "phoneNumber" BIGINT NOT NULL,
    "street" TEXT NOT NULL,
    "civic" BIGINT NOT NULL,
    "idUser" INTEGER NOT NULL,
    "idCity" INTEGER NOT NULL,
    CONSTRAINT "Customer_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Customer_idCity_fkey" FOREIGN KEY ("idCity") REFERENCES "City" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Customer" ("civic", "id", "idCity", "idUser", "phoneNumber", "phonePrefix", "street") SELECT "civic", "id", "idCity", "idUser", "phoneNumber", "phonePrefix", "street" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE UNIQUE INDEX "Customer_idUser_key" ON "Customer"("idUser");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
