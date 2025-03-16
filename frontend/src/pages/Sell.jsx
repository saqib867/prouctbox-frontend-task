import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageHeading from "../Layout/PageHeading";
import ItemForm from "../components/Cart/ItemForm";
const Sell = () => {
 
  return (
    <div className="max-w-7xl mx-auto">

      <ItemForm/>
      </div>  
    
  );
};

export default Sell;