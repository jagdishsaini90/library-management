import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Divider,
  List,
  ListItem,
  Container,
  Card,
  CardContent,
  Typography,
  CardMedia,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../axios/axiosIntercepters";
import "./searchPage.css";

const SearchPage = () => {
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);
  const { query } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      const fetchQueryResults = async () => {
        await axiosInstance({
          method: "GET",
          url: `/search?query=${query}`,
        })
          .then((res) => {
            setResult(res.data.payload);
          })
          .catch((err) => {
            setError(() => err.message);
          });
      };
      fetchQueryResults();
    }
  }, [query]);

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <Container>
        <nav aria-label="main mailbox folders">
          <List>
            <h1>Showing ({result.length}) books results</h1>
            {result?.map((doc, i) => {
              return (
                <ListItem key={i}>
                  <Card sx={{ display: "flex", width: "100%" }}>
                    <div
                      style={{
                        width: 200,
                        height: 200,
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{ width: "100%", height: "100%" }}
                        image={doc.imageLink[0]}
                        alt="Live from space album cover"
                      />
                    </div>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography
                          onClick={() => navigate(`/books/${doc._id}`)}
                          component="div"
                          variant="h5"
                          className="searchCardTitle"
                        >
                          {doc.title}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                        >
                          {doc.author}
                        </Typography>
                      </CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          pl: 1,
                          pb: 1,
                        }}
                      >
                        {doc.description}
                      </Box>
                    </Box>
                  </Card>
                </ListItem>
              );
            })}
          </List>
        </nav>
        <Divider />
      </Container>
    </>
  );
};

export default SearchPage;
