import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItemFromCart } from "../store/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  const handleRemoveItem = (productId) => {
    dispatch(removeItemFromCart(productId));
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {items.map((item) => (
            <div key={item.productId}>
              <p>{item.name}</p>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => handleRemoveItem(item.productId)}>
                Remove
              </button>
            </div>
          ))}
          <button>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
