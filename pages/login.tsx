import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import styles from "../styles/FormSession.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { validationSchemaLogin } from "@/validation/schemas";
import { loginUser } from "./api/userAuth";
import { useUserAuthContext } from "@/context/userAuthContext";
import { setAuthToken } from "@/utils/tokenService";
import { useState } from "react";
import { Spinner } from "@/components/spinner/Spinner";

interface FormValues {
  username: string;
  password: string;
}

interface LoginResponse {
  username: string;
  message: string;
  status: boolean;
  jwt: string;
}

const initialValues: FormValues = {
  username: "",
  password: "",
};

export default function Login() {
  const [loading, seloading] = useState<boolean>(false);
  const { setToken } = useUserAuthContext();
  const router = useRouter();

  const handleLogin = async (
    values: FormValues,
    { setStatus, resetForm }: FormikHelpers<FormValues>
  ) => {
    seloading(true);
    try {
      const response: LoginResponse = await loginUser({
        username: values.username,
        password: values.password,
      });

      if (response.status) {
        setToken(response.jwt);
        setAuthToken(response.jwt);
        router.push("/home");
        resetForm();
      } else {
        setTimeout(() => {
          seloading(false);
          setStatus(response.message);
        }, 300);
      }
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchemaLogin}
        onSubmit={handleLogin}
      >
        {({ status }) => (
          <Form className={styles.form}>
            <h2 className={styles.title}>Login</h2>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <Field
              type="text"
              id="username"
              name="username"
              placeholder="your name"
              className={styles.input}
            />
            <ErrorMessage
              name="username"
              component="p"
              className={styles.error}
            />

            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="your password"
              className={styles.input}
            />
            <ErrorMessage
              name="password"
              component="p"
              className={styles.error}
            />

            <p className={styles.infoText}>
              Don't have an account?{" "}
              <Link href={"/register"}>
                <strong>Register</strong>
              </Link>
            </p>

            <button type="submit" className={styles.button}>
              {!loading ? "Login" : <Spinner />}
            </button>

            {status && (
              <div
                style={{
                  textAlign: "center",
                  width: "100%",
                  paddingTop: "5px",
                }}
              >
                <p className={styles.error}>{status}</p>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
