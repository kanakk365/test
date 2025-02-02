import { redirect } from "next/navigation";
import { auth } from "@/auth";
import DashIndex from ".";

export default async function Dashboard() {
  const session = await auth();
  if (!session?.user.jwt) {
    redirect(`/auth/login`);
  }

  return <DashIndex />;
}
