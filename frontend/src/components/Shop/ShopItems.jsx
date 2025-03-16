import React, { useState } from 'react'

import useFetchProduct from '../../hooks/useFetchProduct';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { FiTrash } from 'react-icons/fi';
import { BiCart } from 'react-icons/bi';
import { TiTick } from 'react-icons/ti';
import SearchItems from './SearchItems';

const ShopItems = ({isHome,checkedOut}) => {
const{handleAddToCart,handleDelete,onSearch,productData} = useFetchProduct({checkedout:checkedOut})
const renderProduct = isHome ? productData.slice(0,6) :[...productData]

  return (
    <div className=" px-4 ">
       {!isHome && <SearchItems onSearch={onSearch}/>}
        <div className="grid grid-cols-1 md:grid-cols-3  gap-6">
          {  renderProduct.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-xl overflow-hidden p-4 transition-transform transform hover:scale-105"
            >
              <div className="relative">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-72 object-cover rounded-lg"
                />
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <Link
                    to={`/buyDetail/${item.id}`}
                    className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                  >
                    <FaEye size={18} className="text-gray-600" />
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-white p-2 rounded-full shadow-md hover:bg-red-100"
                  >
                    <FiTrash size={18} className="text-red-600" />
                  </button>
                </div>
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                <p className="text-gray-600 text-lg font-medium mt-1">${item.price}</p>
              </div>
              <button
                
                className={`w-full  bg-black text-white py-2 mt-4 cursor-pointer rounded-lg flex items-center justify-center gap-2 hover:bg-gray-900`}
                onClick={() => handleAddToCart(item)}
              >
                {<div className='flex'><BiCart size={20} /> Add to Cart</div>}
              </button>
            </div>
          ))}
        </div>
      
      </div>
  )
}

export default ShopItems