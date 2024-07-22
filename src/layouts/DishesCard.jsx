import React, { useState, useEffect } from "react";
import Button from "../layouts/Button";
import "../css/animate-slide-up.css";
import "../css/custom-styles.css";

const Popup = ({ dish, quantity, setQuantity, onClose, onAddToCart }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleRadioChange = (value) => {
    setSelectedOption(value);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-2 relative animate-slide-up mt-4 overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-[#FF0000] hover:bg-red-700 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-300"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center">{dish.title}</h2>
        <img
          className="w-full h-48 object-cover rounded-lg mb-4"
          src={dish.img}
          alt={dish.title}
        />
        <p className="mb-4 text-center">{dish.description}</p>
        <div className="mb-4">
        <div className="flex flex-col space-y-3 mb-4 custom-radio">
  <label className="flex items-center">
    <input
      type="radio"
      name="selection"
      value="01"
      checked={selectedOption === "01"}
      onChange={() => handleRadioChange("01")}
    />
    <div className="radio-content">
      <div className="radio-text">
        <span className="text-sm">Subscribe</span>
        <span className="additional-info a">Subscribe and Save</span>
      </div>
      <div className="flex items-center space-x-3">
        <span className="discount-banner-radio b">SAVE 21%</span>
        <span className="discount-price-radio b">$37.9</span>
      </div>
    </div>
  </label>
  {/* Repeat for other radio options */}
</div>

          <div className="flex justify-center items-center space-x-4 mb-4">
            <button
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              className="bg-[#00CC05] text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#000000] transition-colors duration-300"
            >
              -
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="bg-[#009604] text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#000000] transition-colors duration-300"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => onAddToCart(dish, quantity)}
            className="bg-[#007103] text-white px-8 py-2 rounded-full hover:bg-[#003101] transition-colors duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const DishesCard = (props) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (isPopupVisible) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isPopupVisible]);

  const handleAddClick = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const handleAddToCart = (dish, quantity) => {
    console.log(`Added ${quantity} of ${dish.title} to cart`);
    setIsPopupVisible(false);
    setSuccessMessage(` Successfully added to cart`); 
    setTimeout(() => setSuccessMessage(""), 3000); 
  };

  return (
    <>
      <div className="w-full lg:w-1/4 p-6 bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
        <img
          className="w-full h-48 object-cover rounded-t-lg transition-transform duration-200 hover:scale-110"
          src={props.img}
          alt="Dish Image"
        />
        <div className="p-4 space-y-4">
          <h3 className="font-semibold text-xl text-center text-gray-800">{props.title}</h3>
          <div className="flex justify-center space-x-1">
            <p>Seeni sambol, coconut sambol, katta sambol and curry leaf sambol with a basket of papadums</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4">
            <h3 className="font-semibold text-lg text-gray-700">{props.price}</h3>
            <Button
              title="Add"
              className="bg-green-500 text-white hover:bg-green-800 transition-colors duration-300"
              onClick={handleAddClick}
            />
          </div>
        </div>
      </div>
      {isPopupVisible && (
        <Popup
          dish={{
            title: props.title,
            img: props.img,
            description: "Seeni sambol, coconut sambol, katta sambol and curry leaf sambol with a basket of papadums",
            price: props.price,
          }}
          quantity={quantity}
          setQuantity={setQuantity}
          onClose={handleClosePopup}
          onAddToCart={handleAddToCart}
        />
      )}
      {successMessage && (
        <div className="success-message-container">
          <div className="success-message">
            <span>&#10004;</span> {/* Check mark */}
            {successMessage}
          </div>
        </div>
      )}
    </>
  );
};

export default DishesCard;
