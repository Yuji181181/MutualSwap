import { SurveyFormSkeleton } from "@/components/domain/(authenticated)/survey/SurveyFormSkeleton";

const Loading = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <SurveyFormSkeleton />
    </main>
  );
};

export default Loading;
