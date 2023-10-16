-- AlterTable
ALTER TABLE "student" ALTER COLUMN "auth_token" DROP NOT NULL;

-- CreateTable
CREATE TABLE "address" (
    "id" UUID NOT NULL,
    "neighborhood" VARCHAR(100) NOT NULL,
    "cep" VARCHAR(8) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "uf" CHAR(2) NOT NULL,
    "complement" VARCHAR(100),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "student_id" UUID NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "address_student_id_key" ON "address"("student_id");

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
