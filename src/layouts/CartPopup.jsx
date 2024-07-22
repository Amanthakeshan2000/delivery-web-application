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

  const handleButtonClick = (event) => {
    event.preventDefault();
  };

  return (
    <div className="cart-popup fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
      <div className="cart-popup-content relative bg-white border border-gray-300 rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-sm mx-4 sm:mx-2 animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-700 rounded-full w-6 h-6 flex items-center justify-center transition-colors duration-300"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-lg font-bold mb-4 text-center">Cart</h2>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={index} className="cart-item flex items-center justify-between mb-4 p-2 border border-gray-300 rounded-lg shadow-sm">
              <img className="w-16 h-16 object-cover rounded-lg" src={item.img} alt={item.title} />
              <div className="flex flex-col flex-1 mx-2">
                <h3 className="text-xs font-semibold">{item.title}</h3>
                <p className="text-xs font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={(event) => { handleQuantityChange(index, -1); handleButtonClick(event); }}
                  className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors duration-300 text-xs"
                >
                  -
                </button>
                <span className="text-xs">{item.quantity}</span>
                <button
                  onClick={(event) => { handleQuantityChange(index, 1); handleButtonClick(event); }}
                  className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors duration-300 text-xs"
                >
                  +
                </button>
                <button
                  onClick={(event) => { handleRemoveItem(index); handleButtonClick(event); }}
                  className="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors duration-300 text-xs"
                >
                  &times;
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-xs">Your cart is empty.</p>
        )}
        <div className="flex justify-between items-center mt-4 text-xs">
          <h3 className="font-semibold">Total: ${totalPrice}</h3>
          <button
            onClick={(event) => { onClose(); handleButtonClick(event); }}
            className="bg-green-500 text-white px-4 py-1 rounded-full hover:bg-green-700 transition-colors duration-300 text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPopup;
