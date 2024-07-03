-- CreateTable
CREATE TABLE "reset_password_tokens" (
    "id" TEXT NOT NULL,
    "token_hashed" TEXT NOT NULL,
    "expiry_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "reset_password_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reset_password_tokens_user_id_key" ON "reset_password_tokens"("user_id");

-- AddForeignKey
ALTER TABLE "reset_password_tokens" ADD CONSTRAINT "reset_password_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
