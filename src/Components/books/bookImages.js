import React, { useEffect, useRef, useState } from "react";
import "./book.css";

const BookImages = ({ images }) => {
  const [imageBorder, setImageBorder] = useState(0);

  const imagesRef = useRef(null);

  useEffect(() => {
    if (imagesRef.current) {
      if (imagesRef.current.children[imageBorder]) {
        imagesRef.current.children[imageBorder].style.border =
          "2px solid purple";
      }
    }

    return () => {
      if (imagesRef.current?.children[imageBorder]) {
        imagesRef.current.children[imageBorder].style.border = "";
      }
    };
  }, [imageBorder]);

  return (
    <div className="book_Images_Parent">
      <div ref={imagesRef} className="book_images_line">
        {images?.map((doc, i) => {
          return (
            <div
              onMouseEnter={(e) => {
                setImageBorder(e.currentTarget.id);
              }}
              id={i}
              className="book_single_image_left"
              key={i}
            >
              <img src={doc} alt={i} />
            </div>
          );
        })}
      </div>
      <div className="book_image_bigger">
        {images && <img src={images[imageBorder]} alt={imageBorder} />}
      </div>
    </div>
  );
};

export default BookImages;
