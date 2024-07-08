import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

import styles from "../styles/Home.module.css";
import Image from "next/image";
import { useUserAuthContext } from "@/context/userAuthContext";
import { useFetchService } from "@/hook/useFetchService";

export default function Home() {
  const [result, setResults] = useState<string>("");
  const { user } = useUserAuthContext();
  const {
    fetchGet,
    fetchPost,
    fetchPut,
    fetchDelete,
    error,
    loading,
    setError,
    data,
  } = useFetchService();

  useEffect(() => {
    if (typeof data === "string") {
      setResults(data);

      setTimeout(() => {
        setResults("");
      }, 5000);
    }
    if (typeof error === "string") {
      setResults("");

      setTimeout(() => {
        setError("");
      }, 5000);
    }
  }, [data, error]);

  if (loading) {
    return (
      <div className={styles.SpinnerContainer}>
        <ClipLoader
          color={"#000000"}
          loading={loading}
          size={150}
          speedMultiplier={1}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.formUser}>
          <h2>User Information</h2>
          <p>Name</p>
          <p className={styles.inputText}>{user.name}</p>
          <p>Role</p>
          <p className={styles.inputText}>{user.role}</p>
          <p>Authoritys</p>
          <p className={styles.inputText}>{user.authorities}</p>
        </div>
        <div className={styles.buttons}>
          <div className={styles.buttonsItems}>
            <Image
              className={styles.logo}
              src="/get.png"
              alt="java.js Logo"
              width={55}
              height={52}
              priority
            />
            <button className={styles.buttonGet} onClick={() => fetchGet()}>
              Read
            </button>
          </div>

          <div className={styles.buttonsItems}>
            <Image
              className={styles.logo}
              src="/create.png"
              alt="java.js Logo"
              width={50}
              height={50}
              priority
            />
            <button className={styles.buttonPost} onClick={() => fetchPost()}>
              Create
            </button>
          </div>

          <div className={styles.buttonsItems}>
            <Image
              className={styles.logo}
              src="/update.png"
              alt="java.js Logo"
              width={60}
              height={50}
              priority
            />
            <button className={styles.buttonPut} onClick={() => fetchPut()}>
              Update
            </button>
          </div>

          <div className={styles.buttonsItems}>
            <Image
              className={styles.logo}
              src="/delete.png"
              alt="java.js Logo"
              width={50}
              height={50}
              priority
            />
            <button
              className={styles.buttonDelete}
              onClick={() => fetchDelete()}
            >
              Delete
            </button>
          </div>
        </div>

        <div className={styles.resposeContainer}>
          <p className={styles.success}>
            {result && (
              <>
                <Image
                  className={styles.iconStatusResults}
                  src="/ok.png"
                  alt="java.js Logo"
                  width={60}
                  height={35}
                  priority
                />
                {result}
              </>
            )}
          </p>
          {error && (
            <div className={styles.denied}>
              <p>
                {error && (
                  <>
                    <Image
                      className={styles.iconStatusResults}
                      src="/badIcon.png"
                      alt="java.js Logo"
                      width={25}
                      height={20}
                      priority
                    />
                    {error}
                  </>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
