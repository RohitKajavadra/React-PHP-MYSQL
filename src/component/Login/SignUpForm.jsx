import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import SocialMedia from "./SocialMedia";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const SignUpForm = () => {
  const [inputs, setInputs] = useState([]);
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
      errors.name = "Username is required!";
    } else if (values.name.length < 2 || isWhitespace) {
      errors.name = "Username is not valid";
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
    // const loading=toast.loading('Please wait...');
    axios
      .post("http://localhost/api/index.php", inputs)
      .then((res) => {
        setInputs([]);
        setvalue({
          name: "",
          email: "",
          password: "",
          ConfirmPassword: "",
        });
        setIsSubmit(false);
        toast("Your Registration Successfully", {
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
      })
      .catch((e) => console.log(e));
  };
  return (
    <form onSubmit={handleSubmits} className="sign-up-form">
      <Toaster />
      <h2 className="title">Sign Up</h2>
      <div className="input-field">
        <span className="fIcon">
          <FontAwesomeIcon icon={faUser} />
        </span>
        <input
          placeholder="Name"
          type="text"
          name="name"
          autoComplete="off"
          value={value.name}
          onChange={handleChange}
        />
      </div>
      <span className="text-warning">{formErrors.name}</span>
      <div className="input-field">
        <span className="fIcon">
          <FontAwesomeIcon icon={faEnvelope} />
        </span>
        <input
          placeholder="Email"
          type="text"
          name="email"
          autoComplete="off"
          value={value.email.trim()}
          onChange={handleChange}
        />
      </div>
      <span className="text-warning">{formErrors.email}</span>
      <div className="input-field">
        <span className="fIcon">
          <FontAwesomeIcon icon={faLock} />
        </span>
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="off"
          value={value.password.trim()}
          onChange={handleChange}
        />
      </div>
      <span className="text-warning">{formErrors.password}</span>
      <div className="input-field">
        <span className="fIcon">
          <FontAwesomeIcon icon={faLock} />
        </span>
        <input
          type="password"
          name="ConfirmPassword"
          placeholder="Confirm Password"
          autoComplete="off"
          value={value.ConfirmPassword.trim()}
          onChange={handleChange}
        />
      </div>
      <span className="text-warning">{formErrors.ConfirmPassword}</span>
      <input className="iBtn" type="submit" value="sign Up" />
      <p className="social-text">Or Sign up with social account</p>
      <SocialMedia />
    </form>
  );
};

export default SignUpForm;
