import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import "../singleBook/book.css";

export default function BookCard({ doc }) {
  const navigate = useNavigate();
  return (
    <Card
      className="card_parent"
      sx={{ maxWidth: 300, margin: "10px", maxHeight: "550px" }}
    >
      <div className="card_image_media">
        <CardMedia
          className="cardImage"
          component="img"
          image={doc.imageLink[0]}
          alt="green iguana"
          loading="lazy"
        />
      </div>
      <CardContent className="cardContent">
        <Typography
          style={{
            fontWeight: "bold",
            whiteSpace: "nowrap",
            overflow: "hidden",
            width: "200px",
            textOverflow: "ellipsis",
          }}
          onClick={() => navigate(`/books/${doc._id}`)}
          gutterBottom
          variant="p"
          component="div"
        >
          {doc.title}
        </Typography>
        <Typography
          style={{
            width: "200px",
          }}
          variant="body2"
          color="text.secondary"
        >
          {doc.description?.slice(0, 100)}...
        </Typography>
      </CardContent>
    </Card>
  );
}
