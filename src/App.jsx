// src/App.jsx
import React, { useState, useEffect, createContext, useContext } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import Dishes from "./components/Dishes";
import Reviews from "./components/Review";
import axios from 'axios';

// Create a Context for the authentication
const AuthContext = createContext();

const App = () => {
  const [token, setToken] = useState(sessionStorage.getItem('token') || '');

  useEffect(() => {
    const fetchToken = async () => {
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
      const USERNAME = process.env.REACT_APP_USERNAME;
      const PASSWORD = process.env.REACT_APP_PASSWORD;

      try {
        const response = await axios.post(`${API_BASE_URL}/api/User/login`, {
          userName: USERNAME,
          password: PASSWORD
        });

        if (response.data && response.data.accessToken) {
          sessionStorage.setItem('token', response.data.accessToken);
          setToken(response.data.accessToken);
        } else {
          console.error('Access token not found in response:', response.data);
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
          <br/><br/>
        </main>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default App;
