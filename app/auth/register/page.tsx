import RegisterForm from "@/app/auth/register/RegisterForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Register() {
  const session = await getServerSession(authOptions);
  if (session?.user?.token) redirect("/dashboard");
  return <RegisterForm />;
}
