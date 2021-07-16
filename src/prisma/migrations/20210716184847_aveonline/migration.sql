-- CreateTable
CREATE TABLE "Tokens" (
    "host" VARCHAR(255) NOT NULL,
    "token" VARCHAR(255) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Tokens.host_unique" ON "Tokens"("host");
