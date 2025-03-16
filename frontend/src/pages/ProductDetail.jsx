import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { axiosRequest } from "../libs/axiosRequest";
import useCartStore from "../redux/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const { addToCart } = useCartStore((state) => state);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosRequest.get(`/items/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product)
    return (
      <div className="flex items-center justify-center h-screen max-w-7xl mx-auto">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );

  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center px-6">
      <div className="max-w-5xl w-full flex flex-col md:flex-row gap-10 items-center  p-8 rounded-xl">
        {/* Product Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center  h-96 ">
          <img
            src={product.img}
            alt={product.title}
            className="w-96  p-3 max-h-64 object-contain rounded-3xl"
          />
        </div>

      
        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
          <p>{product.description}</p>

          
          <p className="text-3xl font-bold text-red-500">${product.price}</p>
          <p className="text-green-600 font-medium">Stock Available</p>

        
          <button
            onClick={() => addToCart(product)}
            className="bg-red-500 text-white cursor-pointer w-full py-3 rounded-md text-lg font-medium hover:bg-red-600 transition"
          >
            Add To Cart
          </button>

        
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
