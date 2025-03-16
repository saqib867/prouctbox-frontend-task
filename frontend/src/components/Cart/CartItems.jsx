import React from 'react'
import useCartStore from '../../redux/cartSlice';
import { PiMinus, PiPlus } from 'react-icons/pi';
import { BiX } from 'react-icons/bi';

const CartItems = () => {
  const { data: cartProducts, totalAmount, removeItem, updateQuantity, clearCart } = useCartStore(state => state);
  const increaseQuantity = (itemId, currentQuantity) => {
    updateQuantity(itemId, currentQuantity + 1);
  };

  const decreaseQuantity = (itemId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(itemId, currentQuantity - 1);
    }
  };
  return (
   <div className="w-2/3">
               {cartProducts.map((item) => (
                 <div key={item.id} className="flex items-center bg-gray-100 p-4 rounded-xl mb-4">
                   <img src={item.img} alt={item.title} className="h-20 w-20 object-cover rounded-md mr-4" />
                   <div className="flex flex-1 flex-col gap-y-2">
                     <h2 className="font-semibold text-lg">{item.title}</h2>
                     <p className="text-red-500 font-bold">Rs. {item.price}</p>
                     <div className="flex items-center gap-2">
                     <button
                       className="bg-[#E3364E] text-black p-1 rounded-full"
                       onClick={() => decreaseQuantity(item.id, item.quantity)}
                     >
                       <PiMinus size={10} color='white' />
                     </button>
                     <span className="font-semibold">{item.quantity}</span>
                     <button
                       className="bg-[#E3364E] text-black p-1 rounded-full"
                       onClick={() => increaseQuantity(item.id, item.quantity)}
                     >
                       <PiPlus size={10} color='white' />
                     </button>
                   </div>
                   </div>
                   <div className="flex items-center gap-2">
                     <BiX size={20} className='cursor-pointer' onClick={()=>removeItem(item.id)} />
                   </div>
                 </div>
               ))}
             </div>
  )
}

export default CartItems