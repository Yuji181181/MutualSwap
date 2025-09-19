import { userAuthenticationCheck } from "@/app/actions/userAuthenticationCheck";
import LoginForm from "@/components/domain/(unauthenticated)/login/loginForm";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const userId = await userAuthenticationCheck();
  if (userId) redirect("/dashboard");

  return <LoginForm />;
};

export default LoginPage;
