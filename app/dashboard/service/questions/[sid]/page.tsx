import { redirect } from "next/navigation";
import { auth } from "@/auth";
import QuestionsViewPage from "@/components/common/dashboard/feature/questions/view-questions";
import DashHeader from "@/components/common/dashboard/header";
import Siderbar from "@/components/common/dashboard/sidebar";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Dashboard({ params }: any) {
  const { sid } = await params;
  const session = await auth();
  if (!session?.user.jwt) {
    redirect(`/auth/login`);
  }

  return (
    <div className="flex flex-col bg-white">
      <DashHeader />
      <div className="flex flex-1">
        <Siderbar />
        <QuestionsViewPage service_id={sid} />
      </div>
    </div>
  );
}
