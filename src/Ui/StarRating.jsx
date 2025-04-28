import React from "react";
const StarRating = ({ rating, maxStars = 5 }) => {
  return (
    <div>
      {[...Array(maxStars)].map((_, index) => (
        <i
          key={index}
          className={index < rating ? "fa-solid fa-star" : "fa-regular fa-star"}
        ></i>
      ))}
    </div>
  );
};

export default StarRating;
