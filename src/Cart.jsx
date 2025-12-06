import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Cart.css";
import { removeFromCart, increaseQty, decreaseQty, placeOrder } from "./Store";
import CuponApply from "./CuponApply";
import SendOrderEmail from "./SendOrderEmail";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Cart() {

  // ============================================================
  // 1. Redux State & Dispatch
  // ============================================================
  const cartItems = useSelector((state) => state.cart);
  const cuponState = useSelector((state) => state.cupon);
  const { loading, error, success } = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  // ============================================================
  // 2. Local State
  // ============================================================
  const [discountPercent, setDiscountPercent] = useState(0);
  const [customerEmail, setCustomerEmail] = useState("");
  const [showQR, setShowQR] = useState(false);
  const navigate = useNavigate();

  // ============================================================
  // 3. Cart Calculations
  // ============================================================
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountAmount = (totalAmount * discountPercent) / 100;
  const priceAfterDiscount = totalAmount - discountAmount - cuponState.discount;
  const gst = (priceAfterDiscount * 18) / 100;
  const netAmount = priceAfterDiscount + gst;

  // ============================================================
  // 4. UPI Payment Link
  // ============================================================
  const upiCode = "7995661491-3@ybl";
  const payerName = "Mahesh Food Store";
  const upilink = `upi://pay?pa=${upiCode}&pn=${encodeURIComponent(payerName)}&am=${netAmount}&cu=INR`;

  // ============================================================
  // 5. Event Handlers
  // ============================================================
  const handleCheckOut = () => {
    const orderData = {
      items: cartItems,
      totalAmount: totalAmount,
      netAmount: netAmount,
      tax: gst,
      customerEmail: customerEmail,
    };

    dispatch(placeOrder(orderData))
      .unwrap()
      .then((res) => {
        Swal.fire({
          title: "Success!",
          text: res.message || "Order placed successfully!",
          icon: "success",
          confirmButtonText: "Go to Orders",
          confirmButtonColor: "#3885d6"
        }).then(() => {
          navigate("/orders");
        });
      })
      .catch(() => {
        Swal.fire({
          title: "Error!",
          text: "Order failed, please try again!",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  // ============================================================
  // 6. JSX Rendering
  // ============================================================
  return (
    <div className="cart-main">

      {/* ========================================================= */}
      {/* 6a. Cart Items Section */}
      {/* ========================================================= */}
      <div className="cart-left">
        <h2>🛒 Your Cart</h2>

        {cartItems.length === 0 ? (
          <h3>No items in the cart</h3>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-image" />

                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>

                  <div className="quantity-box">
                    <button className="qty-btn" onClick={() => dispatch(decreaseQty(item))}>-</button>
                    <span className="qty-value">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => dispatch(increaseQty(item))}>+</button>
                  </div>

                  <button className="remove-btn" onClick={() => dispatch(removeFromCart(item))}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* 6b. Price Summary Section */}
      {/* ========================================================= */}
      {cartItems.length > 0 && (
        <div className="cart-right">
          <h2>💰 Price Summary</h2>

          <div className="summary-box">
            <p className="line">Total: ₹{totalAmount}</p>

            <CuponApply />
            <p style={{ color: cuponState.applied ? "green" : "red" }}>{cuponState.message}</p>

            <h3>Select Discount</h3>
            <div className="discount-buttons">
              <button onClick={() => setDiscountPercent(10)}>10%</button>
              <button onClick={() => setDiscountPercent(20)}>20%</button>
              <button onClick={() => setDiscountPercent(30)}>30%</button>
            </div>

            <p className="line">Discount ({discountPercent}%): ₹{discountAmount.toFixed(2)}</p>
            <p className="line">After Discount: ₹{priceAfterDiscount.toFixed(2)}</p>
            <p className="line">GST (18%): ₹{gst.toFixed(2)}</p>

            <h2 className="net-amount">Net Payable: ₹{netAmount.toFixed(2)}</h2>

            {/* Customer Email Section */}
            <div className="email-section">
              <h4>Enter your email to receive the order details:</h4>
              <input
                type="email"
                placeholder="Enter your email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
            </div>

            {/* Send Order Email Component */}
            <SendOrderEmail
              cartItems={cartItems}
              netAmount={netAmount}
              tax={gst}
              totalAmount={totalAmount}
              customerEmail={customerEmail}
            />

            {/* Checkout & Payment Buttons */}
            <button onClick={handleCheckOut}>Checkout Now</button>
            <button onClick={() => setShowQR(true)}>Scanner (Pay Now)</button>

            {/* QR Code Section */}
            {showQR && (
              <div>
                <h3>Scan to Pay via UPI</h3>
                <h2>Total Amount: {netAmount}</h2>
                <QRCodeCanvas value={upilink} size={200} />
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
