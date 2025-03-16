import React, { useEffect, useState } from "react";
import { BiCart, BiSearch } from "react-icons/bi";
import { FiTrash } from "react-icons/fi";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageHeading from "../Layout/PageHeading";

import ShopItems from "../components/Shop/ShopItems";
import useFetchProduct from "../hooks/useFetchProduct";
import SearchItems from "../components/Shop/SearchItems";

const Shop = () => {
  const { onSearch, productData } = useFetchProduct({ checkedout: false });

  return (
    <div className="min-h-screen  py-10 max-w-7xl mx-auto">
      <PageHeading home="Home" pagename="Buy Products" />

       
        <ShopItems isHome={false} checkedOut={false} />
      
    </div>
  );
};

export default Shop;
