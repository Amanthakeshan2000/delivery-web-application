import { useState, useEffect, useContext } from "react";
import DishesCard from "../layouts/DishesCard";
import { ORGANIZATION } from "../api/config";
import { AuthContext } from "../contexts/AuthContext";
import { axiosInstance } from "../api/config";
import { createGetCategoryUrl, getProductUrl } from "../api/authController";

interface Category {
  id: string;
  name: string;
  createUtc: string;
  organizationId: string;
  // products: any[];
  status: number;
  userId: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface ProductsMap {
  [categoryId: string]: Product[];
}

const Dishes = () => {
  const authContext = useContext(AuthContext);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<ProductsMap>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = authContext!;

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        const categoryResponse = await axiosInstance.get<Category[]>(
          createGetCategoryUrl(ORGANIZATION),
          {
            headers: {
              Authorization: `Bearer ${user?.accessToken}`,
            },
          }
        );

        setCategories(categoryResponse.data);

        const productPromises = categoryResponse.data.map(
          async (category: Category) => {
            try {
              const productResponse = await axiosInstance.get<Product[]>(
                getProductUrl(ORGANIZATION, category.id),
                {
                  headers: {
                    Authorization: `Bearer ${user?.accessToken}`,
                  },
                }
              );

              return {
                categoryId: category.id,
                products: productResponse.data,
              };
            } catch (error) {
              console.error(
                `Error fetching products for category ${category.id}:`,
                error
              );
              return { categoryId: category.id, products: [] };
            }
          }
        );

        const productDataArray = await Promise.all(productPromises);
        const productsMap: ProductsMap = productDataArray.reduce(
          (acc, { categoryId, products }) => {
            acc[categoryId] = products;
            return acc;
          },
          {} as ProductsMap
        );

        setProducts(productsMap);
      } catch (error) {
        setError((error as Error).message);
        console.error("Error fetching categories or products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndProducts();
  }, [user?.accessToken]);

  if (loading) {
    return <div className="text-center py-10">Loading dishes...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 py-10 px-4 lg:px-32">
      <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-10 text-center">
        Our Dishes
      </h1>

      <div className="flex flex-col gap-16">
        {categories.length === 0 ? (
          <p className="text-center text-gray-600">No categories available.</p>
        ) : (
          categories.map((category) => (
            <div
              key={category.id}
              className="bg-white p-6 rounded-lg shadow-lg mb-8 mx-auto w-full lg:w-3/4"
            >
              <h2 className="text-2xl lg:text-4xl font-bold text-gray-800 mb-6 border-b-2 border-gray-200 pb-4 text-center">
                {category.name}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products[category.id] && products[category.id].length > 0 ? (
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
                    No products available.
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dishes;