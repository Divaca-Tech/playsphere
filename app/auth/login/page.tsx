import LoginForm from "@/app/auth/login/LoginForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session?.user?.token) redirect("/dashboard");
  return <LoginForm />;
}
