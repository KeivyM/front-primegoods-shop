import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { removeItem, updateItemQuantity } from "../store/cart/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {items.map((item, i) => (
              <li key={item.id}>
                {item.name} x {item.quantity} - ${item.price * item.quantity}
                <button
                  onClick={() => {
                    if (item.quantity > 1) {
                      return dispatch(
                        updateItemQuantity({
                          id: item.id,
                          quantity: item.quantity - 1,
                        })
                      );
                    }
                  }}
                >
                  -
                </button>
                <button
                  onClick={() =>
                    dispatch(
                      updateItemQuantity({
                        id: item.id,
                        quantity: item.quantity + 1,
                      })
                    )
                  }
                >
                  +
                </button>
                <button onClick={() => dispatch(removeItem(item.id))}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p>Total: ${total}</p>
        </>
      )}
    </div>
  );
};

export default CartPage;
