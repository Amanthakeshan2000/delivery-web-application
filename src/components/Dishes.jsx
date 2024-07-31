import React, { useState, useEffect } from "react";
import DishesCard from "../layouts/DishesCard";
import getAccessToken from "../utils/auth";

const Dishes = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState({});

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        let token = localStorage.getItem('token');
        if (!token) {
          token = await getAccessToken();
          if (token) localStorage.setItem('token', token);
        }

        if (!token) throw new Error("Access token not available");

        const categoryResponse = await fetch(`https://checkmateapi20240716235602.azurewebsites.net/get-category?Organization=1e7071f0-dacb-4a98-f264-08dcb066d923`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!categoryResponse.ok) throw new Error(`HTTP error! Status: ${categoryResponse.status}`);

        const categoryData = await categoryResponse.json();
        setCategories(categoryData);

        // Fetch products for each category
        categoryData.forEach(async (category) => {
          const productResponse = await fetch(`https://checkmateapi20240716235602.azurewebsites.net/get-productlist?Organization=1e7071f0-dacb-4a98-f264-08dcb066d923&CategoryIndex=${category.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!productResponse.ok) throw new Error(`HTTP error! Status: ${productResponse.status}`);

          const productData = await productResponse.json();
          setProducts((prevProducts) => ({
            ...prevProducts,
            [category.id]: productData
          }));
        });
      } catch (error) {
        console.error("Error fetching categories or products:", error);
      }
    };

    fetchCategoriesAndProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 py-10 px-4 lg:px-32">
      <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-10 text-center">
        Our Dishes
      </h1>

      <div className="flex flex-col gap-16">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white p-6 rounded-lg shadow-lg mb-8 mx-auto w-full lg:w-3/4"
          >
            <h2 className="text-2xl lg:text-4xl font-bold text-gray-800 mb-6 border-b-2 border-gray-200 pb-4 text-center">
              {category.name}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products[category.id] ? (
                products[category.id].map((product) => (
                  <DishesCard
                    key={product.id}
                    img={product.image}
                    title={product.name}
                    description={product.description}
                    price={product.price}
                  />
                ))
              ) : (
                <p className="text-center text-gray-600 col-span-full">
                  Loading products...
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dishes;
