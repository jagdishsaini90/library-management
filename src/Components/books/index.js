import React, { useEffect, useState } from "react";
import { Alert, Pagination } from "@mui/material";
import { axiosInstance } from "../../axios/axiosIntercepters";
import BookCard from "./bookCard";
import { useNavigate } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    setError(null);

    const fetchBooks = async () => {
      await axiosInstance
        .get("/books", {
          params: {
            page,
          },
        })
        .then((res) => {
          if (isMounted) {
            setBooks(() => [...res.data.payload]);
            setPageCount(() => res.data.pageCount);
            window.scrollTo({
              behavior: "smooth",
              top: 0,
            });
          }
        })
        .catch((err) => {
          setError(err.response.data);
        });
    };

    fetchBooks();

    return () => {
      isMounted = false;
    };
  }, [page]);

  useEffect(() => {
    if (error === "Please login!") {
      navigate("/login");
    }
  }, [error, navigate]);

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <div className="renderBooks">
        {books?.map((doc, i) => {
          return <BookCard doc={doc} key={i} />;
        })}
        {books?.length === 0 ? <h1>No books present at the Moment!</h1> : null}
      </div>
      <hr />
      <Pagination
        onChange={(event, value) => setPage(value)}
        defaultPage={1}
        color="primary"
        className="pagination"
        count={pageCount}
      />
    </>
  );
};

export default Books;
