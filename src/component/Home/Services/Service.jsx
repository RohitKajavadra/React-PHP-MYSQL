import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Service.css";
import Fade from "react-awesome-reveal";
import "./Service.css";
import { UserContext } from "../../../App";
const Service = ({ service }) => {
  const { admin, setSelectedService } = useContext(UserContext);
  const { service_name, price, description, imgUrl } = service;
  const history = useNavigate();
  return (
    <div className="col-md-6 col-lg-4 service">
      <Fade bottom duration={2700} distance="70px">
        <div className="service-card">
          <div className="text-center">
            <img src={`${imgUrl}`} alt="" className="serviceImg" />
          </div>
          <h4 className="serviceName">{service_name}</h4>
          <p className="serviceDes">{description}</p>
          <div className="bookingBox">
            <p className="servicePrice">&#8377; {price}</p>
            {/* <Link className="serviceLink" to={admin ? '/dashboard/orderList' : '/dashboard/book'}> */}
            <button
              className="bookingBtn"
              onClick={() => {
                history(admin ? "/dashboard/orderList" : "/dashboard/book");
                setSelectedService(service);
              }}
            >
              Book Now
            </button>
            {/* </Link> */}
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default Service;
