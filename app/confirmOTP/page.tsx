import { getServerSession } from "next-auth";
import ConfirmOtp from "./ConfirmOtp";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function ConfirmOTP() {
  const session = await getServerSession(authOptions);
  if (session?.user?.token) redirect("/dashboard");
  return <ConfirmOtp />;
}
