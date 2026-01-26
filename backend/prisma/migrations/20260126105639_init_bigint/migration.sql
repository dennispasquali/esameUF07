-- CreateTable
CREATE TABLE "Nation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "City" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "cap" TEXT NOT NULL,
    "idNation" INTEGER NOT NULL,
    CONSTRAINT "City_idNation_fkey" FOREIGN KEY ("idNation") REFERENCES "Nation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "pwd" TEXT NOT NULL,
    "googleId" TEXT
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "idUser" INTEGER NOT NULL,
    CONSTRAINT "Employee_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idUser" INTEGER NOT NULL,
    CONSTRAINT "Admin_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "phonePrefix" BIGINT NOT NULL,
    "phoneNumber" BIGINT NOT NULL,
    "street" TEXT NOT NULL,
    "civic" BIGINT NOT NULL,
    "imgProfile" TEXT,
    "idUser" INTEGER NOT NULL,
    "idCity" INTEGER NOT NULL,
    CONSTRAINT "Customer_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Customer_idCity_fkey" FOREIGN KEY ("idCity") REFERENCES "City" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "img" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "qt" BIGINT NOT NULL,
    "weigth" REAL NOT NULL,
    "heigth" BIGINT NOT NULL,
    "width" BIGINT NOT NULL,
    "length" BIGINT NOT NULL,
    "oldPrice" REAL,
    "shippingDate" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idCustomer" INTEGER NOT NULL,
    "idProduct" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "date" DATETIME NOT NULL,
    CONSTRAINT "Review_idCustomer_fkey" FOREIGN KEY ("idCustomer") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Review_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Carosello" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "img" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "caption" TEXT
);

-- CreateTable
CREATE TABLE "Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idUser" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'carrello',
    "statusColor" TEXT NOT NULL DEFAULT 'none',
    "urlTracking" TEXT NOT NULL,
    "typeOrder" TEXT NOT NULL,
    CONSTRAINT "Order_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OrderWithProducts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "qt" BIGINT NOT NULL,
    "idProduct" INTEGER NOT NULL,
    "idOrder" INTEGER NOT NULL,
    CONSTRAINT "OrderWithProducts_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderWithProducts_idOrder_fkey" FOREIGN KEY ("idOrder") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Nation_name_key" ON "Nation"("name");

-- CreateIndex
CREATE UNIQUE INDEX "City_name_cap_key" ON "City"("name", "cap");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_idUser_key" ON "Employee"("idUser");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_idUser_key" ON "Admin"("idUser");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_idUser_key" ON "Customer"("idUser");
