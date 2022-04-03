const mongoose = require('mongoose');

const { Schema } = mongoose;
const ProductSchema = new Schema({
    itemcategory: {
      type: String,
      required: true,
      trim: true
  },
  
    productitem: {
      type: String,
      required: true,
      trim: true
  },
  
    productdetails: {
      type: String,
     
    },
    
    image: { 
      type: String,
     
  },

   rentamount:  {
    type: Number,
    required: true
    
  },

    availability: {
      type: String,
      
  },
  reserveDays:{
    type: Number,
    min: 0,
    default: 0
  },
  
    volume: {
      type: Number,
      min: 0,
      default: 1
  },
  
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;