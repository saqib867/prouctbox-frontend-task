import React from "react";
import { FaTimes } from "react-icons/fa";
import { PiMinus, PiPlus } from "react-icons/pi";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageHeading from "../Layout/PageHeading";
import useCartStore from "../redux/cartSlice";

const Cart = () => {
  const { data:cartProducts, totalAmount, removeItem, updateQuantity, clearCart } = useCartStore(state=>state);

  const increaseQuantity = (itemId, currentQuantity) => {
    updateQuantity(itemId, currentQuantity + 1);
  };

  const decreaseQuantity = (itemId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(itemId, currentQuantity - 1);
    }
  };

  const handleCheckout = () => {
    localStorage.setItem("checkout", JSON.stringify(cartProducts));
    clearCart();
    toast.success("Payment Done Successfully");
  };

  return (
    <div>
     
      <PageHeading home={"home"} pagename={"Cart"} />
      <div className="w-10/12 m-auto">
        <div className="mt-8">
          {cartProducts.length === 0 ? (
            <div className="text-3xl font-bold uppercase">
              Your Cart has No Product
            </div>
          ) : (
            <div>
              <table className="w-full shadow-2xl rounded-2xl">
                <thead className="bg-blue-950 text-white font-semibold">
                  <tr>
                    <th className="px-4 py-2"></th>
                    <th className="px-4 py-2">Product</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Quantity</th>
                    <th className="px-4 py-2">SubTotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cartProducts.map((item, key) => (
                    <tr key={key}>
                      <td className="text-center px-4 py-2">
                        <span className="text-red-500" onClick={() => removeItem(item.id)}>
                          <FaTimes />
                        </span>
                      </td>
                      <td className="text-center px-4 py-2">
                        <div className="flex items-center justify-center">
                          <img src={item.img} alt="img" className="h-40 w-40 object-contain mr-2" />
                          <p className="font-semibold">{item.title}</p>
                        </div>
                      </td>
                      <td className="text-center px-4 py-2">${item.price}</td>
                      <td className="text-center px-4 py-2">
                        <div className="flex mr-3">
                          <button className="border mt-4 py-3 px-6" onClick={() => decreaseQuantity(item.id, item.quantity)}>
                            <PiMinus />
                          </button>
                          <span className="border mt-4 py-3 px-6 count">{item.quantity || 1}</span>
                          <button className="border mt-4 py-3 px-6" onClick={() => increaseQuantity(item.id, item.quantity)}>
                            <PiPlus />
                          </button>
                        </div>
                      </td>
                      <td className="text-center px-4 py-2">${item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-6 w-2/5 rounded-2xl shadow-2xl bg-white font-bold mt-4">
                <h1 className="mb-4 text-center text-3xl">Cart Total</h1>
                <h2 className="flex justify-between mt-3">
                  Sub Total : <span>${totalAmount}</span>
                </h2>
                <div className="flex justify-between mt-3">
                  Shipping Charge : <span>${10}</span>
                </div>
                <div className="flex justify-between mt-3">
                  Grand Total : <span>$ {totalAmount + 10}</span>
                </div>
                <div className="whitespace-nowrap flex items-center justify-between mt-4">
                  <button onClick={handleCheckout} className="px-4 py-2 common-hover rounded-lg text-white">
                    Checkout
                  </button>
                  <div className="px-4 py-2 bg-rose-800 rounded-lg text-white">
                    <Link to={"/buy"}>Continue Shopping</Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
