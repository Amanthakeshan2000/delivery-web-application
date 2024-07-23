import React, { useEffect } from "react";

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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-light-blue-100 border border-light-blue-300 p-6 rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-2 relative animate-slide-up mt-4 overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-semibold mb-4 text-center">Cart</h2>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between mb-4 border border-light-blue-300 p-2 rounded-lg">
              <img className="w-16 h-16 object-cover rounded-lg" src={item.img} alt={item.title} />
              <div className="flex flex-col flex-1 mx-4">
                <h3 className="text-xs font-semibold">{item.title}</h3>
                <p className="text-xs font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={(event) => { handleQuantityChange(index, -1); handleButtonClick(event); }}
                  className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors duration-300"
                >
                  -
                </button>
                <span className="text-xs">{item.quantity}</span>
                <button
                  onClick={(event) => { handleQuantityChange(index, 1); handleButtonClick(event); }}
                  className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors duration-300"
                >
                  +
                </button>
                <button
                  onClick={(event) => { handleRemoveItem(index); handleButtonClick(event); }}
                  className="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors duration-300"
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
        </div>
        <button
          onClick={onClose}
          className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors duration-300 mt-4 w-full"
        >
          Select Your Dining Preference
        </button>
      </div>
    </div>
  );
};

export default CartPopup;
