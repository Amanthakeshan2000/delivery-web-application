import React from "react";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import Button from "../layouts/Button";

const DishesCard = (props) => {
  return (
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
          <Button title="Add" className="bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300" />
        </div>
      </div>
    </div>
  );
};

export default DishesCard;
