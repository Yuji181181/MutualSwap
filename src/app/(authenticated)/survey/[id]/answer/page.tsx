import SurveyAnswerPage from "@/components/domain/(authenticated)/survey/[id]/answer/SurveyAnswerPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async (props: PageProps) => {
  const params = await props.params;

  return <SurveyAnswerPage surveyId={params.id} />;
};

export default Page;
