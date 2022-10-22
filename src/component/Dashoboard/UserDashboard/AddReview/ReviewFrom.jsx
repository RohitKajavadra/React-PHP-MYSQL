import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Button, Col, Form, Row } from "react-bootstrap";
import { UserContext } from "../../../../App";
import swal from "sweetalert";
import userimg from "../../../../Assets/user2.png";

const ReviewForm = ({ setIsUpdated }) => {
  const { user, userImage } = useContext(UserContext);
  const { id } = useParams();
  const [value, setvalue] = useState({
    name: user.name,
    address: "",
    description: "",
  });
  const [values, setvalues] = useState({
    name: "",
    address: "",
    description: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setvalue((values) => ({ ...values, [name]: value }));
    if (id) {
      setvalues((values) => ({ ...values, [name]: value }));
    }
  };
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      onSubmit();
    }
  }, [formErrors]);
  useEffect(() => {
    axios
      .post("http://localhost/api/getReview.php", { email: id })
      .then((res) => {
        if (res.data[0]) {
          setvalues({
            name: res.data[0].name,
            address: res.data[0].address,
            description: res.data[0].description,
          });
        }
      });
  }, [id]);
  const handleSubmits = (e) => {
    e.preventDefault();
    setFormErrors(validate(id ? values : value));
    setIsSubmit(true);
  };
  const validate = (values) => {
    const isWhitespace = values.name.trim().length === 0;
    const isaddress = values.address.trim().length === 0;
    const isdescription = values.description.trim().length === 0;
    const errors = {};
    if (!values.name) {
      errors.name = "user name is required!";
      toast.error("user name is required!", { duration: 1000 });
    } else if (values.name.length < 2 || isWhitespace) {
      errors.name = "user name is not valid";
      toast.error("user name is not valid", {
        duration: 1000,
      });
    } else if (!values.address) {
      errors.email = "Address is required!";
      toast.error("Address is required!", { duration: 1000 });
    } else if (values.address.length < 2 || isaddress) {
      errors.email = "Address is not valid";
      toast.error("Address is not valid", { duration: 1000 });
    } else if (!values.description) {
      errors.email = "description is required!";
      toast.error("description is required!", { duration: 1000 });
    } else if (values.description.length < 2 || isdescription) {
      errors.email = "description is not valid";
      toast.error("description is not valid", { duration: 1000 });
    }
    return errors;
  };

  const history = useNavigate();

  const onSubmit = () => {
    const loading = toast.loading("Uploading...Please wait!");
    const reviewData = {
      ...value,
      email: user.email,
      imgUrl: userImage || userimg,
    };
    if (id) {
      const updateReview = {
        ...values,
        email: user.email,
        imgUrl: userImage || userimg,
        id: id,
      };
      axios
        .post("http://localhost/api/reviewUpdate.php", updateReview)
        .then((res) => {
          if (res.data.success == true) {
            toast.dismiss(loading);
            toast.success("your review was successful updated!");
            setvalues({
              name: "",
              address: "",
              description: "",
            });
            history("/dashboard/review");
          }
        });
    } else {
      setIsUpdated(false);
      axios.post("http://localhost/api/Review.php", reviewData).then((res) => {
        if (res) {
          if (res.data.success == 1) {
            setIsUpdated(true);
            setvalue({
              name: "",
              address: "",
              description: "",
            });
            toast.dismiss(loading);
            swal(
              "Success!",
              "Your review has been submitted successfully. We appreciate your contirbution.",
              "success"
            );
          } else {
            toast.dismiss(loading);
            swal("Failed!", "Something went wrong! please try again", "error");
          }
        }
      });
    }
  };
  return (
    <section className="px-3">
      <Toaster />
      <div className="mx-auto reviewForm">
        <Form onSubmit={handleSubmits} className="w-100">
          <Row className="justify-content-center px-4">
            <Form.Group as={Col} md={12}>
              <Form.Label style={{ fontWeight: "bold" }}>Your Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                autoComplete="off"
                onChange={handleChange}
                value={id ? values.name : value.name}
                placeholder="Your Name"
              />
            </Form.Group>
            <Form.Group as={Col} md={12}>
              <Form.Label style={{ fontWeight: "bold" }}>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                autoComplete="off"
                onChange={handleChange}
                value={id ? values.address : value.address}
                placeholder="Address"
              />
            </Form.Group>
            <Form.Group as={Col} md={12}>
              <Form.Label style={{ fontWeight: "bold" }}>
                Description
              </Form.Label>
              <Form.Control
                style={{ height: "10rem" }}
                type="text"
                as="textarea"
                name="description"
                autoComplete="off"
                onChange={handleChange}
                value={id ? values.description : value.description}
                placeholder="Description"
              />
            </Form.Group>
          </Row>
          <div className="text-center mt-1">
            <Button type="submit" className="mainBtn">
              {id ? "update" : "submit"}
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default ReviewForm;
