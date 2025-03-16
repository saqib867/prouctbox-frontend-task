import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { axiosRequest } from "../../libs/axiosRequest";


const ItemForm = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: '',
    img: "",
    quantity:1,
    isCheckedOut:false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === "price" ? parseFloat(value) || 0 : value, 
    }));
  };
  

  const sellProduct = async (e) => {
    e.preventDefault();
    


    try {
      const response = await axiosRequest.post("/items", product, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Product added successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Sell Your Product</h2>

        <form onSubmit={sellProduct} className="space-y-4">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleChange}
              placeholder="Enter product title"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Price Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Enter product price"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image URL Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="text"
              name="img"
              value={product.img}
              onChange={handleChange}
              placeholder="Enter image URL"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Enter product description"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 cursor-pointer text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition"
          >
            Submit Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default ItemForm;
