import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Button } from "react-bootstrap";
import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import swal from "sweetalert";
import { UserContext } from "../../../../App";
import "./BookList.css";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const BookList = () => {
  const { user } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  useEffect(() => {
    axios
      .post("http://localhost/api/getOrder.php", { email: user.email })
      .then((res) => {
        if (res.data) {
          setBookings(res.data);
        } else {
          console.log("order not fetch");
        }
      });
  }, [user.email, isUpdated]);

  const handleDelete = (id, status) => {
    setIsUpdated(false);
    swal({
      title: `${status === "Done" ? "Remove" : "Cancel"} Booking?`,
      text: `Are you sure! you want to ${
        status === "Done" ? "remove booking from your booking List" : "cancel"
      }?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((wantDelete) => {
      if (wantDelete) {
        const loading = toast.loading("deleting...Please wait!");
        axios
          .post("http://localhost/api/orderDelete.php", { id: id })
          .then((res) => {
            toast.dismiss(loading);
            if (res.data.success == 1) {
              setIsUpdated(true);
              toast.success("Your Booking is successfully canceled!");
            } else {
              toast.error("Something went wrong, please try again");
            }
          })
          .catch((err) => {
            toast.dismiss(loading);
            swal({
              title: "Failed!",
              text: "Something went wrong, please try again",
              icon: "error",
            });
          });
      }
    });
  };
  return (
    <div>
      <Toaster />
      {bookings.length === 0 && (
        <div className="row px-3">
          <h1 className="text-center">No service purchased by you</h1>
        </div>
      )}
      <div className="row px-3">
        {bookings.map(({ orderId, sname, status, description, imgUrl }) => {
          return (
            <div className="col-md-4" key={orderId}>
              <div className="bookingList">
                <div className="d-flex justify-content-between">
                  <img src={imgUrl} alt="" />
                  <div>
                    <p
                      className="serviceState"
                      style={{
                        color: "#fff",
                        background:
                          status === "Pending"
                            ? "rgb(255 78 96)"
                            : status === "On going"
                            ? "rgb(73 146 255)"
                            : "rgb(31 204 123)",
                      }}
                    >
                      {status}
                    </p>
                  </div>
                </div>
                <h6>{sname}</h6>
                <p>{description}</p>
                <Button
                  variant="outline-danger"
                  onClick={() => handleDelete(orderId, status)}
                >
                  <FontAwesomeIcon icon={faTimesCircle} />
                  {status === "Done" ? "Remove" : "Cancel"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookList;
