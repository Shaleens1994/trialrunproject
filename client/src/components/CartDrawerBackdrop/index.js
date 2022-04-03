import React from "react";

function CartDrawerBackdrop(props) {
  return (
    <div className="cartbackground" onClick={props.toggleCart} />
  )
}

export default CartDrawerBackdrop;
