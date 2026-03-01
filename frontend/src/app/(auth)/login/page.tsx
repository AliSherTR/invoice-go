import LoginPage from "@/features/auth/pages/login-page";
import { requireUnauth } from "@/lib/auth-utils";

export default async function page() {
  await requireUnauth();
  return <LoginPage />;
}
