import { useUserAuthContext } from "@/context/userAuthContext";
import styles from "../../styles/Navigation.module.css";

import { removeTokenStorage, removeUserStorage } from "@/utils/tokenService";
import { useRouter } from "next/router";
import React, { use } from "react";

export default function Navegation() {
  const { user } = useUserAuthContext();
  const router = useRouter();

  const handleLogout = () => {
    removeTokenStorage();
    removeUserStorage();
    router.push("/");
  };

  return (
    <div className={styles.container}>
      <p>TestAuthority</p>

      <button onClick={handleLogout} className={styles.buttonLogOut}>
        Logout
      </button>
    </div>
  );
}
