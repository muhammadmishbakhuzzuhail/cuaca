/*
  Warnings:

  - You are about to drop the `Desa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Kecamatan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Kota` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Provinsi` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Desa";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Kecamatan";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Kota";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Provinsi";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "provinsi" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nama" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "kota" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nama" TEXT NOT NULL,
    "provinsiId" TEXT NOT NULL,
    CONSTRAINT "kota_provinsiId_fkey" FOREIGN KEY ("provinsiId") REFERENCES "provinsi" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "kecamatan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nama" TEXT NOT NULL,
    "kotaId" TEXT NOT NULL,
    CONSTRAINT "kecamatan_kotaId_fkey" FOREIGN KEY ("kotaId") REFERENCES "kota" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "desa" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nama" TEXT NOT NULL,
    "kecamatanId" TEXT NOT NULL,
    CONSTRAINT "desa_kecamatanId_fkey" FOREIGN KEY ("kecamatanId") REFERENCES "kecamatan" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
