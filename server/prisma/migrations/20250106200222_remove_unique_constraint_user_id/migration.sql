-- DropIndex
DROP INDEX "Math_timed_scores_user_id_key";

-- CreateIndex
CREATE INDEX "Math_timed_scores_user_id_idx" ON "Math_timed_scores"("user_id");
