import React from "react";
import { Link } from "react-router-dom";

function ProductCard(item) {

  const {
    image,
    productitem,
    productdetails,
    _id,
    rentamount
  } = item;

  return (

    <div className=" productCard ">
    <div id={_id}>
        <div className="card cardradius" style={{ width: '60rem',  border: '7px solid green'}}>
          <div className="container imgContainer">
            <img alt={productitem} className=" my-2" justifyContent="center" style={{ width: '30rem',height: '15rem'  }} variant="top" src={`/images/${image}`} />
          </div>
          <div className="imagebox">
            <h6 className="my-2">{productitem}</h6>
            <div className="my-2 mx-6">
             
              {productdetails}
            </div>
            <button className="my-2">
            <Link to={`/products/${_id}`}>
              ABOUT THE PRODUCT</Link>
            </button>
            <footer className="cardFooter" id="price" style={{ width: 'auto',  border: '5px solid black'}}>
              <div className="cardFooter hardText">DAILY RATE BEGINS AT</div>
              <div className="rentalPrice">${rentamount}Per day</div>
            </footer>
          </div>
        </div>
      </div>
  </div>
  );
}

export default ProductCard;
