// // src/utils/auth.js
import axios from 'axios';

const getAccessToken = async () => {
  const API_BASE_URL = "https://checkmateapi20240716235602.azurewebsites.net";
  const USERNAME = "serendib@gmail.com";
  const PASSWORD = "Anubaba@123";
  const ORGANIZATION = "1e7071f0-dacb-4a98-f264-08dcb066d923";

  try {
    const response = await axios.post(`${API_BASE_URL}/api/User/login`, {
      userName: USERNAME,
      password: PASSWORD
    });
    console.log(response.data.accessToken);
    if (response.data && response.data.accessToken) {
      return response.data.accessToken;
      
    } else {
      console.error('Access token not found in response:', response.data);
      return null;
    }
  } catch (error) {
    console.error('Error fetching access token:', error.message || error);
    return null;
  }
};

export default getAccessToken;






// const getAccessToken = async () => {
//   // Use the static token for testing if needed
//   const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZjdmYjc5ZWItNTM5NC00MzcyLTlkZDMtYjZlZDE5YzIzNDM5IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVXNlciIsImV4cCI6MTcyMjM1MDc0MSwiaXNzIjoiQ2hlY2tNYXRlSXNzdWVyIiwiYXVkIjoiQ2hlY2tNYXRlTWFuYWdlciJ9.XwN2h6sLH27ZAqzkpOdBay4JGwxK9VPTUCntG_98S5U";
//   return token;
// };

// export default getAccessToken;
