-- CreateTable
CREATE TABLE "Provinsi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kodeProvinsi" TEXT NOT NULL,
    "namaProvinsi" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Kota" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kodeKota" TEXT NOT NULL,
    "namaKota" TEXT NOT NULL,
    "provinsiId" INTEGER,
    CONSTRAINT "Kota_provinsiId_fkey" FOREIGN KEY ("provinsiId") REFERENCES "Provinsi" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Kecamatan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kodeKecamatan" TEXT NOT NULL,
    "namaKecamatan" TEXT NOT NULL,
    "kotaId" INTEGER,
    CONSTRAINT "Kecamatan_kotaId_fkey" FOREIGN KEY ("kotaId") REFERENCES "Kota" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Desa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kodeDesa" TEXT NOT NULL,
    "namaDesa" TEXT NOT NULL,
    "kecamatanId" INTEGER,
    CONSTRAINT "Desa_kecamatanId_fkey" FOREIGN KEY ("kecamatanId") REFERENCES "Kecamatan" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Provinsi_kodeProvinsi_key" ON "Provinsi"("kodeProvinsi");

-- CreateIndex
CREATE UNIQUE INDEX "Kota_kodeKota_key" ON "Kota"("kodeKota");

-- CreateIndex
CREATE UNIQUE INDEX "Kecamatan_kodeKecamatan_key" ON "Kecamatan"("kodeKecamatan");

-- CreateIndex
CREATE UNIQUE INDEX "Desa_kodeDesa_key" ON "Desa"("kodeDesa");
