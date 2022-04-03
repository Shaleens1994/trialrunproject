import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';


const RSVPDatePicker = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  // // handleChange: function(value, formattedValue) {
  //   this.setState({
  //     value: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
  //     formattedValue: formattedValue // Formatted String, ex: "11/19/2016"
  //   });
  // },
  // componentDidUpdate: function(){
  //   // Access ISO String and formatted values from the DOM.
  //   var hiddenInputElement = document.getElementById("example-datepicker");
  //   console.log(hiddenInputElement.value); // ISO String, ex: "2016-11-19T12:00:00.000Z"
  //   console.log(hiddenInputElement.getAttribute('data-formattedvalue')) // Formatted String, ex: "11/19/2016"
  // },

  return (
    <form>
        <div className="form-group">
          <DatePicker
            locale="es"
            dateFormat="MM/dd/yyyy"
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
            }}
            isClearable={true}
          />
        </div>
    </form>

    );
   
};

export default RSVPDatePicker;