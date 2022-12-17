import { Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../axios/axiosIntercepters";
import BookImages from "./bookImages";

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

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <div className="book">
        <BookImages images={book.imageLink} />
        <div className="book_right">
          <h1>{book.title}</h1>
        </div>
      </div>
    </>
  );
};

export default BookPage;
