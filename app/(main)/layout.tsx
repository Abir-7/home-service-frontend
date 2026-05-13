import Navbar from "@/components/custom/common/navbar";
import { cookies } from "next/headers";
import { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has("auth_token");

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn}></Navbar>
      {children}
    </div>
  );
};

export default layout;
