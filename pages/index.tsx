import Image from "next/image";
import styles from "@/styles/Index.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.tecno}>
        <Image
          className={styles.logo}
          src="/springboot.png"
          alt="springboot Logo"
          width={80}
          height={80}
          priority
        />
        <Image
          className={styles.logo}
          src="/java.png"
          alt="java.js Logo"
          width={80}
          height={80}
          priority
        />
        <Image
          className={styles.logo}
          src="/jwt.png"
          alt="jwt Logo"
          width={80}
          height={80}
          priority
        />
        <Image
          className={styles.logo}
          src="/next.png"
          alt="next.js Logo"
          width={80}
          height={80}
          priority
        />
      </div>
      <main className={styles.main}>
        <div className={styles.description}>
          <h1>Welcome to Test Authorizer</h1>
          <p>
            In this study project, an authentication system was implemented
            where each user can access different routes based on their role.{" "}
          </p>
        </div>

        <div className={styles.center}>
          <Link href={"/login"}>
            <button className={styles.button}>START</button>
          </Link>
        </div>

        <p> By Ariel Ferencak</p>
      </main>
    </div>
  );
}
