import React, { useState } from "react";
import CartItem from '../CartItem';
import { useStoreContext } from '../../utils/GlobalState';
import Auth from '../../utils/auth';
import { BsXLg } from "react-icons/bs";
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import "react-dates/lib/css/_datepicker.css";
import { idbPromise } from "../../utils/helpers";

function CartDrawer(props) {

  const [state]= useStoreContext();

  // For the date picker
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [focusedInput, setFocusedInput] = useState();

  return (
    <div className="cart-container">
    <div>
      <div className="flex-row space-between" style={{marginBottom: "30px"}}>
        <h2>RESERVATI0N BIN</h2>
        <div className="close" onClick={props.toggleCart}>
          <BsXLg />
        </div>
      </div>
    
      {state.cart.length ?(
        <div>
          {state.cart.map(item => (
            <CartItem key={item._id} item={item} />
          ))}

          <div className="flex-row" style={{marginTop: "16px"}}>
            <div className="flex-column">
              <h6>CHOOSE YOUR DATES</h6>
              <DateRangePicker
                startDate={startDate}
                startDateId="start-date" 
                endDate={endDate} 
                endDateId="end-date" 
                onDatesChange={({ startDate, endDate }) => {
                  setStartDate(startDate);
                  setEndDate(endDate);
                  idbPromise('datePeriods', "put",
                  `PickUp: ${new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(startDate)}`+ 
                  ` DropOff: ${new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(endDate)}`)
                }}
                
                focusedInput={focusedInput}
                onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
                startDatePlaceholderText="START DATE"
                endDatePlaceholderText="RETURN DATE"
                numberOfMonths= {2}
              />

            </div>
          </div>

          

          <div className="flex-column space-between" style={{marginTop: "45px"}}>
            <div className="flex-row space-between" style={{marginBottom: "28px"}}>
              <h5>PAY AMOUNT</h5>
              <h3> ${props.calculateTotal}</h3>
            </div>
          
            {
              Auth.loggedIn() ?
                <button onClick={props.submitCheckout}>
                  CLICK TO PROCEED
                </button>
                :
                <span>(PLEASE LOGIN TO PROCEED)</span>
            }
          </div>
        </div>
      ):(
        <h6>
          YOUR CART IS EMPTY!!! PLEASE ADD ITEMS!!
        </h6>
      )}
    </div>
    </div>
  );
}

export default CartDrawer;
