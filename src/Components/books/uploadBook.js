import React, { useState } from "react";
import { Button, TextField, Alert, CircularProgress } from "@mui/material";
import { useUploadBook } from "../../hooks/useUploadBook";
import { useFormik } from "formik";
import { bookSchema } from "./bookSchemaYup";
import "./style.css";

const UploadBooks = () => {
  const [images, setImageValues] = useState([]);
  const { postBook, success, error, loading } = useUploadBook();

  const formik = useFormik({
    initialValues: {
      author: "",
      country: "",
      language: "",
      pages: 1,
      title: "",
      year: new Date().getFullYear(),
      description: "",
      binding: "",
      publisher: "",
      imageLink: [],
    },
    validationSchema: bookSchema,
    onSubmit: async (values) => {
      if (!images.length) {
        alert("Add images");
        return;
      }

      await postBook(images, {
        ...values,
        link: "",
      });
      setImageValues(() => []);
    },
  });

  if (error || success) {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }

  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">Successfully uploaded!</Alert>}

      <h1 className="form-row">UPLOAD BOOK</h1>

      <form className="uploadBooksForm" onSubmit={formik.handleSubmit}>
        <div className="form-row">
          <TextField
            autoFocus
            fullWidth
            id="title"
            name="title"
            label="title*"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
        </div>
        <div className="form-row">
          <TextField
            fullWidth
            id="author"
            name="author"
            label="author*"
            value={formik.values.author}
            onChange={formik.handleChange}
            error={formik.touched.author && Boolean(formik.errors.author)}
            helperText={formik.touched.author && formik.errors.author}
          />
        </div>
        <div className="form-row">
          <TextField
            fullWidth
            id="country"
            name="country"
            label="country*"
            value={formik.values.country}
            onChange={formik.handleChange}
            error={formik.touched.country && Boolean(formik.errors.country)}
            helperText={formik.touched.country && formik.errors.country}
          />
        </div>
        <div className="form-row">
          <TextField
            fullWidth
            id="pages"
            name="pages"
            label="pages*"
            value={formik.values.pages}
            onChange={formik.handleChange}
            error={formik.touched.pages && Boolean(formik.errors.pages)}
            helperText={formik.touched.pages && formik.errors.pages}
          />
        </div>
        <div className="form-row">
          <TextField
            fullWidth
            id="year"
            name="year"
            label="year*"
            value={formik.values.year}
            onChange={formik.handleChange}
            error={formik.touched.year && Boolean(formik.errors.year)}
            helperText={formik.touched.year && formik.errors.year}
          />
        </div>
        <div className="form-row">
          <TextField
            fullWidth
            id="language"
            name="language"
            label="language*"
            value={formik.values.language}
            onChange={formik.handleChange}
            error={formik.touched.language && Boolean(formik.errors.language)}
            helperText={formik.touched.language && formik.errors.language}
          />
        </div>
        <div className="form-row">
          <TextField
            fullWidth
            id="description"
            name="description"
            label="description*"
            rows={4}
            multiline
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
        </div>
        <div className="form-row">
          <TextField
            fullWidth
            id="binding"
            name="binding"
            label="binding*"
            value={formik.values.binding}
            onChange={formik.handleChange}
            error={formik.touched.binding && Boolean(formik.errors.binding)}
            helperText={formik.touched.binding && formik.errors.binding}
          />
        </div>
        <div className="form-row">
          <TextField
            fullWidth
            id="publisher"
            name="publisher"
            label="publisher*"
            value={formik.values.publisher}
            onChange={formik.handleChange}
            error={formik.touched.publisher && Boolean(formik.errors.publisher)}
            helperText={formik.touched.publisher && formik.errors.publisher}
          />
        </div>
        <div className="form-row">
          <input
            multiple
            type="file"
            accept="image/*"
            onChange={(e) => setImageValues([...e.target.files])}
          />
        </div>

        <Button
          onClick={formik.handleSubmit}
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          className="formButton"
        >
          {loading ? (
            <CircularProgress
              style={{ width: "25px", height: "25px", color: "red" }}
            />
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </div>
  );
};

export default UploadBooks;
