import React, { useEffect, useState } from "react";

import styles from "@/styles/Home.module.css";
import { useFetchService } from "@/hook/useFetchService";
import { useUserAuthContext } from "@/context/userAuthContext";

export default function Home() {
  const { user } = useUserAuthContext();
  const { fetchGet, fetchPost, fetchPut, fetchDelete, error, setError, data } =
    useFetchService();

  useEffect(() => {
    if (error) {
      alert(error);
      setError(null);
    }
  }, [error, setError]);

  const renderData = () => {
    if (typeof data === "string") {
      return data;
    }
    if (data && typeof data === "object") {
      return <pre>{JSON.stringify(data, null, 2)}</pre>;
    }
    return null;
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerUserInfo}>
        <div className={styles.info}>
          <p>
            NAME: <span>{user.name}</span>
          </p>
          <p>
            Role: <span>{user.role}</span>
          </p>
        </div>

        <p>{"AUTHORITIES: " + user.authorities}</p>
      </div>
      <div className={styles.access}>
        <button className={styles.buttonAccess} onClick={() => fetchGet()}>
          Acceso GET
        </button>
        <button onClick={() => fetchPost()} className={styles.buttonAccess}>
          Acceso POST
        </button>
        <button onClick={() => fetchPut()} className={styles.buttonAccess}>
          Acceso PUT
        </button>
        <button onClick={() => fetchDelete()} className={styles.buttonAccess}>
          Acceso DELETE
        </button>
        {/* <h1>{info ? info : "NO HAY DATA"}</h1> */}
      </div>
      {renderData()}
    </div>
  );
}
