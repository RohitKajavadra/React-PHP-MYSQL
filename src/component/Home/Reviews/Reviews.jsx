import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import Review from "./Review";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SwiperCore, { Autoplay, Pagination } from "swiper/core";
import Spinner from "../../Shared/Spinner/Spinner";
import axios from "axios";

const Reviews = () => {
  SwiperCore.use([Pagination, Autoplay]);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    axios.get("http://localhost/api/Review.php").then((res) => {
      setReviews(res.data);
    });
  }, []);
  return (
    <section id="testimonial">
      <h4 className="miniTitle text-center">TESTIMONIALS</h4>
      <div className="text-center mb-4">
        <h3 className="sectionTitle">WHAT OUR CLIENTS SAY’S</h3>
      </div>
      <Col md={11} className="mx-auto">
        <Swiper
          pagination={{ clickable: true }}
          slidesPerView={3}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 3,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          spaceBetween={10}
        >
          {reviews.length === 0 ? (
            <div className="text-center">
              <Spinner />
            </div>
          ) : (
            reviews.map((item) => {
              return (
                <SwiperSlide key={item._id}>
                  <Review review={item} key={item._id} />
                </SwiperSlide>
              );
            })
          )}
        </Swiper>
      </Col>
    </section>
  );
};

export default Reviews;
