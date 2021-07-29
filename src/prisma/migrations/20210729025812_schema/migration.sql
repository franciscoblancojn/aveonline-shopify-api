/*
  Warnings:

  - You are about to drop the column `host` on the `Tokens` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[shop]` on the table `Tokens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shop` to the `Tokens` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Tokens.host_unique";

-- AlterTable
ALTER TABLE "Tokens" DROP COLUMN "host",
ADD COLUMN     "shop" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Tokens.shop_unique" ON "Tokens"("shop");
