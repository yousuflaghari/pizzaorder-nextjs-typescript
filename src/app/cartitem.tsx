import React from "react";
import { CartItemProps } from "@/interface";

const CartItem: React.FC<{ item: CartItemProps }> = ({ item }) => {
  console.log("Price:", item.price);
  return (
    <>
      <p>ID: {item.id}</p>
      <p>Quantity: {item.quantity}</p>
      <p>Price: ${item.price}</p>
      <p>Total: ${item.price * item.quantity}</p>
    </>
  );
};

export default CartItem;
