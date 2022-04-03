import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise('cart', 'get')
      const products = cart.map(item => item._id);
      let datePeriods = await idbPromise('datePeriods', 'get')
      

      console.log(datePeriods[0])

      if (products.length) {
        const { data } = 
        await addOrder(
          { variables: {
              products,
              datePeriods: datePeriods.splice(-1).toString()
          
            }
          });
        const productData = data.addOrder.products;

        productData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }

      idbPromise( 'datePeriods','deleteData');

      setTimeout(()=>{
        window.location.assign('/');
      }, 9000);
    }
    saveOrder();
  }, [addOrder]);
  return (
    <div>
        <h1>PURCHASE DONE!!!!!!</h1>
        
        </div>
  );
};

export default Success;