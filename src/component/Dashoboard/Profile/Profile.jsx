// eslint-disable-next-line
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import "./Profile.css";
import userimg from "../../../Assets/user2.png";
import { handleSignOut } from "../../Login/LoginManager";
import { UserContext } from "../../../App";
import swal from "sweetalert";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from "react-hot-toast";

const Profile = () => {
  const {
    user: { name, email },
    setUser,
    setAdmin,
    admin,
    setUserImage,
    userImage,
  } = useContext(UserContext);
  const [users, setusers] = useState(0);
  const [admins, setadmins] = useState(0);
  const [reviews, setreviews] = useState(0);
  const [messages, setmessages] = useState(0);
  const [ImgURL, setImgURL] = useState(null);
  const [profilePic, setprofilePic] = useState(null);
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
        console.log("user doesnot signOut");
      }
    });
  };
  useEffect(() => {
    axios.post("http://localhost/api/users.php", { isAdmin: 0 }).then((res) => {
      setusers(res.data.length);
    });
  }, [admin]);
  useEffect(() => {
    axios.post("http://localhost/api/users.php", { isAdmin: 1 }).then((res) => {
      setadmins(res.data.length);
    });
  }, [admin]);
  useEffect(() => {
    axios.get("http://localhost/api/contactUs.php").then((res) => {
      setmessages(res.data.length);
    });
  }, [admin]);
  useEffect(() => {
    axios.get("http://localhost/api/allreview.php").then((res) => {
      setreviews(res.data.length);
    });
  }, [reviews]);
  const handleImgUpload = (event) => {
    const loading = toast.loading("Image uploading...");
    const imgData = new FormData();
    imgData.set("key", "d397289afc04f776659233bc4fe00dbc");
    imgData.append("image", event.target.files[0]);
    axios
      .post("https://api.imgbb.com/1/upload", imgData)
      .then((response) => {
        toast.dismiss(loading);
        setImgURL(response.data.data.url);
        axios
          .post("http://localhost/api/userUpdate.php", {
            email: email,
            imgUrl: response.data.data.url,
          })
          .then((res) => {
            if (res.data.success == true) {
              localStorage.setItem("userImage", response.data.data.url);
              toast.success("Image successfully uploaded");
              setprofilePic(response.data.data.url);
              setUserImage(response.data.data.url);
              setImgURL(null);
            }
          });
      })
      .catch((error) => {
        toast.dismiss(loading);
        toast.error(error.message);
      });
  };
  return (
    <>
      {admin == 0 ? (
        <>
          <Toaster />
          <Col md={5} className="mx-auto">
            <div className="profile">
              <h2>Profile</h2>
              <div className="profileInfo">
                <img src={userImage || userimg} alt="---" />
                <h3>{name}</h3>
                <h5>{email}</h5>
                <Button as={"label"} htmlFor="upload" className="mainBtn mt-3">
                  <FontAwesomeIcon icon={faCloudUploadAlt} className="mr-2" />
                  Upload Image
                </Button>
                <input
                  hidden="hidden"
                  id="upload"
                  type="file"
                  name="Image"
                  onChange={handleImgUpload}
                />
                <Button className="mainBtn mt-3 mx-2" onClick={signOut}>
                  Log out
                </Button>
              </div>
            </div>
          </Col>
        </>
      ) : (
        <Row>
          <Toaster />
          <Col md={5} className="mx-auto">
            <div className="profile">
              <h2>Profile</h2>
              <div className="profileInfo">
                <img src={userImage || userimg} alt="---" />
                <h3>{name}</h3>
                <h5>{email}</h5>
                <Button as={"label"} htmlFor="upload" className="mainBtn mt-3">
                  <FontAwesomeIcon icon={faCloudUploadAlt} className="mr-2" />
                  Upload Image
                </Button>
                <input
                  hidden="hidden"
                  id="upload"
                  type="file"
                  name="Image"
                  onChange={handleImgUpload}
                />
                <Button className="mainBtn mt-3 mx-2" onClick={signOut}>
                  Log out
                </Button>
              </div>
            </div>
            {admin == 1 && (
              <div className="profile">
                <h4>Total Messages which are contact with us</h4>
                <div className="profileInfo">
                  <h1>{messages}</h1>
                  <Button className="mainBtn mt-3 mx-2">See More</Button>
                </div>
              </div>
            )}
          </Col>
          {admin == 1 && (
            <Col md={6} className="mx-auto">
              <div className="profile">
                <h2>Total Users</h2>
                <div className="profileInfo">
                  <h1>{users}</h1>
                  <Button className="mainBtn mt-3 mx-2">See More</Button>
                </div>
              </div>
              <div className="profile">
                <h2>Total Admin</h2>
                <div className="profileInfo">
                  <h1>{admins}</h1>
                  <Button className="mainBtn mt-3 mx-2">See More</Button>
                </div>
              </div>
              <div className="profile">
                <h2>Total Reviews</h2>
                <div className="profileInfo">
                  <h1>{reviews}</h1>
                  <Button className="mainBtn mt-3 mx-2">See More</Button>
                </div>
              </div>
            </Col>
          )}
        </Row>
      )}
    </>
  );
};

export default Profile;
