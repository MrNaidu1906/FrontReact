import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllOrders } from "./Store";
import "./menu.css";

function Orders() {

  const dispatch = useDispatch();

 

  // fetch orders on page load
  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);



 // get data from Redux
  const { orders, loading, error } = useSelector((state) => state.ordersList);



  return (
    <div className="orders-container">
      <h1 className="orders-title">Orders</h1>

      {/* LOADING */}
      {loading && <p className="loading">Loading orders...</p>}

      {/* ERROR */}
      {error && <p className="error">Error: {error}</p>}

      {/* ORDERS LIST */}
      <div className="orders-list">
        {orders.map((order) => (
          <div className="order-card" key={order._id}>
            <h3>Order ID : {order._id}</h3>

            {/* Removed order.name, order.price, order.description because not in schema */}

            <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>

            <div className="order-items">
              <h4>Items:</h4>

              {order.items.map((item, idx) => (
                <div key={idx} className="order-item">
                  <p><strong>Name:</strong> {item.name}</p>
                  <p><strong>Price:</strong> ₹{item.price}</p>
                  <p><strong>Description:</strong> {item.description}</p>
                  <p><strong>Qty:</strong> {item.qty}</p>
                </div>
              ))}
            </div>

            <p className="order-date">
              Ordered On: {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
