import SurveyDetailPage from "@/components/domain/(authenticated)/survey/[id]/SurveyDetailPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async (props: PageProps) => {
  const { id } = await props.params;
  return <SurveyDetailPage id={id} />;
};

export default Page;
