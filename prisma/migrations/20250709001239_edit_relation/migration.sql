-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Desa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kodeDesa" TEXT NOT NULL,
    "namaDesa" TEXT NOT NULL,
    "kecamatanId" TEXT,
    CONSTRAINT "Desa_kecamatanId_fkey" FOREIGN KEY ("kecamatanId") REFERENCES "Kecamatan" ("kodeKecamatan") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Desa" ("id", "kecamatanId", "kodeDesa", "namaDesa") SELECT "id", "kecamatanId", "kodeDesa", "namaDesa" FROM "Desa";
DROP TABLE "Desa";
ALTER TABLE "new_Desa" RENAME TO "Desa";
CREATE UNIQUE INDEX "Desa_kodeDesa_key" ON "Desa"("kodeDesa");
CREATE TABLE "new_Kecamatan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kodeKecamatan" TEXT NOT NULL,
    "namaKecamatan" TEXT NOT NULL,
    "kotaId" TEXT,
    CONSTRAINT "Kecamatan_kotaId_fkey" FOREIGN KEY ("kotaId") REFERENCES "Kota" ("kodeKota") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Kecamatan" ("id", "kodeKecamatan", "kotaId", "namaKecamatan") SELECT "id", "kodeKecamatan", "kotaId", "namaKecamatan" FROM "Kecamatan";
DROP TABLE "Kecamatan";
ALTER TABLE "new_Kecamatan" RENAME TO "Kecamatan";
CREATE UNIQUE INDEX "Kecamatan_kodeKecamatan_key" ON "Kecamatan"("kodeKecamatan");
CREATE TABLE "new_Kota" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kodeKota" TEXT NOT NULL,
    "namaKota" TEXT NOT NULL,
    "provinsiId" TEXT,
    CONSTRAINT "Kota_provinsiId_fkey" FOREIGN KEY ("provinsiId") REFERENCES "Provinsi" ("kodeProvinsi") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Kota" ("id", "kodeKota", "namaKota", "provinsiId") SELECT "id", "kodeKota", "namaKota", "provinsiId" FROM "Kota";
DROP TABLE "Kota";
ALTER TABLE "new_Kota" RENAME TO "Kota";
CREATE UNIQUE INDEX "Kota_kodeKota_key" ON "Kota"("kodeKota");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
