-- CreateTable
CREATE TABLE "Math_timed_scores" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "math_type" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "points_added" INTEGER NOT NULL,
    "questions_attempted" INTEGER NOT NULL,
    "questions_correct" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Math_timed_scores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Math_timed_scores_user_id_key" ON "Math_timed_scores"("user_id");

-- AddForeignKey
ALTER TABLE "Math_timed_scores" ADD CONSTRAINT "Math_timed_scores_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
