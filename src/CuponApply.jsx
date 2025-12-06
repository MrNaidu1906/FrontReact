import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { applyCupon } from "./Store"; // 🔹 Correct import

function CuponApply() {

  // =========================================================
  // 1. Local State
  // =========================================================
  const [input, setInput] = useState("");

  // =========================================================
  // 2. Redux Dispatch
  // =========================================================
  const dispatch = useDispatch();

  // =========================================================
  // 3. Event Handlers
  // =========================================================
  const handleApply = () => {
    dispatch(applyCupon(input)); // 🔹 Correct action dispatch
  };

  // =========================================================
  // 4. JSX / UI
  // =========================================================
  return (
    <div>
      <input
        type="text"
        placeholder="Enter coupon code"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={handleApply}>Apply Coupon</button>
    </div>
  );
}

export default CuponApply;
