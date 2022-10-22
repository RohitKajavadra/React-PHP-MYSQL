import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import TableLoader from "../../Shared/TableOrder/TableOrder";
import Order from "./Order";
import "./OrderList.css";
const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    try {
      axios.get("http://localhost/api/order.php").then((res) => {
        setOrders(res.data);
        setIsUpdated(false);
      });
    } catch (error) {
      console.log("error get services from admin panel", error);
    }
  }, [isUpdated]);
  const handleAction = (id, status) => {
    setIsUpdated(true);
    axios
      .patch("http://localhost/api/orderUpdate.php", { status: status, id: id })
      .then((res) => {
        if (res.data.success == true) {
          setIsUpdated(false);
        }
      });
  };

  return (
    <div className="px-2">
      {orders.length === 0 ? (
        // <TableLoader/>
        <div className="row px-3">
          <h1 className="text-center">No orders yet!</h1>
        </div>
      ) : (
        <div className="orderList">
          <Table hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email ID</th>
                <th>Service</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <Order
                  key={order.orderId}
                  order={order}
                  handleAction={handleAction}
                />
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default OrderList;
