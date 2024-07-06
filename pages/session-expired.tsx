import React from "react";
import styles from "../styles/Session-expired.module.css";
import Image from "next/image";
import Link from "next/link";
export default function newSession() {
  return (
    <div className={styles.container}>
      <Image
        className={styles.logo}
        src="/clock.png"
        alt="clock.js Logo"
        width={110}
        height={105}
        priority
      />

      <p>
        Your token has expired. To continue using our services, please log in
        again.
      </p>
      <Link href={"/login"}>
        <p className={styles.button}>Login</p>
      </Link>
    </div>
  );
}
