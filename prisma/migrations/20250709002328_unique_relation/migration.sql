/*
  Warnings:

  - A unique constraint covering the columns `[kecamatanId]` on the table `Desa` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[kotaId]` on the table `Kecamatan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[provinsiId]` on the table `Kota` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Desa_kecamatanId_key" ON "Desa"("kecamatanId");

-- CreateIndex
CREATE UNIQUE INDEX "Kecamatan_kotaId_key" ON "Kecamatan"("kotaId");

-- CreateIndex
CREATE UNIQUE INDEX "Kota_provinsiId_key" ON "Kota"("provinsiId");
