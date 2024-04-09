import LoginForm from "@/app/LoginForm";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
// import dashboard from "./dashboard";
import Navbar from "@/components/Navbar";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session?.user?.token) redirect("/dashboard");
  return <LoginForm />;
}
// export default async function Home() {
  
//   return <div className="layout">
//     <Navbar />
//     <main>
      
//     </main>
//   </div>;
// }
