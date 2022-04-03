import React from "react";
import { useParams } from 'react-router-dom';
import spinner from '../../assets/spinner.gif';
import Cart from "../Cart";
import { useQuery } from '@apollo/client';
import {QUERY_PRODUCTS} from '../../utils/queries';
import { useStoreContext } from "../../utils/GlobalState";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_DAYS,
  ADD_TO_CART,
} from "../../utils/actions";

function AddToCart(input) {
    const {
        currentProduct
    } = input

    const { id } = useParams();
    const { loading } = useQuery(QUERY_PRODUCTS);

    const addToCart = () => {
        // find the cart item with the matching id
        const itemInCart = cart.find((cartItem)=> cartItem._id === id);

        //if there was a match, call UPDATE with a new purchase quantity
        if(itemInCart){
          dispatch({
            type: UPDATE_CART_DAYS,
            _id: id,
            reserveDays: parseInt(itemInCart.reserveDays) + 1
          });
        }else{
          dispatch({
            type: ADD_TO_CART,
            product: { ...currentProduct, reserveDays: 1 }
          });
        }
      };

    const [state, dispatch] = useStoreContext();

    const { cart } = state;

    const removeFromCart = () => {
        dispatch({
          type: REMOVE_FROM_CART,
          _id: currentProduct._id
        });
      };
    return(
        <div>
        <p>
            <button className="my-3" onClick={addToCart}>BOOK YOUR DATES</button>
            <br />
            <button className="my-3"
                disabled={!cart.find(p => p._id === currentProduct._id)}
                onClick={removeFromCart}
            >
             DELETE
      </button>
      </p>

      {loading ? <img src={spinner} alt="loading" /> : null}
              <Cart/>
    </div>

    )
}

export default AddToCart;