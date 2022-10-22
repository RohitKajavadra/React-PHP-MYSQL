import React from "react";
import { Dropdown } from "react-bootstrap";
import "./Order.css";

const Order = ({ order, handleAction }) => {
  const { orderId, uname, email, sname, status } = order;
  const setBackground = {
    color: "#FFFFFF",
    background:
      status === "Pending"
        ? "rgb(255 78 96)"
        : status === "On going"
        ? "rgb(73 146 255)"
        : "rgb(31 204 123)",
  };
  return (
    <tr>
      <td>{uname}</td>
      <td>{email}</td>
      <td>{sname}</td>
      <td>
        <Dropdown className="statusBtn" id="dropdown-basic-button">
          <Dropdown.Toggle style={setBackground}>{status}</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => handleAction(orderId, "Pending")}
              id="pending"
            >
              Pending
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleAction(orderId, "On going")}
              id="ongoing"
            >
              On going
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleAction(orderId, "Done")}
              id="done"
            >
              Done
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );
};

export default Order;
