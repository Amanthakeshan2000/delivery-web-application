import { FC, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const NavBar: FC = () => {
  const [menu, setMenu] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const dropdownRef = useRef(null);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = await getValidToken();
        if (!token) throw new Error("Access token not available");

        const response = await fetch(
          `/api/get-category?Organization=1e7071f0-dacb-4a98-f264-08dcb066d923&page=${page}&limit=6`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        if (data.length < 6) setHasMore(false);
        setCategories((prev) => [...prev, ...data]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [page]);

  return <div>NavBar</div>;
};

export default NavBar;
