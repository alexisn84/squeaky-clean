import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Cart from '../components/Cart';
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
} from '../utils/actions';
import { QUERY_BOOKINGS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';

function Booking() {
    const [state, dispatch] = useStoreContext();
    const { id } = useParams();
  
    const [currentBooking, setCurrentBooking] = useState({});
  
    const { loading, data } = useQuery(QUERY_BOOKINGS);
  
    const { bookings, cart } = state;
  
    useEffect(() => {
      // already in global store
      if (bookings.length) {
        setCurrentBooking(bookings.find((booking) => booking._id === id));
      }
      // retrieved from server
      else if (data) {
        dispatch({
          type: UPDATE_BOOKINGS,
          bookings: data.bookings,
        });
  
        data.bookings.forEach((booking) => {
          idbPromise('bookings', 'put', booking);
        });
      }
      // get cache from idb
      else if (!loading) {
        idbPromise('bookings', 'get').then((indexedBookings) => {
          dispatch({
            type: UPDATE_BOOKINGS,
            bookings: indexedBookings,
          });
        });
      }
    }, [bookings, data, loading, dispatch, id]);
  
    const addToCart = () => {
      const itemInCart = cart.find((cartItem) => cartItem._id === id);
      if (itemInCart) {
        dispatch({
          type: UPDATE_CART_QUANTITY,
          _id: id,
          purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
        });
        idbPromise('cart', 'put', {
          ...itemInCart,
          purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
        });
      } else {
        dispatch({
          type: ADD_TO_CART,
          booking: { ...currentBooking, purchaseQuantity: 1 },
        });
        idbPromise('cart', 'put', { ...currentBooking, purchaseQuantity: 1 });
      }
    };
  
    const removeFromCart = () => {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: currentBooking._id,
      });
  
      idbPromise('cart', 'delete', { ...currentBooking });
    };
  
    return (
      <>
        {currentBooking && cart ? (
          <div className="container my-1">
            <Link to="/">← Back to Booking</Link>
  
            <h2>{currentBooking.name}</h2>
  
            <p>{currentBooking.description}</p>
  
            <p>
              <strong>Price:</strong>${currentBooking.price}{' '}
              <button onClick={addToCart}>Add to Cart</button>
              <button
                disabled={!cart.find((p) => p._id === currentBooking._id)}
                onClick={removeFromCart}
              >
                Remove from Cart
              </button>
            </p>
  
            <img
              src={`/images/${currentBooking.image}`}
              alt={currentBooking.name}
            />
          </div>
        ) : null}
        {loading ? <img src={spinner} alt="loading" /> : null}
        <Cart />
      </>
    );
  }
  
  export default Detail;