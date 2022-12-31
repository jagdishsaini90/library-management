import React from "react";
import "./BookCardSkeleton.css";

const BookCardSkeleton = () => {
  return (
    <div className="BookCardSkeleton_card">
      <div className="BookCardSkeleton_header">
        <div className="BookCardSkeleton_img"></div>
      </div>
      <div className="BookCardSkeleton_description">
        <div className="BookCardSkeleton_line line-1"></div>
        <div className="BookCardSkeleton_line line-2"></div>
      </div>
    </div>
  );
};

export default BookCardSkeleton;
