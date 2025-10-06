import EditSurveyPage from "@/components/domain/(authenticated)/survey/[id]/edit/EditSurveyPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async (props: PageProps) => {
  const { id } = await props.params;
  return <EditSurveyPage id={id} />;
};

export default Page;
