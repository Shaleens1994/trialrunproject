import React from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_DAYS } from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";

const CartItem = ({ item }) => {
  const [, dispatch] = useStoreContext();

  const removeFromCart = item => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id
    })
    idbPromise('cart', 'delete', { ...item });
  };

  const onChange = (e) =>{
    const value = e.target.value;

    if(value === '0'){
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id
      });
      idbPromise('cart', 'delete', { ...item });
    } else {
      dispatch({
        type: UPDATE_CART_DAYS,
        _id: item._id,
        reserveDays: parseInt(value)
      });

      idbPromise('cart', 'put', { ...item, reserveDays: parseInt(value) });
    }
  };

  return (
    <div className="flex-row">
      <div className="flex-column">
        <img
          src={`/images/${item.image}`}
          alt=""
        />
        <div className="py-1">
          <p className="itemdelete" onClick={() => removeFromCart(item)}>DELETE ITEM</p>
        </div>
      </div>
      <div className="flex-column" style={{flexGrow:"1"}}>
        <h4>{item.productitem}</h4>
        <div className="itemcost">
          <h5>${item.rentamount}</h5>
          <p> PER DAY</p>
        </div>
        <div className="flex-row" style={{alignItems: "center"}}>
          <p>VOLUME OF ITEMS </p>
          <input
            type="number"
            placeholder="1"
            value={item.reserveDays}
            onChange={onChange}
            style={{marginLeft: "10px", width: "100%"}}
          />
        </div>
      </div>
    </div>
  );
}

export default CartItem;