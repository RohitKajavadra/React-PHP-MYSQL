import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import SocialMedia from "./SocialMedia";
import axios from "axios";
import swal from "sweetalert";
import { UserContext } from "../../App";

const SignInForm = ({ handleResponse }) => {
  const { setUser, setAdmin, setUserImage } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [inputs, setInputs] = useState([]);
  const [value, setvalue] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      onSubmit();
    }
  }, [formErrors]);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    setvalue((values) => ({ ...values, [name]: value }));
  };
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    } else if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };
  const onSubmit = () => {
    axios
      .post("http://localhost/api/login.php", inputs)
      .then((result) => {
        if (result.data.Status === "200") {
          if (result.data.isAdmin != 0) {
            setAdmin(1);
          }
          setUser({
            isSignedIn: true,
            name: result.data.name,
            email: result.data.email,
          });
          if (result.data.imgUrl != "") {
            setUserImage(result.data.imgUrl);
          }
          localStorage.setItem("name", result.data.name);
          localStorage.setItem("email", result.data.email);
          localStorage.setItem("isAdmin", result.data.isAdmin);
          handleResponse(result.data.name);
          setIsSubmit(false);
        } else {
          swal({
            title: "Warning!",
            text: "User does not exits",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          });
        }
        setInputs([]);
        setvalue({
          email: "",
          password: "",
        });
      })
      .catch((e) => console.log("log in error", e));
  };
  const handleSubmits = (e) => {
    e.preventDefault();
    setFormErrors(validate(value));
    setIsSubmit(true);
  };
  return (
    <form onSubmit={handleSubmits} className="sign-in-form">
      <h2 className="title">Sign in</h2>
      <div className="input-field">
        <span className="fIcon">
          <FontAwesomeIcon icon={faEnvelope} />
        </span>
        <input
          placeholder="Email"
          {...register("email", { required: true })}
          autoComplete="off"
          value={value.email}
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
          placeholder="Password"
          {...register("password", { required: true })}
          autoComplete="off"
          value={value.password.trim()}
          onChange={handleChange}
        />
      </div>
      <span className="text-warning">{formErrors.password}</span>
      <input className="iBtn" type="submit" value="sign In" />
      <p className="social-text">Or Sign in with social platforms</p>
      <SocialMedia />
    </form>
  );
};

export default SignInForm;
