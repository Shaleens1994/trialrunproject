const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  
    orderDate: {
      type: Date,
      default:Date.now
     
  },
  
    datePeriods: {
      type: String,
      required: true
      
  },
  products:[
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ]
  
  
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;