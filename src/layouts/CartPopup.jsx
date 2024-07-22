import React from "react";

const CartPopup = ({ cartItems, setCartItems, onClose }) => {
  const handleQuantityChange = (index, change) => {
    const updatedCartItems = [...cartItems];
    const newQuantity = updatedCartItems[index].quantity + change;
    if (newQuantity > 0) {
      updatedCartItems[index].quantity = newQuantity;
      setCartItems(updatedCartItems);
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mx-4 sm:mx-2 relative animate-slide-up mt-4 overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-700 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-300"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center">Cart</h2>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between mb-4">
              <img className="w-20 h-20 object-cover rounded-lg" src={item.img} alt={item.title} />
              <div className="flex flex-col flex-1 mx-4">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm">{item.description}</p>
                <p className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleQuantityChange(index, -1)}
                  className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors duration-300"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(index, 1)}
                  className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors duration-300"
                >
                  +
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">Your cart is empty.</p>
        )}
        <div className="flex justify-between items-center mt-6">
          <h3 className="text-lg font-semibold">Total: ${totalPrice}</h3>
          <button
            onClick={onClose}
            className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPopup;
