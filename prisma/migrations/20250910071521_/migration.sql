-- DropForeignKey
ALTER TABLE "point_transactions" DROP CONSTRAINT "point_transactions_surveyId_fkey";

-- DropForeignKey
ALTER TABLE "point_transactions" DROP CONSTRAINT "point_transactions_userId_fkey";

-- DropForeignKey
ALTER TABLE "survey_responses" DROP CONSTRAINT "survey_responses_surveyId_fkey";

-- DropForeignKey
ALTER TABLE "survey_responses" DROP CONSTRAINT "survey_responses_userId_fkey";

-- DropForeignKey
ALTER TABLE "surveys" DROP CONSTRAINT "surveys_userId_fkey";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "grade" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "surveys" ADD CONSTRAINT "surveys_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "survey_responses" ADD CONSTRAINT "survey_responses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "survey_responses" ADD CONSTRAINT "survey_responses_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "surveys"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "point_transactions" ADD CONSTRAINT "point_transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "point_transactions" ADD CONSTRAINT "point_transactions_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "surveys"("id") ON DELETE CASCADE ON UPDATE CASCADE;
