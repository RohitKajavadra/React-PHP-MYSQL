import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGoogle,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import toast, { Toaster } from "react-hot-toast";

const SocialMedia = () => {
  const handleSignIn = () => {
    const loading = toast.loading("Please wait...");
    setTimeout(() => {
      toast.dismiss(loading);
    }, 1000);
  };
  return (
    <div className="social-media">
      <Toaster />
      <div onClick={() => handleSignIn()} className="social-icon">
        <FontAwesomeIcon icon={faGoogle} />
      </div>
      <div onClick={() => handleSignIn()} className="social-icon">
        <FontAwesomeIcon icon={faFacebook} />
      </div>
      <div onClick={() => handleSignIn()} className="social-icon">
        <FontAwesomeIcon icon={faInstagram} />
      </div>
    </div>
  );
};

export default SocialMedia;
