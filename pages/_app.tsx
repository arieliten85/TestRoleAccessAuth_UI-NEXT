import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Layout from "./Layout";
import { UserAuthProvider } from "@/context/userAuthContext";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const noLayout = ["/login", "/register", "/", "/session-expired"];
  const shouldRenderLayout = !noLayout.includes(router.pathname);

  return (
    <UserAuthProvider>
      {shouldRenderLayout ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </UserAuthProvider>
  );
}
