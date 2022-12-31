import React, { useState } from "react";
import { useFormik } from "formik";
import { Alert, Button, Container, TextField } from "@mui/material";
import * as Yup from "yup";
import { axiosInstance } from "../../../axios/axiosIntercepters";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const bookSearchSchema = Yup.object().shape({
  bookname: Yup.string().required("bookname is required"),
});

const issueBookSchema = Yup.object().shape({
  email: Yup.string()
    .required("email of user is required")
    .email("This is not a valid email"),
});

const IssueBook = () => {
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  const bookSearchformik = useFormik({
    initialValues: {
      bookname: "",
    },
    validationSchema: bookSearchSchema,
    onSubmit: async (values) => {
      setError(null);
      setBook(null);

      await axiosInstance({
        method: "POST",
        url: `/search`,
        data: JSON.stringify({
          bookname: values.bookname,
        }),
      })
        .then((res) => {
          if (res.data.payload === null) {
            setError(() => "Error : Book does not exist!");
          } else setBook(() => res.data.payload);
        })
        .catch((err) => {
          setError(err.response.data);
        });
    },
  });

  const issueBookFormik = useFormik({
    initialValues: {
      bookdata: book ? book : {},
      email: "",
    },
    validationSchema: issueBookSchema,
    onSubmit: async (values) => {
      setError(null);
    },
  });

  if (error) {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }

  return (
    <Container>
      {error && <Alert severity="error">{error}</Alert>}
      <h1>Issue Book</h1>
      <form onSubmit={bookSearchformik.handleSubmit}>
        <TextField
          margin="dense"
          fullWidth
          id="bookname"
          name="bookname"
          label="bookname*"
          value={bookSearchformik.values.bookname}
          onChange={(e) => {
            if (book !== null) {
              setBook(null);
            }
            bookSearchformik.handleChange(e);
          }}
          error={
            bookSearchformik.touched.bookname &&
            Boolean(bookSearchformik.errors.bookname)
          }
          helperText={
            bookSearchformik.touched.bookname &&
            bookSearchformik.errors.bookname
          }
        />
        <Button
          sx={{ mt: 3, background: book && "green" }}
          variant="contained"
          onClick={bookSearchformik.handleSubmit}
        >
          {book ? <TaskAltIcon /> : "Search book"}
        </Button>
      </form>
      {book && (
        <div style={{ marginTop: "40px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <img src={book.imageLink[0]} alt="book" />
            <h1 style={{ marginLeft: "20px" }}>{book.title}</h1>
          </div>
          <form
            style={{ marginTop: "40px" }}
            onSubmit={issueBookFormik.handleSubmit}
          >
            <TextField
              margin="dense"
              fullWidth
              id="email"
              name="email"
              label="user email*"
              value={issueBookFormik.values.email}
              onChange={issueBookFormik.handleChange}
              error={
                issueBookFormik.touched.email &&
                Boolean(issueBookFormik.errors.email)
              }
              helperText={
                issueBookFormik.touched.email && issueBookFormik.errors.email
              }
            />
            <Button
              sx={{ mt: 3 }}
              variant="contained"
              onClick={issueBookFormik.handleSubmit}
            >
              Issue book
            </Button>
          </form>
        </div>
      )}
    </Container>
  );
};

export default IssueBook;
