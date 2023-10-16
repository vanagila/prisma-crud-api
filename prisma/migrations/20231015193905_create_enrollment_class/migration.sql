-- CreateTable
CREATE TABLE "enrollment" (
    "control_number" BIGINT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "id_student" UUID NOT NULL,
    "id_class" UUID NOT NULL,

    CONSTRAINT "enrollment_pkey" PRIMARY KEY ("id_student","id_class")
);

-- CreateIndex
CREATE UNIQUE INDEX "enrollment_control_number_key" ON "enrollment"("control_number");

-- AddForeignKey
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_id_student_fkey" FOREIGN KEY ("id_student") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_id_class_fkey" FOREIGN KEY ("id_class") REFERENCES "class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
