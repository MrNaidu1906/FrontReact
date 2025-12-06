import React, { useEffect, useState } from "react";
import "./menu.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchVegProducts } from "./Store";
import { toast } from "react-toastify";

function Veg() {
  /* ---------------------------------------------------------
      FETCH VEG ITEMS FROM REDUX
     --------------------------------------------------------- */
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVegProducts());
  }, [dispatch]);

  const { vegItems, loading, error } = useSelector((state) => state.veg);

  /* ---------------------------------------------------------
      PAGINATION LOGIC
     --------------------------------------------------------- */
  const itemsPerPage = 4;
  const totalPages = Math.ceil(vegItems.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = vegItems.slice(startIndex, startIndex + itemsPerPage);

  /* ---------------------------------------------------------
      HANDLE ADD TO CART
     --------------------------------------------------------- */
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));

    toast.success("Product Added Successfully!", {
      position: "top-right",
      autoClose: 500,
      closeButton: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true
    });
  };

  /* ---------------------------------------------------------
      RENDER UI
     --------------------------------------------------------- */
  return (
    <>
      {/* ---------------------------------------------------------
          TITLE
        --------------------------------------------------------- */}
      <h1 className="title">Veg Items</h1>

      {/* ---------------------------------------------------------
          ITEM CARDS SECTION
        --------------------------------------------------------- */}
      <div className="veg-container">
        {currentItems.map((item) => (
          <div className="card" key={item.id}>

            {/* IMAGE */}
            <div className="card-img-wrapper">
              <img src={item.image} alt={item.name} className="card-img" />
            </div>

            {/* TEXT CONTENT */}
            <div className="card-body">
              <h3>{item.name}</h3>
              <p className="price">₹{item.price}</p>
              <p className="desc">{item.description}</p>
            </div>

            {/* ADD TO CART BUTTON */}
            <button className="add-btn" onClick={() => handleAddToCart(item)}>
              Add to Cart
            </button>

          </div>
        ))}
      </div>

      {/* ---------------------------------------------------------
          PAGINATION BUTTONS
        --------------------------------------------------------- */}
      <div className="pagination">

        {/* Previous Btn */}
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}

        {/* Next Btn */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>

      </div>
    </>
  );
}

export default Veg;
