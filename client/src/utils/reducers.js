import { useReducer } from "react";
import {
    UPDATE_BOOKINGS,
    ADD_TO_CART,
    UPDATE_CART_QUANTITY,
    REMOVE_FROM_CART,
    ADD_MULTIPLE_TO_CART,
    CLEAR_CART,
    TOGGLE_CART
} from "./actions";

export const reducer = (state, action) => {
    switch (action.type) {
      case UPDATE_BOOKINGS:
        return {
          ...state,
          bookings: [...action.bookings],
        };
  
      case ADD_TO_CART:
        return {
          ...state,
          cartOpen: true,
          cart: [...state.cart, action.booking],
        };
  
      case ADD_MULTIPLE_TO_CART:
        return {
          ...state,
          cart: [...state.cart, ...action.bookings],
        };
  
      case UPDATE_CART_QUANTITY:
        return {
          ...state,
          cartOpen: true,
          cart: state.cart.map(booking => {
            if (action._id === booking._id) {
              booking.purchaseQuantity = action.purchaseQuantity
            }
            return booking
          })
        };
  
      case REMOVE_FROM_CART:
        let newState = state.cart.filter(booking => {
          return booking._id !== action._id;
        });
  
        return {
          ...state,
          cartOpen: newState.length > 0,
          cart: newState
        };
  
      case CLEAR_CART:
        return {
          ...state,
          cartOpen: false,
          cart: []
        };
  
      case TOGGLE_CART:
        return {
          ...state,
          cartOpen: !state.cartOpen
        };
  
       
      default:
        return state;
    }
  };
  
  export function useBookingReducer(initialState) {
    return useReducer(reducer, initialState)
  }