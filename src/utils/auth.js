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
