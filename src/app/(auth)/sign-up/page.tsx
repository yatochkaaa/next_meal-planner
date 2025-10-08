import { Role } from "$/generated/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SignUpForm } from "@/app/(auth)/sign-up/_components/sign-up-form";

const Page = async () => {
  const session = await auth();

  if (session?.user.role === Role.ADMIN)
    redirect("/admin/foods-management/foods");
  if (session?.user.role === Role.USER) redirect("/client");

  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUpForm />
    </div>
  );
};

export default Page;
