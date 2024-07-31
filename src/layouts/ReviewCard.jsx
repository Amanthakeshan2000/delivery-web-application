// import React from "react";

// const ReviewCard = (props) => {
//   return (
//     <div className=" w-full md:w-1/3 bg-white border-2 border-lightText md:border-none p-5 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
//       <div>
//         <p className=" text-lightText justify-center items-center text-center">
//         A hidden gem! Amazing Sri Lankan food. Had a pleasant experience here, 
//         staff were really friendly and were always happy to help. Fell in love with the sumbol and set lunch. 
//         I'd definitely come back here!! - Manisha
//         </p>
//       </div>

//       <div className=" flex flex-row justify-center items-center mt-4 gap-4">
//         <img className=" rounded-full w-1/4" src={props.img} alt="img" />
//         <h3 className=" font-semibold ">{props.name}</h3>
//       </div>
//     </div>
//   );
// };

// export default ReviewCard;
import React, { useEffect } from "react";

const ReviewCard = (props) => {
  useEffect(() => {
    // Load the Elfsight script
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.dataset.useServiceCore = "true";
    script.defer = true;
    document.body.appendChild(script);

    // Clean up the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full md:w-1/3 bg-white border-2 border-lightText md:border-none p-5 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
      <div>
        {/* <p className="text-lightText justify-center items-center text-center">
          A hidden gem! Amazing Sri Lankan food. Had a pleasant experience here,
          staff were really friendly and were always happy to help. Fell in love with the sumbol and set lunch.
          I'd definitely come back here!! - Manisha
        </p> */}
      </div>

      <div className="flex flex-row justify-center items-center mt-4 gap-4">
        {/* <img className="rounded-full w-1/4" src={props.img} alt="img" />
        <h3 className="font-semibold">{props.name}</h3> */}
      </div>

      {/* Add Elfsight widget */}
      <div className="elfsight-app-f9afce1b-988b-4561-99da-e52672c8791c" data-elfsight-app-lazy></div>
    </div>
  );
};

export default ReviewCard;
