import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Table, Button } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import swal from "sweetalert";
import TableLoader from "../../Shared/TableOrder/TableOrder";
import AddService from "../AddService/AddService";
const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    try {
      axios.get("http://localhost/api/service.php").then((res) => {
        if (res.data) {
          setServices(res.data);
          setIsUpdated(false);
        }
      });
    } catch (error) {
      console.log("error get services from admin panel", error);
    }
  }, [isUpdated, edit]);

  const checkPermission = (id, action) => {
    if (action === "edit") {
      setEdit(id);
    } else {
      handleDelete(id);
    }
  };

  const handleDelete = (id) => {
    setIsUpdated(false);
    swal({
      title: "Are you sure?",
      text: "Are you sure! you want to delete this service?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((wantDelete) => {
      if (wantDelete) {
        axios
          .post(`http://localhost/api/serviceDelete.php`, {
            id: id,
          })
          .then((res) => {
            if (res.data.success == 1) {
              setIsUpdated(true);
              toast.success("Service has been deleted successfully!");
            } else {
              toast.error("Something went wrong, please try again");
            }
          })
          .catch((err) => {
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
    <>
      <Toaster />
      {edit ? (
        <AddService edit={edit} setEdit={setEdit} services={services} />
      ) : services.length === 0 ? (
        <TableLoader />
      ) : (
        <div className="orderList">
          <Table hover width="100%">
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {services?.map(({ id, service_name, price, description }) => {
                let des = description;
                // let shortDes = des.split(' ').slice(0,5).join(' ')
                return (
                  <tr key={id}>
                    <td>{service_name}</td>
                    <td>{des ? des : "Nothing"}</td>
                    <td>&#8377; {price}</td>
                    <td>
                      <Button
                        variant="outline-success"
                        onClick={() => checkPermission(id, "edit")}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                        Edit
                      </Button>
                      <Button
                        className="ml-2"
                        variant="outline-danger"
                        onClick={() => checkPermission(id, "delete")}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
};

export default ManageServices;
