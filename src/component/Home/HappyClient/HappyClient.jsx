import React from "react";
import "./HappyClient.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSmileBeam,
  faTasks,
  faHeadset,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import CountUp from "react-countup";
import Fade from "react-awesome-reveal";

const HappyClient = () => {
  const workDetails = [
    { title: "Happy Clients", number: 542, id: 1, icon: faSmileBeam },
    { title: "Projects", number: 623, id: 2, icon: faTasks },
    { title: "Hours of Support", number: 1634, id: 3, icon: faHeadset },
    { title: "Hard Workers", number: 31, id: 4, icon: faUsers },
  ];
  return (
    <section className="ourValue">
      <Fade bottom duration={2000} distance="70px">
        <div className="row container mx-auto">
          {workDetails.map(({ title, number, icon, id }) => {
            return (
              <div className="col-md-6 col-lg-3" key={id}>
                <Fade duration={`${id}50`} distance="70px">
                  <div className="ourValueDetails">
                    <span className={`valueIcon valueIcon${id}`}>
                      <FontAwesomeIcon icon={icon} />
                    </span>
                    <div>
                      <p className="ourValueTitle">{title}</p>
                      <h4 className="ourValueNumber">
                        <CountUp end={`${number}`} start={0} duration={12} />
                      </h4>
                    </div>
                  </div>
                </Fade>
              </div>
            );
          })}
        </div>
      </Fade>
    </section>
  );
};

export default HappyClient;
