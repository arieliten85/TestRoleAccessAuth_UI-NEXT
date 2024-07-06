import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "./Layout";

import { UserAuthProvider } from "@/context/userAuthContext";
import {
  checkTokenExpiration,
  getTokenStorage,
  setAuthToken,
  startTokenExpirationCheck,
} from "@/utils/tokenService";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // useEffect(() => {
  //   const token = getTokenStorage();
  //   if (token) {
  //     setAuthToken(token);

  //     router.push("/home");
  //   } else {
  //     router.push("/");
  //   }
  // }, []);

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
