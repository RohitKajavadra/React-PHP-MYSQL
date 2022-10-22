import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./LoginModal.css";
import log from "../../Assets/log.svg";
import desk from "../../Assets/register.svg";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import swal from "sweetalert";

const Form = () => {
  const [isSignUp, setSignUp] = useState(false);
  const history = useNavigate();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const handleResponse = (name) => {
    history(from);
    swal({
      title: `Wellcome ${name}`,
      text: `You are successfully log in`,
      icon: "success",
      buttons: false,
      timer: 3000,
    });
  };

  return (
    <div className={`${isSignUp ? "fContainer sign-up-mode" : "fContainer"}`}>
      <Link to="/">
        <span className="pageCloseBtn">
          <FontAwesomeIcon icon={faTimes} />
        </span>
      </Link>
      <div className="forms-container">
        <div className="signIn-singUp">
          <SignInForm handleResponse={handleResponse} />
          <SignUpForm />
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Apply Online & Move Ahead In Life , Bringing joy to millions With
              Easy Solutions!
            </p>

            <div className="btncon">
              <button
                className="iBtn transparent"
                onClick={() => setSignUp(true)}
              >
                Sign Up
              </button>
            </div>
          </div>
          <img src={`${log}`} alt="" className="pImg" />
        </div>

        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Our decades-rich experience and expertise inspire trust and
              customer loyalty.
            </p>
            <div className="btncon">
              <button
                className="iBtn transparent"
                onClick={() => setSignUp(false)}
              >
                Sign In
              </button>
            </div>
          </div>
          <img src={`${desk}`} alt="" className="pImg" />
        </div>
      </div>
    </div>
  );
};

export default Form;
