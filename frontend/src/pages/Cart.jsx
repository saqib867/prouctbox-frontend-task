import React from "react";
import { PiMinus, PiPlus } from "react-icons/pi";
import { Link } from "react-router-dom";
import useCartStore from "../redux/cartSlice";
import CartItems from "../components/Cart/CartItems";
import OrderSummary from "../components/Cart/OrderSummary";

const Cart = () => {
  const { data: cartProducts } = useCartStore((state) => state);
  if (!cartProducts?.length) {
    return (
      <div className="text-center p-4  flex flex-col justify-center items-center max-w-7xl mx-auto ">
        <h3 className="text-lg font-semibold">No Cart Items Found</h3>
        <p className="text-gray-500">
          Your cart is empty. Add some items to continue shopping.
        </p>
      </div>
    );
  }

  return (
    <div className="w-10/12 mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Cart</h1>

      <div className="flex gap-6">
        {/* Cart Items */}
        <CartItems />

        {/* Order Summary */}
        <OrderSummary />
      </div>
    </div>
  );
};

export default Cart;
