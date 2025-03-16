import axios from "axios";
import React, { useEffect, useState } from "react";
import useFetchProduct from "../hooks/useFetchProduct";


const Checkout = () => {
  
  const {productData} = useFetchProduct({checkedout:true})

  return (
    
      <div className="w-full max-w-3xl mx-auto   border-2 border-gray-100  rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Checkout</h2>

        {productData.length === 0 ? (
          <p className="text-center text-gray-500">No items in checkout</p>
        ) : (
          <div className="space-y-4">
            
            {productData.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img src={item.img} alt={item.title} className="w-16 h-16 object-cover rounded-lg" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">{item.title}</h3>
                    <p>{item?.description}</p>
                    <p className="text-gray-600">${item.price}</p>
                  </div>
                </div>
               
              </div>
            ))}
          </div>
        )}
      </div>
    
  );
};

export default Checkout;
