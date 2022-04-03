const db = require('./connection');
const { User, Product } = require('../models');

const productData = require('./productData.json');

db.once('open', async () => {
   
    await Product.deleteMany();
    await Product.create(productData);

    console.log('all done!');
    process.exit(0);
  
});




