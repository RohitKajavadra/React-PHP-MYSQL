import React, { useContext } from "react";
import { useState } from "react";
import { useRef } from "react";
import { Button, Overlay } from "react-bootstrap";
import Popover from "react-bootstrap/Popover";
import "./PopOver.css";
import toast from "react-hot-toast";
import { UserContext } from "../../../App";
import { handleSignOut } from "../../Login/LoginManager";
import image1 from "../../../Assets/user2.png";
import swal from "sweetalert";

const PopOver = () => {
  const {
    user: { name, email },
    setUser,
    setAdmin,
    userImage,
  } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };
  const signOut = () => {
    swal({
      title: "Are you sure?",
      text: `You want to log out`,
      dangerMode: true,
      buttons: true,
      icon: "warning",
    }).then((ok) => {
      if (ok) {
        setUser(handleSignOut());
        setAdmin(0);
      } else {
        setShow(false);
      }
    });
  };
  return (
    <div ref={ref}>
      <img
        src={userImage || image1}
        alt=""
        //  onClick={handleClick}
        className="popImg"
      />
      {/* <Overlay
        show={show}
        target={target}
        placement="bottom"
        container={ref}
        containerPadding={50}
      >
        <Popover id="popover-contained">
          <div className="text-center">
            <img src={userImage||image1} alt="" className="popUserImg" />
            <p className="userName">{`${name}`}</p>
            <p className="userEmail">{email}</p>
            <Button variant="outline-danger" size="sm" onClick={signOut}>
              Log out
            </Button>
          </div>
        </Popover>
      </Overlay> */}
    </div>
  );
};

export default PopOver;
