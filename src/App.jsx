import React, { useState, useEffect, createContext, useContext } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Dishes from "./components/Dishes";
import Reviews from "./components/Review";
import Footer from "./components/Footer";
import getAccessToken from "./utils/auth";

// Create a Context for authentication
const AuthContext = createContext();

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const accessToken = await getAccessToken();
        if (accessToken) {
          localStorage.setItem('token', accessToken);
          setToken(accessToken);
        } else {
          console.error('Access token not found');
        }
      } catch (error) {
        console.error('Error fetching access token:', error.message || error);
      }
    };

    if (!token) {
      fetchToken();
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token }}>
      <div>
        <Navbar />
        <main>
          <div id="home">
            <Home />
          </div>
          <div id="about">
            <About />
          </div>
          <div id="dishes">
            <Dishes />
          </div>
          <div id="review">
            <Reviews />
          </div>
        </main>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default App;
