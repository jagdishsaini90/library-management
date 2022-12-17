import * as Yup from "yup";

export const bookSchema = Yup.object().shape({
  title: Yup.string().required("title is required"),
  author: Yup.string().required("author is required"),
  country: Yup.string().required("country is required"),
  language: Yup.string().required("language is required"),
  year: Yup.number()
    .min(1000)
    .max(new Date().getFullYear())
    .required("year is required"),
  pages: Yup.number().min(1).required("pages is required"),
  description: Yup.string().required("description is required"),
  binding: Yup.string().required("binding is required"),
  publisher: Yup.string().required("publisher is required"),
});
