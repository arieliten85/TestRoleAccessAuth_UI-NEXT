import React from "react";

import styles from "../../styles/Header.module.css";
import { useRouter } from "next/router";
import {
  removeTimeExpiredTokenStorage,
  removeTokenStorage,
  removeUserStorage,
} from "@/utils/tokenService";

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    removeTokenStorage();
    removeTimeExpiredTokenStorage();
    removeUserStorage();
    router.push("/");
  };
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Test-Authority</h1>
      <button className={styles.logoutButton} onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
}
