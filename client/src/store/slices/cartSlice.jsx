/*eslint-disable no-eval */

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartData: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [],
    cartTotalNumber: 0,
    cartTotal: 0,
  },
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartData.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        if (
          state.cartData[itemIndex].itemQuantity <
          state.cartData[itemIndex].stock
        ) {
          state.cartData[itemIndex] = {
            ...state.cartData[itemIndex],
            itemQuantity: state.cartData[itemIndex].itemQuantity + 1,
          };
        }

      } else {
        let cartItem = { ...action.payload, itemQuantity: 1 };
        state.cartData.push(cartItem);
      }
      localStorage.setItem("cart", JSON.stringify(state.cartData));
    },
    decreaseQuantity(state, action) {
      const itemIndex = state.cartData.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartData[itemIndex].itemQuantity > 1) {
        state.cartData[itemIndex].itemQuantity -= 1;
      } else if (state.cartData[itemIndex].itemQuantity === 1) {
        const nextItems = state.cartData.filter(
          (item) => item.id !== action.payload.id
        );

        state.cartData = nextItems;
      }

      localStorage.setItem("cart", JSON.stringify(state.cartData));
    },
    removeFromCart(state, action) {
      state.cartData.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          const nextItems = state.cartData.filter(
            (item) => item.id !== cartItem.id
          );

          state.cartData = nextItems;
        }
        localStorage.setItem("cart", JSON.stringify(state.cartData));
        return state;
      });
    },
    getTotals(state, action) {
      let { total, quantity } = state.cartData.reduce(
        (cartTotal, cartItem) => {
          const { price, itemQuantity } = cartItem;

          const itemTotal = Math.ceil(eval(price)) * itemQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += itemQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.cartTotalNumber = quantity;
      state.cartTotal = total;
    },
    clearCart(state, action) {
      state.cartData = [];
      localStorage.setItem("cart", JSON.stringify(state.cartData));
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
