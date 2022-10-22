import React from "react";
import userImg from "../../../Assets/user1.png";
import "./Reviews.css";
import Fade from "react-awesome-reveal";

const Review = ({ review }) => {
  const { name, address, description, imgUrl } = review;
  return (
    <Fade bottom duration={1000} distance="40px">
      <div className="review">
        {imgUrl ? (
          <img src={imgUrl} alt="" />
        ) : (
          <img src={`${userImg}`} alt="" />
        )}
        <h5 className="testimonialName">{name}</h5>
        <h6 className="testimonialAddress">{address}</h6>
        <p>
          <i>{description}</i>
        </p>
      </div>
    </Fade>
  );
};

export default Review;
