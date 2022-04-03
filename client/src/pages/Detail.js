import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import ProductItemDetail from '../components/ProductItemDetail';

import { QUERY_PRODUCTS } from '../utils/queries';
import spinner from '../assets/spinner.gif';

import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_PRODUCTS
} from "../utils/actions";
import { idbPromise } from "../utils/helpers";

function Detail() {
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
      data.products.forEach((product) =>{
        idbPromise('products', 'put', product);
      });
    }
  }, [products, data, loading, dispatch,  id]);

  return (
    <>
      {currentProduct ? (
        <div className='detailedpic'>
          <ProductItemDetail />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </>
  );
}

export default Detail;