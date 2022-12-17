import React, { useEffect, useState } from "react";
import axios from "axios";
import "./search.css";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../axios/axiosIntercepters";

const SearchBox = () => {
  const [titles, setTitles] = useState([]);
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    if (isMounted && query) {
      const fetchData = async () => {
        await axiosInstance({
          method: "GET",
          url: `/search?query=${query}`,
          cancelToken: source.token,
        })
          .then((res) => {
            const { payload } = res.data;
            if (payload.length >= 3) {
              setTitles(() => payload.slice(0, 3));
              setCount(() => payload.length - 3);
            } else {
              setTitles(() => payload);
            }
          })
          .catch((error) => {
            if (axios.isCancel(error)) {
              return;
            } else {
              console.log(error.message);
            }
          });
      };

      fetchData();
    }

    if (!query) {
      setTitles(() => []);
    }

    return () => {
      isMounted = false;
      source.cancel();
    };
  }, [query]);

  return (
    <div className="searchBox">
      <input
        className="searchInput"
        placeholder="search books..."
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <div
        style={{
          display: titles.length > 0 ? "block" : "none",
        }}
        className="searchBoxDiv"
      >
        {titles &&
          titles.map((doc, i) => {
            return (
              <p
                onClick={() => {
                  setQuery(() => "");
                  navigate(`/books/${doc._id}`);
                }}
                className="searchTitle"
                key={i}
              >
                {doc.title}
              </p>
            );
          })}
        <p
          onClick={() => {
            let copy = query;
            setQuery(() => "");
            navigate(`/books/search/${copy}`);
          }}
          className="searchTitle"
        >
          show ({count}) more results
        </p>
      </div>
    </div>
  );
};

export default SearchBox;
