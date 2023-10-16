/*
  Warnings:

  - Added the required column `number` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "address" ADD COLUMN     "number" VARCHAR(20) NOT NULL;
