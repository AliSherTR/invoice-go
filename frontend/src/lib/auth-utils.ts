import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const requireUnauth = async () => {
  const cookiesStore = await cookies();

  //   redirect("/invoices");

  return true;
};
