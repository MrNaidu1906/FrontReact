import React, { useState } from "react";
import "./menu.css";
import { useDispatch } from "react-redux";
import { addToCart } from "./Store";
import { toast } from "react-toastify";

function NonVeg() {

  /* ---------------------------------------------------------
     NON-VEG ITEMS LIST (STATIC DATA)
     --------------------------------------------------------- */
  const nonVegItems = [
    { id: 1, name: "Chicken Biryani", price: 180, image: "/NonvegImages/ChickenBiryani.jpg", description: "Aromatic basmati rice cooked with tender chicken pieces and traditional spices." },
    { id: 2, name: "Mutton Curry", price: 220, image: "/NonvegImages/Mutton.jpg", description: "Slow-cooked mutton in a rich, spicy curry, perfect with rice or roti." },
    { id: 3, name: "Chicken Fried Rice", price: 150, image: "/NonvegImages/Chickenfried.jpg", description: "Wok-fried rice with chicken, vegetables, and a touch of soy sauce." },
    { id: 4, name: "Fish Curry", price: 200, image: "/NonvegImages/FishCurry.jpg", description: "Delicious fish cooked in a tangy and spicy South Indian style gravy." },
    { id: 5, name: "Egg Curry", price: 130, image: "/NonvegImages/Eggcurry.jpg", description: "Boiled eggs simmered in a flavorful onion-tomato gravy with spices." },
    { id: 6, name: "Chicken 65", price: 160, image: "/NonvegImages/Chicken65.jpg", description: "Crispy fried chicken cubes tossed with spicy seasoning and curry leaves." },
    { id: 7, name: "Mutton Biryani", price: 240, image: "/NonvegImages/MuttonBiryani.jpg", description: "Layers of basmati rice and tender mutton cooked with saffron and aromatic spices." },
    { id: 8, name: "Prawn Masala", price: 210, image: "/NonvegImages/prwanmasala.jpg", description: "Succulent prawns cooked in a spicy tomato-based masala." },
    { id: 9, name: "Chicken Korma", price: 180, image: "/NonvegImages/Chickenkorma.jpg", description: "Tender chicken cooked in a rich creamy sauce with subtle spices." },
    { id: 10, name: "Fish Fry", price: 190, image: "/NonvegImages/Fishfry.jpg", description: "Marinated fish fillets fried until golden brown and crispy." },
    { id: 11, name: "Chicken Curry", price: 170, image: "/NonvegImages/ChickenCurry.jpg", description: "Classic chicken curry cooked with aromatic spices and fresh herbs." },
    { id: 12, name: "Egg Biryani", price: 140, image: "/NonvegImages/Eggbiryani.jpg", description: "Basmati rice layered with boiled eggs and flavorful spices." }
  ];

  /* ---------------------------------------------------------
     PAGINATION LOGIC
     --------------------------------------------------------- */
  const itemsPerPage = 4;                        // items per page
  const totalPages = Math.ceil(nonVegItems.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = nonVegItems.slice(startIndex, startIndex + itemsPerPage);

  /* ---------------------------------------------------------
     REDUX DISPATCH
     --------------------------------------------------------- */
  const dispatch = useDispatch();

  /* ---------------------------------------------------------
     HANDLE ADD TO CART
     (dispatch + toast notification)
     --------------------------------------------------------- */
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));

    toast.success("Product Added Successfully!", {
      position: "top-right",
      autoClose: 500,
      closeButton: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <>
      {/* ---------------------------------------------------------
          TITLE
          --------------------------------------------------------- */}
      <h1 className="title">NonVeg Items</h1>

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

export default NonVeg;
