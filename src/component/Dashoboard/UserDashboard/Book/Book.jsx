import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../App";
import { Form, Col, Row, Toast } from "react-bootstrap";
import "./Book.css";
import axios from "axios";
import ifoIcon from "../../../../Assets/info.svg";
import toast, { Toaster } from "react-hot-toast";
import swal from "sweetalert";

const Book = () => {
  const { selectedService, setSelectedService, user } = useContext(UserContext);
  const [services, setServices] = useState([]);
  const [show, setShow] = useState(true);
  const [value, setvalue] = useState({
    username: user.name,
    email: user.email,
    Address: "",
    Cnumber: "",
    expDate: "",
    CVC: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  useEffect(() => {
    axios.get("http://localhost/api/service.php").then((res) => {
      setServices(res.data);
      if (!selectedService.service_name) {
        setSelectedService(res.data[0]);
      }
    });
  }, [selectedService.service_name, setSelectedService]);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      onSubmit();
    }
  }, [formErrors]);

  const handleSelection = (e) => {
    const getService = services.find(
      ({ service_name }) => e.target.value === service_name
    );
    setSelectedService(getService);
  };

  setTimeout(() => {
    setShow(false);
  }, 7000);

  const onSubmit = async () => {
    const loading = toast.loading("Please wait...!");
    const orderData = {
      username: value.username,
      email: value.email,
      Address: value.Address,
      paymentMethod: "card",
      status: "Pending",
      serviceName: selectedService.service_name,
      description: selectedService.description,
      imgUrl: selectedService.imgUrl,
      price: selectedService.price,
    };
    axios
      .post("http://localhost/api/order.php", orderData)
      .then((res) => {
        if (res.data.success == 1) {
          toast.dismiss(loading);
          swal(
            "Congratulation!",
            "Your order has been placed successfully",
            "success",
            { duration: 2000 }
          );
          setvalue({
            username: "",
            email: "",
            Address: "",
            Cnumber: "",
            expDate: "",
            CVC: "",
          });
          setIsSubmit(false);
        }
      })
      .catch((err) => {
        toast.dismiss(loading);
        swal("Failed!", "Something went wrong! please try again", "error");
      });
  };
  const handleSubmits = (e) => {
    e.preventDefault();
    setFormErrors(validate(value));
    setIsSubmit(true);
  };
  const validate = (values) => {
    const isWhitespace = values.username.trim().length === 0;
    const isAddress = values.Address.trim().length === 0;
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    let MM = values.expDate.substring(0, 2);
    let YY = values.expDate.substring(3, 6);
    if (!values.username) {
      errors.name = "username is required!";
      toast.error("username is required!", { duration: 1000 });
    } else if (values.username.length < 2 || isWhitespace) {
      errors.name = "username is not valid";
      toast.error("username is not valid", {
        duration: 1000,
      });
    } else if (!values.email) {
      errors.email = "Email is required!";
      toast.error("Email is required!", { duration: 1000 });
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
      toast.error("This is not a valid email format!", { duration: 1000 });
    } else if (!values.Address) {
      errors.email = "Address is required!";
      toast.error("Address is required!", { duration: 1000 });
    } else if (values.Address.length < 2 || isAddress) {
      errors.email = "Address is not valid";
      toast.error("Address is not valid", { duration: 1000 });
    } else if (
      Number(values.Cnumber.length) != 20 ||
      values.Cnumber != "4242 4242 4242 4242 "
    ) {
      errors.email = "Credit card number is not valid ";
      toast.error("Credit card number is not valid ", { duration: 1000 });
      setShow(true);
    } else if (!values.expDate) {
      errors.password = "Expiry date is required";
      toast.error("Expiry date is required", { duration: 1000 });
    } else if (Number(MM) > 12 || Number(YY) < 22 || isNaN(MM)) {
      errors.password = "Expiry date is not valid";
      toast.error("Expiry date is not valid", { duration: 1000 });
    } else if ((!values.CVC && values.CVC.length != 3) || isNaN(values.CVC)) {
      errors.image = "CVC is not valid";
      toast.error("CVC is not valid", { duration: 1000 });
    }
    return errors;
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setvalue((values) => ({ ...values, [name]: value }));
  };
  const onchange = (e) => {
    const number = e.target.value;
    const val = number.replace(/\W/gi, "").replace(/(.{4})/g, "$1 ");
    setvalue((values) => ({
      ...values,
      Cnumber: val,
    }));
  };
  const onchangeExpiryDate = (e) => {
    const number = e.target.value;
    const val = number.replace(/\W/gi, "").replace(/(.{2})/g, "$1/");
    const date = val.substring(0, 5);
    setvalue((values) => ({
      ...values,
      expDate: date,
    }));
  };
  return (
    <div className="bookForm">
      <Toaster />
      <Toast show={show} onClose={() => setShow(!show)} className="bookToast">
        <Toast.Header>
          <img src={`${ifoIcon}`} className="rounded mr-2 toastIcon" alt="" />
          <strong className="mr-auto">Info</strong>
          <small> 02 seconds ago</small>
        </Toast.Header>
        <Toast.Body>
          4242 4242 4242 4242 you can use this card number for testing{" "}
        </Toast.Body>
      </Toast>
      <Form onSubmit={handleSubmits}>
        <Row>
          <Col md={6} xs={12} className="my-3">
            <Form.Label style={{ fontWeight: "bold" }}>Service</Form.Label>
            <select className="form-select" onChange={handleSelection}>
              {selectedService.service_name && (
                <option
                  className="activeService"
                  value={selectedService.service_name}
                >
                  {selectedService.service_name}
                </option>
              )}
              {services?.map(({ id, service_name }) => (
                <option key={id} value={service_name}>
                  {service_name}
                </option>
              ))}
            </select>

            <Form.Group>
              <Form.Label style={{ fontWeight: "bold", marginTop: 10 }}>
                Your Name
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Your Name"
                name="username"
                autoComplete="off"
                onChange={handleChange}
                value={value.username}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label style={{ fontWeight: "bold", marginTop: 10 }}>
                Email
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Email Address"
                name="email"
                autoComplete="off"
                onChange={handleChange}
                value={value.email}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label style={{ fontWeight: "bold", marginTop: 10 }}>
                Address
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                name="Address"
                autoComplete="off"
                onChange={handleChange}
                value={value.Address}
              />
            </Form.Group>
          </Col>
          <Col md={6} xs={12} className="my-3">
            <Form.Label style={{ fontWeight: "bold" }}>Price</Form.Label>
            <div className="priceInput">{selectedService.price}</div>

            <Form.Group>
              <Form.Label style={{ fontWeight: "bold", marginTop: 10 }}>
                Card Number
              </Form.Label>
              <Form.Control
                type="text"
                maxLength={19}
                placeholder="1234 1234 1234 1234"
                name="Cnumber"
                autoComplete="off"
                onChange={onchange}
                value={value.Cnumber}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label style={{ fontWeight: "bold", marginTop: 10 }}>
                Expiration Date
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="MM / YY"
                name="expDate"
                autoComplete="off"
                onChange={onchangeExpiryDate}
                value={value.expDate}
                maxLength={5}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label style={{ fontWeight: "bold", marginTop: 10 }}>
                CVC
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="CVC"
                maxLength={3}
                name="CVC"
                autoComplete="off"
                onChange={handleChange}
                value={value.CVC.trim()}
              />
            </Form.Group>
          </Col>
          <div className="text-center">
            <button className="mainBtn mt-4" type="submit">
              Pay Now
            </button>
          </div>
        </Row>
      </Form>
    </div>
  );
};

export default Book;
