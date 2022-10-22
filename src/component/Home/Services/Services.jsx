import axios from "axios";
import React, { useEffect, useState } from "react";
import Service from "./Service";
import Spinner from "../../Shared/Spinner/Spinner";

const Services = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    try {
      axios.get("http://localhost/api/service.php").then((response) => {
        setServices(response.data);
      });
    } catch (error) {
      console.log("error get", error);
    }
  }, []);

  return (
    <section id="services" className="services">
      <h4 className="miniTitle text-center">SERVICES</h4>
      <div className="text-center">
        <h5 className="text-center sectionTitle">PROVIDE AWESOME SERVICE</h5>
      </div>
      {services.length === 0 && (
        <div className="spinner text-center">
          <Spinner />
        </div>
      )}
      <div className="row mt-4 container mx-auto justify-content-center">
        {services?.map((service, index) => (
          <Service key={service.updated_at + index} service={service} />
        ))}
      </div>
    </section>
  );
};

export default Services;
