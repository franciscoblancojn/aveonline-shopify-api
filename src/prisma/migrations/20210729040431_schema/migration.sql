-- CreateTable
CREATE TABLE "Tokens" (
    "shop" VARCHAR(255) NOT NULL,
    "token" VARCHAR(255) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Tokens.shop_unique" ON "Tokens"("shop");
