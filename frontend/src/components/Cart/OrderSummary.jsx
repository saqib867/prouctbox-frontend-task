import React from 'react'
import useCartStore from '../../redux/cartSlice';
import { axiosRequest } from '../../libs/axiosRequest';
import { toast } from 'react-toastify';

const OrderSummary = () => {
    const { data: cartProducts, totalAmount, removeItem, updateQuantity, clearCart } = useCartStore(state => state);

    const checkedoutHandler = async()=>{

        try {
               const itemIds = cartProducts?.map(item=>item?.id)
               console.log("items id => ",itemIds)
               const response = await axiosRequest.post(`/items/checkedout`,{itemIds})
               console.log("cart product update response => ",response.data)
               clearCart()
               toast.success("You Product has been checkedout successfully")

        } catch (error) {
            console.log("error => ",error)
        }

    }

  return (
    <div className="w-1/3 bg-gray-100 p-6 h-fit rounded-xl">
    <h2 className="text-xl font-semibold mb-4">Total</h2>
    
    {cartProducts.map((item) => (
      <div key={item.id} className="flex justify-between mt-2">
        <p>
          {item.quantity} x {item.title}
        </p>
        <span>Rs. {item.price * item.quantity}</span>
      </div>
    ))}
    <div className="flex justify-between mt-4 border-t pt-2">
      <p className="font-semibold">Discount</p>
      <span>- Rs. 0</span>
    </div>
    <div className="flex justify-between text-lg font-bold mt-2">
      <p>Due Payment</p>
      <span>Rs. {totalAmount}</span>
    </div>
    <button onClick={checkedoutHandler} className="mt-4 w-full bg-[#E3364E] text-white font-bold py-3 rounded-lg cursor-pointer">
      REVIEW PAYMENT AND CHECKOUT
    </button>
  </div>
  )
}

export default OrderSummary