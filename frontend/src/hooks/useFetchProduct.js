import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import useCartStore from '../redux/cartSlice';
import { axiosRequest } from '../libs/axiosRequest';

const useFetchProduct = ({checkedout}) => {
  console.log("checkout => ",checkedout)
    const [isModalOpen, setIsModalOpen] = useState(null);
  const [productData, setProductData] = useState([]);
  const {addToCart} = useCartStore(state=>state)
  const [search, setSearch] = useState("");
  const debounceRef = useRef(null);

  // Fetch products function
  const fetchProductsData = async () => {
    try {
      console.log("Fetching data for search:", search);
      const response = await axiosRequest.get(`/items?checkedOut=${checkedout}&search=${search}`);
      setProductData([...response?.data]); // Ensures a new reference for re-render
    } catch (error) {
      toast.error("Please run the server to see the products");
    }
  };

  // Debounce API call to reduce unnecessary calls
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      fetchProductsData();
    }, 500); // 500ms debounce time

    return () => clearTimeout(debounceRef.current);
  }, [search, checkedout]); // Runs when search or checkedout changes

  // Handle search input change
  const onSearch = (e) => {
    setSearch(e.target.value);
  };

  // Handle delete functionality
  const handleDelete = async (id) => {
    try {
      await axiosRequest.delete(`/items/${id}`);
      setProductData((prevData) => prevData.filter((item) => item.id !== id)); // Safe state update
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Error deleting product");
    }
  };

  const handleAddToCart=(product)=>{

     addToCart(product)
  }

  
   
  return {handleAddToCart,handleDelete,productData,onSearch}
}

export default useFetchProduct