import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";

import styles from "../styles/Register.module.css";
import { validationSchemaRegister } from "@/validation/schemas";
import { registerUser } from "./api/userAuth";
import { useRouter } from "next/router";
import Link from "next/link";

interface FormValues {
  username: string;
  password: string;
  role: string;
}
interface RegisterResponse {
  username: string;
  message: string;

  status: false;
}

const initialValues: FormValues = {
  username: "",
  password: "",
  role: "",
};

export default function Register() {
  const router = useRouter();

  const handleRegister = async (
    values: FormValues,
    { setSubmitting, setStatus, resetForm }: FormikHelpers<FormValues>
  ) => {
    const response: RegisterResponse = await registerUser({
      username: values.username,
      password: values.password,
      roleRequest: {
        roleListName: [values.role],
      },
    });

    if (response) {
      if (response.status) {
        router.push("/login");
        resetForm();
      } else {
        setStatus(response.message);
      }
    }
  };

  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchemaRegister}
        onSubmit={handleRegister}
      >
        {({ errors, touched, status }) => (
          <Form className={styles.form}>
            <h2 className={styles.title}>Register</h2>
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
            {errors.username && touched.username ? (
              <p className={styles.error}>{errors.username}</p>
            ) : null}
            {/* ---- */}
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
            {errors.password && touched.password ? (
              <p className={styles.error}>{errors.password}</p>
            ) : null}

            {/* ---- */}

            <label htmlFor="role" className={styles.label}>
              Role
            </label>
            <Field as="select" id="role" name="role" className={styles.input}>
              <option value="">Select Role</option>
              <option value="ADMIN">ADMIN</option>
              <option value="INVITED">INVITED</option>
              <option value="USER">USER</option>
            </Field>
            {errors.role && touched.role ? (
              <p className={styles.error}>{errors.role}</p>
            ) : null}

            <p className={styles.infoText}>
              Are you already registered?{" "}
              <Link href={"login"}>
                <strong> Login</strong>
              </Link>{" "}
            </p>

            <button type="submit" className={styles.button}>
              Register
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
