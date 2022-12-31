import { Alert, CircularProgress, Typography } from "@mui/material";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../axios/axiosIntercepters";
const BookImages = lazy(() => import("./bookImages"));

const BookPage = () => {
  const [book, setBook] = useState({});
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    let isMounted = true;
    setError(null);

    if (isMounted) {
      const fetchSingleBook = async () => {
        await axiosInstance({
          method: "GET",
          url: `/books/${id}`,
        })
          .then((res) => setBook(res.data.payload))
          .catch((err) => setError(err.response.data));
      };

      fetchSingleBook();
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      window.scrollTo({
        behavior: "smooth",
        top: 0,
      });
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <div className="book">
        <Suspense fallback={<CircularProgress />}>
          <BookImages images={book.imageLink} />
        </Suspense>
        <div className="book_right">
          <Typography className="bookTitle" variant="h3">
            {book.title}
          </Typography>
          <Typography style={{ fontStyle: "italic" }} variant="p">
            by {book.author}
          </Typography>
          <br />
          <br />
          <br />
          <Typography variant="p">
            <b>country</b> : {book.country}
          </Typography>
          <br />
          <Typography variant="p">
            <b>pages</b> : {book.pages}
          </Typography>
          <br />
          <Typography variant="p">
            <b>year</b> : {book.year}
          </Typography>
          <br />
          <Typography variant="p">
            <b>binding</b> : {book.binding}
          </Typography>
          <br />
          <Typography variant="p">
            <b>publisher</b> : {book.publisher}
          </Typography>
          <br />
          <br />
          <Typography variant="p">
            <b>description</b> : {book.description}
          </Typography>
        </div>
      </div>
    </>
  );
};

export default BookPage;
