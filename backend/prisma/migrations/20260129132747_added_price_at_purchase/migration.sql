/*
  Warnings:

  - You are about to drop the column `statusColor` on the `Order` table. All the data in the column will be lost.
  - You are about to alter the column `qt` on the `OrderWithProducts` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - Added the required column `priceAtPurchase` to the `OrderWithProducts` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Admin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idUser" INTEGER NOT NULL,
    CONSTRAINT "Admin_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Admin" ("id", "idUser") SELECT "id", "idUser" FROM "Admin";
DROP TABLE "Admin";
ALTER TABLE "new_Admin" RENAME TO "Admin";
CREATE UNIQUE INDEX "Admin_idUser_key" ON "Admin"("idUser");
CREATE TABLE "new_Customer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "phonePrefix" BIGINT NOT NULL,
    "phoneNumber" BIGINT NOT NULL,
    "street" TEXT NOT NULL,
    "civic" BIGINT NOT NULL,
    "idUser" INTEGER NOT NULL,
    "idCity" INTEGER NOT NULL,
    CONSTRAINT "Customer_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Customer_idCity_fkey" FOREIGN KEY ("idCity") REFERENCES "City" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Customer" ("civic", "id", "idCity", "idUser", "phoneNumber", "phonePrefix", "street") SELECT "civic", "id", "idCity", "idUser", "phoneNumber", "phonePrefix", "street" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE UNIQUE INDEX "Customer_idUser_key" ON "Customer"("idUser");
CREATE TABLE "new_Employee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "idUser" INTEGER NOT NULL,
    CONSTRAINT "Employee_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Employee" ("id", "idUser", "role", "task") SELECT "id", "idUser", "role", "task" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
CREATE UNIQUE INDEX "Employee_idUser_key" ON "Employee"("idUser");
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idUser" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'carrello',
    "urlTracking" TEXT NOT NULL,
    "typeOrder" TEXT NOT NULL,
    CONSTRAINT "Order_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("date", "id", "idUser", "status", "typeOrder", "urlTracking") SELECT "date", "id", "idUser", "status", "typeOrder", "urlTracking" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE TABLE "new_OrderWithProducts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "qt" INTEGER NOT NULL,
    "priceAtPurchase" INTEGER NOT NULL,
    "idProduct" INTEGER NOT NULL,
    "idOrder" INTEGER NOT NULL,
    CONSTRAINT "OrderWithProducts_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "OrderWithProducts_idOrder_fkey" FOREIGN KEY ("idOrder") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_OrderWithProducts" ("id", "idOrder", "idProduct", "qt") SELECT "id", "idOrder", "idProduct", "qt" FROM "OrderWithProducts";
DROP TABLE "OrderWithProducts";
ALTER TABLE "new_OrderWithProducts" RENAME TO "OrderWithProducts";
CREATE UNIQUE INDEX "OrderWithProducts_idOrder_idProduct_key" ON "OrderWithProducts"("idOrder", "idProduct");
CREATE TABLE "new_Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idCustomer" INTEGER NOT NULL,
    "idProduct" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "date" DATETIME NOT NULL,
    CONSTRAINT "Review_idCustomer_fkey" FOREIGN KEY ("idCustomer") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Review_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Review" ("date", "description", "id", "idCustomer", "idProduct", "rating", "title") SELECT "date", "description", "id", "idCustomer", "idProduct", "rating", "title" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
