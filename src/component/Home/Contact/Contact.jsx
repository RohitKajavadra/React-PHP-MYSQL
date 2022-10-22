import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./Contact.css";
import contactImg from "../../../Assets/contactus.webp";
import swal from "sweetalert";
import Fade from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../App";
import axios from "axios";
const Contact = () => {
  const { admin } = useContext(UserContext);
  const [value, setvalue] = useState({
    username: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setvalue((values) => ({ ...values, [name]: value }));
  };
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      onSubmit();
    }
  }, [formErrors]);
  const handleSubmits = (e) => {
    e.preventDefault();
    setFormErrors(validate(value));
    setIsSubmit(true);
  };
  const validate = (values) => {
    const isWhitespace = values.username.trim().length === 0;
    const issubject = values.subject.trim().length === 0;
    const ismessage = values.message.trim().length === 0;
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "User name is required!";
    } else if (values.username.length < 2 || isWhitespace) {
      errors.username = "User name is not valid";
    } else if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    } else if (!values.subject) {
      errors.subject = "subject is required";
    } else if (values.subject.length < 2 || issubject) {
      errors.subject = "subject is not valid";
    } else if (!values.message) {
      errors.message = "message is required";
    } else if (values.message.length < 2 || ismessage) {
      errors.message = "message is not valid";
    }
    return errors;
  };
  const onSubmit = () => {
    axios
      .post("http://localhost/api/contactUs.php", value)
      .then((res) => {
        if (res.data.success == 1) {
          setvalue({
            username: "",
            email: "",
            subject: "",
            message: "",
          });
          setIsSubmit(false);
          swal({
            title: `Thank You! ${value.username}`,
            text: `We appreciate you contacting us!`,
            icon: "success",
            buttons: false,
            timer: 2000,
          });
        } else {
          swal("Failed!", "Something went wrong! please try again", "error");
        }
      })
      .catch((e) => console.log(e));
  };
  const history = useNavigate();

  return (
    <section id="contact">
      <Col md={11} className="mx-auto">
        <Row>
          <Col md={6}>
            <Fade duration={2000} left>
              <form onSubmit={handleSubmits} className="contactForm">
                <h4 className="miniTitle">CONTACT US</h4>
                <h5 className="sectionTitle">GET IN TOUCH</h5>
                <Row>
                  <Col md={12} lg={6}>
                    <input
                      autoComplete="off"
                      placeholder="Your Name"
                      type="text"
                      name="username"
                      onChange={handleChange}
                      value={value.username}
                    />
                    <span className="text-warning">{formErrors.username}</span>
                  </Col>
                  <Col md={12} lg={6}>
                    <input
                      autoComplete="off"
                      placeholder="Your Email"
                      type="text"
                      name="email"
                      onChange={handleChange}
                      value={value.email}
                    />
                    <span className="text-warning">{formErrors.email}</span>
                  </Col>
                  <Col md={12}>
                    <input
                      autoComplete="off"
                      placeholder="Subject"
                      type="text"
                      name="subject"
                      onChange={handleChange}
                      value={value.subject}
                    />
                    <span className="text-warning">{formErrors.subject}</span>
                  </Col>
                  <Col md={12}>
                    <textarea
                      autoComplete="off"
                      placeholder="Your Message..."
                      name="message"
                      onChange={handleChange}
                      value={value.message}
                    ></textarea>
                    <span className="text-warning">{formErrors.message}</span>
                  </Col>
                </Row>
                <button
                  className="branBtn"
                  type="submit"
                  onClick={() => history(admin == 1 && "/dashboard/profile")}
                >
                  Submit Now
                </button>
              </form>
            </Fade>
          </Col>
          <Col md={6}>
            <Fade duration={2000} right>
              <img src={`${contactImg}`} alt="" className="img-fluid" />
            </Fade>
          </Col>
        </Row>
      </Col>
    </section>
  );
};

export default Contact;
