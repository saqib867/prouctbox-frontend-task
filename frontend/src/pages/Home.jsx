import React from "react";
import Banner from "../components/Banner";

import ShopItems from "../components/Shop/ShopItems";
import useFetchProduct from "../hooks/useFetchProduct";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const {productData} = useFetchProduct({checkedout:false})
  const navigate = useNavigate()
  return (
    <div className="">
      <Banner />   
     <div className="max-w-7xl mx-auto"><ShopItems isHome={true} checkedOut={false}/></div> 
      {productData.length == 0 ? <div className="max-w-md mx-auto my-14">
          <h1 className="text-center text-2xl font-bold">No Product</h1>
           <p className="text-center font-semibold">No Product Were Found</p>
      </div> :<div className="flex items-center justify-center my-5 ">
          <button onClick={()=>navigate("/buy")} className="p-2 rounded-md bg-green-500 text-white w-28 cursor-pointer">View All</button>
      </div>}
    </div>
  );
};

export default Home;
