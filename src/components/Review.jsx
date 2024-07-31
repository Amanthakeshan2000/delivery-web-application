import React from "react";
import ReviewCard from "../layouts/ReviewCard";
import img from "../assets/img/pic.jpg";

const Review = () => {
  return (
    // <div className=" min-h-screen flex flex-col items-center justify-center md:px-32 px-5">
    //   <h1 className=" text-4xl font-semibold text-center lg:pt-16 pt-24 pb-10">
    //     Customer's Review
    //   </h1>
    //   <div className="row flex flex-col md:flex-row gap-5 mt-5">
    //     <ReviewCard img={img} name="Amantha Keshan" />
    //     <ReviewCard img={img} name="Amantha Keshan" />
    //     <ReviewCard img={img} name="Amantha Keshan" />
    //   </div>
    //   <div className="row flex flex-col md:flex-row gap-5 mt-5">
    //     <ReviewCard img={img} name="Amantha Keshan" />
    //     <ReviewCard img={img} name="Amantha Keshan" />
    //     <ReviewCard img={img} name="Amantha Keshan" />
    //   </div>
    // </div>

    <div className=" min-h-screen flex flex-col items-center justify-center md:px-32 px-5">
    <h1 className=" text-4xl font-semibold text-center lg:pt-16 pt-24 pb-10">
      Customer's Review
    </h1>
    <div className="row flex flex-col md:flex-row gap-5 mt-5">
      <ReviewCard img={img} name="Amantha Keshan" />
      <ReviewCard img={img} name="Amantha Keshan" />
      <ReviewCard img={img} name="Amantha Keshan" />
    </div>
    <div className="row flex flex-col md:flex-row gap-5 mt-5">
      <ReviewCard img={img} name="Amantha Keshan" />
      <ReviewCard img={img} name="Amantha Keshan" />
      <ReviewCard img={img} name="Amantha Keshan" />
    </div>
  </div>
  );
};

export default Review;
