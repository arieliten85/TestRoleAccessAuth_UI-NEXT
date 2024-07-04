import * as Yup from "yup";
export const validationSchemaRegister = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password must be at least 4 characters"),
  role: Yup.string().required("Role is required"),
});

export const validationSchemaLogin = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password must be at least 4 characters"),
});
