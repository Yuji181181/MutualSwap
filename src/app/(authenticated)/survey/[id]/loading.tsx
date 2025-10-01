import { SurveyDetailSkeleton } from "@/components/domain/(authenticated)/survey/SurveyDetailSkeleton";

const Loading = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <SurveyDetailSkeleton />
    </main>
  );
};

export default Loading;
