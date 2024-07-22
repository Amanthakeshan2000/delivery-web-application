import React, { useEffect } from "react";
import "../css/CartPopup.css"; // Import the CSS file for styles

const CartPopup = ({ cartItems, setCartItems, onClose }) => {
  useEffect(() => {
    // Add no-scroll class to body when the popup is open
    document.body.classList.add("no-scroll");

    // Remove no-scroll class when the popup is closed
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  const handleQuantityChange = (index, change) => {
    const updatedCartItems = [...cartItems];
    const newQuantity = updatedCartItems[index].quantity + change;
    if (newQuantity > 0) {
      updatedCartItems[index].quantity = newQuantity;
      setCartItems(updatedCartItems);
    }
  };

  const handleRemoveItem = (index) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  // Prevent default form submission behavior
  const handleButtonClick = (event) => {
    event.preventDefault();
    // Add any other logic you need here
  };

  return (
    <div className="cart-popup-overlay">
      <div className="cart-popup-content">
        <button
          onClick={onClose}
          className="cart-popup-close-button"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="cart-popup-title">Cart</h2>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={index} className="cart-popup-item">
              <img className="cart-popup-item-img" src={item.img} alt={item.title} />
              <div className="cart-popup-item-details">
                <h3 className="cart-popup-item-title">{item.title}</h3>
                {/* <p className="cart-popup-item-description">{item.description}</p> */}
                <p className="cart-popup-item-price">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <div className="cart-popup-item-controls">
                <button
                  onClick={(event) => { handleQuantityChange(index, -1); handleButtonClick(event); }}
                  className="cart-popup-item-control-button cart-popup-item-control-decrease"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={(event) => { handleQuantityChange(index, 1); handleButtonClick(event); }}
                  className="cart-popup-item-control-button cart-popup-item-control-increase"
                >
                  +
                </button>
                <button
                  onClick={(event) => { handleRemoveItem(index); handleButtonClick(event); }}
                  className="cart-popup-item-control-button cart-popup-item-control-remove"
                >
                  &times;
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="cart-popup-empty">Your cart is empty.</p>
        )}
        <div className="cart-popup-footer">
          <h3 className="cart-popup-total">Total: ${totalPrice}</h3>
          <button
            onClick={(event) => { onClose(); handleButtonClick(event); }}
            className="cart-popup-close-footer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPopup;
