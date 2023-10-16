-- CreateTable
CREATE TABLE "class" (
    "id" UUID NOT NULL,
    "subject" VARCHAR(100) NOT NULL,
    "edition" SMALLINT NOT NULL,
    "class" VARCHAR(20),
    "max_students" SMALLINT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "class_pkey" PRIMARY KEY ("id")
);
