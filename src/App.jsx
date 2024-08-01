import React, { useState, useEffect, createContext, useContext } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Dishes from "./components/Dishes";
import Reviews from "./components/Review";
import Footer from "./components/Footer";
import { getValidToken } from "./utils/tokenUtils";

// Create a Context for authentication
const AuthContext = createContext();

const App = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      try {
        //const accessToken = await getValidToken();
        if (accessToken) {
          setToken(accessToken);
        } else {
          console.error('Access token not found');
        }
      } catch (error) {
        console.error('Error fetching access token:', error.message || error);
      }
    };

    fetchToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token }}>
      <div>
        <Navbar />
        <main>
          <section id="home">
            <Home />
          </section>
          <section id="about">
            <About />
          </section>
          <section id="dishes">
            <Dishes />
          </section>
          <section id="review">
            <Reviews />
          </section>
        </main>
        <br/> <br/>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default App;






// App.jsx
// import React, { useEffect, useState } from 'react';
// import { getValidToken } from './utils/tokenUtils';

// const App = () => {
//   const [token, setToken] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     console.log("useEffect - Fetching Token");

//     const fetchToken = async () => {
//       try {
//         const fetchedToken = await getValidToken();
//         console.log("Token fetched:", fetchedToken);
//         setToken(fetchedToken);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching token:', err);
//         setError(err);
//         setLoading(false);
//       }
//     };

//     fetchToken();

//     // Check and refresh the token every minute
//     // const intervalId = setInterval(fetchToken, 10000);

//     // Clean up the interval on component unmount
//     return () => clearInterval(intervalId);
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <div>
//       <p>Current Token: {token}</p>
//       {/* Add other components here */}
//     </div>
//   );
// };

// export default App;
