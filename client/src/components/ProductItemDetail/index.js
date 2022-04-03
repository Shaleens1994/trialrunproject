
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import AddToCart from '../AddToCart';

import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_PRODUCTS
} from "../../utils/actions";

function ProductItemDetail(item) {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({
  });

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products } = state;

  useEffect(() => {
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }else if(data){
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products
      });
    }
  }, [products, data, loading, dispatch,  id]);

  return (
     <>
       {currentProduct ? (
        <div className="my-3">
         <h1 className="productTitle">{currentProduct.productitem}</h1>
           <Link to="/products">  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
</svg> </Link>

             <div className="detailWrapper">
                <section className="flex-row">

          {/* Image Column */}
                  <div className="flex-column productImage mx-4 px-4" style={{ width: '60rem',  border: '7px solid green'}}>
                    <img src={`/images/${currentProduct.image}`} alt="product"/>
                  </div>
<div className= "productdetails" style={{ width: '60rem',  border: '7px solid green'}}>
          {/* Description Column */}
                  <div className="flex-column productdetails mx-4 px-4">

          {/* title and price  */}
                    <h2 className="productdetailsHeading">
                      {currentProduct.productitem}</h2>
                        <div>
                        <h3>${currentProduct.rentamount}PER DAY</h3>
                        </div>

          {/* Specs List */}
                    <section className="detailsText">
                      <h4>SPECIFICATIONN:</h4>
                          <ul className="specs">

                            

                               <li className="my-2">
                              <div className="listTitle">DETAILS OF THE ITEM:</div>
                              <div className="listElement">{currentProduct.productdetails}
                              </div>
                            </li>

                            <li className="my-2">
                              <div className="listTitle">VOLUME IN STOCK THATS AVAILABLE</div>
                              <div className="listElement">{currentProduct.volume}</div>

                            </li>
                        </ul>
                        <AddToCart currentProduct={currentProduct} />
                      </section>
                  </div>
                  </div>

       
                  <div className="flex-column reservationAndCart mx-1 px-1">

                  </div>

               </section>
            </div>
          </div>
      ) : null}
     </>
  )
}

export default ProductItemDetail;