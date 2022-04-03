import React, { useEffect } from 'react';
import CartDrawer from '../CartDrawer';
import CartDrawerBackdrop from '../CartDrawerBackdrop';
import { useLazyQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState'
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART} from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";
import { QUERY_CHECKOUT } from '../../utils/queries';
import { loadStripe } from '@stripe/stripe-js';
import "bootstrap-icons/font/bootstrap-icons.css";


const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
  const [state, dispatch]= useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(()=>{
    async function getCart(){
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart]});
    };

    if(!state.cart.length){
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart(){
    dispatch({ type: TOGGLE_CART});
  }

  // TOTAL NUMBER OF ITEMS DISPLAYED IN THE CART WHICH POP UPS WHEN THE USER MAKES RESERVATION
  function calculateItemNum() {
    let itemNum = 0;
    state.cart.forEach(item => {
      itemNum += item.reserveDays;
    });
    return (
      <p>
        {itemNum}
      </p>
    )
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach(item => {
      sum += item.rentamount * item.reserveDays;
    });
    return sum.toFixed(2);
  }

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session })
      })
    }
  }, [data]);

  function submitCheckout(){
    const productIds = [];

    getCheckout({
      variables: { products: productIds }
    });

    state.cart.forEach((item)=> {
      for(let i = 0; i< item.reserveDays; i++){
        productIds.push(item._id);
      }
    });
  }

  let drawerClasses="cart";
  let total = calculateTotal();

  if (!state.cartOpen) {
    return (
      <>
      <div className={drawerClasses}>
          <CartDrawer 
          toggleCart={toggleCart} 
          calculateTotal={total}
          submitCheckout={submitCheckout}
          />
        </div>
      <div>
        <div className="cartnumbrfor-item">
          {calculateItemNum()}
        </div>
        <div className="cart-closed mx-5 " onClick={toggleCart}>
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-cart4" viewBox="0 0 16 16">
  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
</svg>
        </div>
      </div>
      </>
    );
  } else {
    drawerClasses="cart open";
  }

  return (
    <>
    <div className={drawerClasses}>
      <CartDrawer 
      toggleCart={toggleCart} 
      calculateTotal={total}
      submitCheckout={submitCheckout}
      />
    </div>
    <CartDrawerBackdrop 
      toggleCart={toggleCart} 
    />
    </>
  );
};

export default Cart;