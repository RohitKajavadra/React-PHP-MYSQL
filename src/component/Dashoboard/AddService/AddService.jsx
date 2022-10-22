import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import swal from "sweetalert";
import "./AddService.css";

const AddService = ({ edit, setEdit, services }) => {
  const [imgURL, setImgURL] = useState(null);
  const [service, setService] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [inputs, setInputs] = useState({});
  const [value, setvalue] = useState({
    sname: "",
    description: "",
    price: 0,
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  useEffect(() => {
    const getService = services?.find(({ id }) => id === edit);
    setService(getService);
    if (edit) {
      setvalue({
        sname: getService.service_name,
        description: getService.description,
        price: getService.price,
      });
      setImgURL(getService.imgUrl);
    }
  }, [edit, services]);
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

  const onSubmit = () => {
    const serviceInfo = {
      ...inputs,
      img: imgURL,
    };
    if (edit) {
      const updateService = {
        ...value,
        img: imgURL,
        id: service.id,
      };
      axios
        .post("http://localhost/api/serviceUpdate.php", updateService)
        .then((res) => {
          if (res.data.success == false) {
            toast.error("Server Problem. Please Try Again");
          } else {
            toast.success("Service updated successfully");
          }
          setEdit(null);
          setIsSubmit(false);
        });
    } else {
      axios
        .post("http://localhost/api/service.php", serviceInfo)
        .then((res) => {
          if (res.data) {
            swal({
              title: "Success!",
              text: "One new service added successfully",
              icon: "success",
              buttons: false,
              timer: 2000,
            });
          }
          setvalue({
            sname: "",
            description: "",
            price: 0,
          });
          setIsSubmit(false);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };
  const validate = (values) => {
    const isWhitespace = values.sname.trim().length === 0;
    const isdescription = values.description.trim().length === 0;
    const errors = {};
    if (!values.sname) {
      errors.name = "Service name is required!";
      toast.error("Service name is required!", { duration: 1000 });
    } else if (values.sname.length < 2 || isWhitespace) {
      errors.name = "Service name is not valid";
      toast.error("Service name is not valid", {
        duration: 1000,
      });
    } else if (!values.price) {
      errors.email = "Service price is required!";
      toast.error("Service price is required!", { duration: 1000 });
    } else if (isNaN(values.price)) {
      errors.email = "Service price is not valid";
      toast.error("Service price is not valid", { duration: 1000 });
    } else if (values.price <= 0) {
      errors.email = "Service price is not valid";
      toast.error("Service price is not valid", { duration: 1000 });
    } else if (!values.description) {
      errors.password = "description is required";
      toast.error("description is required", { duration: 1000 });
    } else if (isdescription) {
      errors.password = "description is not valid";
      toast.error("description is not valid", { duration: 1000 });
    } else if (imgURL == null) {
      errors.image = "Service image  is required";
      toast.error("Service image is required", { duration: 1000 });
    }
    return errors;
  };
  const handleImgUpload = (event) => {
    const loading = toast.loading("Image uploading...");
    setIsDisabled(true);
    const imgData = new FormData();
    imgData.set("key", "d397289afc04f776659233bc4fe00dbc");
    imgData.append("image", event.target.files[0]);
    axios
      .post("https://api.imgbb.com/1/upload", imgData)
      .then((response) => {
        toast.dismiss(loading);
        toast.success("Image successfully uploaded");
        setImgURL(response.data.data.url);
        setIsDisabled(false);
      })
      .catch((error) => {
        toast.dismiss(loading);
        toast.error(error.message);
      });
  };
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    setvalue((values) => ({ ...values, [name]: value }));
  };
  return (
    <div className="px-2">
      <Toaster />
      <Form onSubmit={handleSubmits} className="addServiceForm">
        <Row className="justify-content-center px-4">
          <Form.Group as={Col} md={7}>
            <Form.Label style={{ fontWeight: "bold" }}>Service Name</Form.Label>
            <Form.Control
              type="text"
              value={value.sname}
              name="sname"
              onChange={handleChange}
              placeholder="Service Name"
              autoComplete="off"
            />
          </Form.Group>
          <Form.Group as={Col} md={5}>
            <Form.Label style={{ fontWeight: "bold" }}>Price</Form.Label>
            <Form.Control
              type="text"
              value={value.price}
              name="price"
              onChange={handleChange}
              placeholder="Price"
              autoComplete="off"
              maxLength={5}
            />
          </Form.Group>
          <Form.Group as={Col} md={7}>
            <Form.Label style={{ fontWeight: "bold" }}>Description</Form.Label>
            <Form.Control
              style={{ height: "10rem" }}
              type="text"
              value={value.description}
              as="textarea"
              name="description"
              onChange={handleChange}
              placeholder="Description"
              autoComplete="off"
            />
          </Form.Group>
          <Col md={5}>
            <Form.Label style={{ fontWeight: "bold", display: "block" }}>
              {edit ? "Change Image" : "Add Image"}
            </Form.Label>
            <Button
              as={"label"}
              htmlFor="upload"
              className="d-block p-2 uploadBtn"
            >
              <FontAwesomeIcon icon={faCloudUploadAlt} className="mr-2" />
              Upload Image
            </Button>
            <Form.Control
              hidden="hidden"
              id="upload"
              type="file"
              name="Image"
              onChange={handleImgUpload}
            />
          </Col>
        </Row>
        <div className="text-center mt-3">
          <Button type="submit" className="mainBtn" disabled={isDisabled}>
            {edit ? "Update" : "Submit"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddService;
