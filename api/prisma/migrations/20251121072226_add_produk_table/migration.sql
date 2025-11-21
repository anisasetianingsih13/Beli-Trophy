-- CreateEnum
CREATE TYPE "Satuan" AS ENUM ('pcs', 'set', 'seri');

-- CreateTable
CREATE TABLE "tb_produk" (
    "id" SERIAL NOT NULL,
    "kode" VARCHAR(10) NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "harga" INTEGER NOT NULL,
    "satuan" "Satuan",
    "foto_url" TEXT,
    "deskripsi" TEXT,

    CONSTRAINT "tb_produk_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_produk_kode_key" ON "tb_produk"("kode");
