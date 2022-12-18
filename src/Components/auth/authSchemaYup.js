import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required("email is required")
    .email("That doesn't look like a valid email"),
  password: Yup.string().required("password is required"),
});

export const signupSchema = Yup.object().shape({
  email: Yup.string()
    .required("email is required")
    .email("That doesn't look like a valid email"),
  password: Yup.string().required("password is required"),
  firstname: Yup.string().required("firstname is required"),
  lastname: Yup.string().required("lastname is required"),
});
