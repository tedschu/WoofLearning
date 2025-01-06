-- CreateTable
CREATE TABLE "Incorrect_question" (
    "id" SERIAL NOT NULL,
    "equation" TEXT NOT NULL,
    "challenge_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Incorrect_question_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Incorrect_question_challenge_id_idx" ON "Incorrect_question"("challenge_id");

-- CreateIndex
CREATE INDEX "Incorrect_question_user_id_idx" ON "Incorrect_question"("user_id");

-- AddForeignKey
ALTER TABLE "Incorrect_question" ADD CONSTRAINT "Incorrect_question_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "Math_timed_scores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incorrect_question" ADD CONSTRAINT "Incorrect_question_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
