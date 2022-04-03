// import React from "react";
// import { Link } from "react-router-dom";
// import { useStoreContext } from '../../utils/GlobalState';
// import { ADD_TO_CART, UPDATE_CART_DAYS} from '../../utils/actions';
// import { idbPromise } from "../../utils/helpers";


// function ProductItem(item) {
//   const [state, dispatch] = useStoreContext();

//   const {
//     image,
//     productitem,
//     _id,
//     rentamount,
//     about
//   } = item;

//   const { cart } = state;

//   const addToCart = () => {
//     // find the cart item with the matching id
//     const itemInCart = cart.find((cartItem)=> cartItem._id === _id);

//     //if there was a match, call UPDATE with a new purchase reserveDays
//     if(itemInCart){
//       dispatch({
//         type: UPDATE_CART_DAYS,
//         _id: _id,
//         reserveDays: parseInt(itemInCart.reserveDays) + 1
//       });
//       idbPromise('cart', 'put', {
//         ...itemInCart,
//         reserveDays: parseInt(itemInCart.reserveDays) + 1
//       });
//     }else{
//       dispatch({
//         type: ADD_TO_CART,
//         product: { ...item, reserveDays: 1 }
//       });
//       idbPromise('cart', 'put', { ...item, reserveDays: 1 });
//     }
//   }

//   return (
//     <div className="card px-1 py-1">
//       <Link to={`/products/${_id}`}>
//         <img
//           alt={productitem}
//           src={`/images/${image}`}
//         />
//         <p>{productitem}</p>
//         </Link>
//       <div>
//         <span>${rentamount}</span>
//       </div>
//       <button onClick ={addToCart}>CHOOSE  ITEM</button>
//     </div>
//   );
// }

// export default ProductItem;
