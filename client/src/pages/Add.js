import React, { useState } from 'react';

import { useMutation } from '@apollo/client';

import { ADD_ITEMS_FOR_SALE } from '../utils/mutations';




function Add() {
  
  const [addItem] = useMutation(ADD_ITEMS_FOR_SALE);
  const initialValues = {                   // type all the fields you need
    _id: '',
    itemcategory: '',
    productitem: '',
    productdetails: '',
    image: '',
    rentamount: '',
    availability: '',
    volume: '',
    reserveDays : ''
    };

    const [values, setValues] = useState(initialValues); 
    
 const changeHandler = e => {
    setValues({...values, [e.target.name]: e.target.value})
 }
 const handleFormSubmit = async (event) => {
  event.preventDefault();

  try {
    await addItem({
      variables: { _id: '',
      itemcategory: '',
      productitem: '',
      productdetails: '',
      image: '',
      rentamount: '',
      availability: '',
      volume: '',
      reserveDays: ''  },
    });

    setValues('');
  } catch (err) {
    console.error(err);
  }
};
 return (
     <div>
         <form className='formstyle'
         
          onSubmit={handleFormSubmit}>
       
         
          <label> ITEM CATEGORY
    <input type="text"
        className="form-control"
        id="itemcategory"
        name="itemcategory"
        placeholder="Enter itemcategory"
        onChange={changeHandler}
    />
    </label>
    <label> PRODUCT ITEM
    <input type="text"
        className="form-control"
        id="productitem"
        name="productitem"
        placeholder="Enter productitem"
        onChange={changeHandler}
    /></label>
    <label> PRODUCT DETAILS
    <input type="text"
        className="form-control"
        id="productdetails"
        name="productdetails"
        placeholder="Enter productdetails"
        onChange={changeHandler}
    /></label>
    <label> IMAGE URL
    <input type="text"
        className="form-control"
        id="image"
        name="image"
        placeholder="image"
        onChange={changeHandler}
    /></label>
    <button className="btn btn-info btn-block" type="submit">
              ADD IMAGE!
            </button>
    <label> RENT AMOUNT
    <input type="text"
        className="form-control"
        id="rentamount"
        name="rentamount"
        placeholder="Enter rentamount"
        onChange={changeHandler}
    /></label>
   <label> HOW MANY DAYS?
    <input type="text"
        className="form-control"
        id="reserveDays"
        name="reserveDays"
        placeholder="Enter reserveDays"
        onChange={changeHandler}
    /></label>
      <div className="col-12 col-lg-3">
            <button className="btn btn-info btn-block" type="submit">
              ADD ITEM
            </button>
          </div>
    </form>
  
    </div>
    
 )

 };

 

export default Add;
