import UserInfo from "@/app/dashboard/UserInfo";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.token) redirect("/");
  return <UserInfo />;
}
