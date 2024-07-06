import Header from "@/components/header/Header";
import Navegation from "@/components/navegation/Navegation";
import { UserAuthProvider } from "@/context/userAuthContext";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <>
      {/* <Navegation /> */}
      <Header />
      <main>{children}</main>
    </>
  );
}
