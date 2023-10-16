-- CreateTable
CREATE TABLE "assessment" (
    "id" UUID NOT NULL,
    "module" VARCHAR(100) NOT NULL,
    "grade" DECIMAL(4,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "student_id" UUID NOT NULL,

    CONSTRAINT "assessment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "assessment" ADD CONSTRAINT "assessment_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
