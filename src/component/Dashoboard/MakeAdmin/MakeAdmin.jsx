import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";

const MakeAdmin = () => {
  const [inputs, setInputs] = useState({});
  const [value, setvalue] = useState({
    name: "",
    email: "",
    password: "",
    ConfirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
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
    const isWhitespace = values.name.trim().length === 0;
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "Admin name is required!";
    } else if (values.name.length < 2 || isWhitespace) {
      errors.name = "Admin name is not valid";
    } else if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    } else if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    } else if (!values.ConfirmPassword) {
      errors.ConfirmPassword = "Confirm Password is required";
    } else if (values.ConfirmPassword !== values.password) {
      errors.ConfirmPassword = "ConfirmPassword does not match";
    }
    return errors;
  };
  const onSubmit = () => {
    let newInput = { ...inputs, isAdmin: 1 };
    axios
      .post("http://localhost/api/index.php", newInput)
      .then((res) => {
        if (res.data.success == 1) {
          setInputs({});
          setvalue({
            name: "",
            email: "",
            password: "",
            ConfirmPassword: "",
          });
          setIsSubmit(false);
          toast("New Admin added Successfully", {
            duration: 3000,
            position: "top-center",
            icon: "👏",
            iconTheme: {
              primary: "#000",
              secondary: "#fff",
            },
            ariaProps: {
              role: "status",
              "aria-live": "polite",
            },
          });
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="px-2">
      <Toaster />
      <Form onSubmit={handleSubmits} className="makeAdmin">
        <Row>
          <Col>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>Admin Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="admin name"
                name="name"
                autoComplete="off"
                onChange={handleChange}
                value={value.name}
              />
            </Form.Group>
            <span className="text-warning">{formErrors.name}</span>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="email"
                name="email"
                autoComplete="off"
                onChange={handleChange}
                value={value.email}
              />
            </Form.Group>
            <span className="text-warning">{formErrors.email}</span>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                name="password"
                autoComplete="off"
                onChange={handleChange}
                value={value.password.trim()}
              />
            </Form.Group>
            <span className="text-warning">{formErrors.password}</span>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bold" }}>
                Confirm Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="confirm password"
                name="ConfirmPassword"
                autoComplete="off"
                onChange={handleChange}
                value={value.ConfirmPassword.trim()}
              />
            </Form.Group>
            <span className="text-warning">{formErrors.ConfirmPassword}</span>
            <Form.Group>
              <button type="submit" className="mainBtn adminBtn mx-1">
                Submit
              </button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default MakeAdmin;
