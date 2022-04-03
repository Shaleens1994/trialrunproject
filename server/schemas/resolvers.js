const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Order } = require('../models');
 const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {  
    checkout: async (parent, args, context) =>{
      const order = new Order({ products: args.products});
      const { products } = await order.populate('products').execPopulate();
      const line_items = [];
      const url = new URL(context.headers.referer).origin;

      for (let i = 0; i < products.length; i++) {
        // product id is generated and the images and price of the product to chekout is added 
        // to the stripe checkout page
        const product = await stripe.products.create({
          name: products[i].productitem,
          productdetails: products[i].productdetails,
          images: [`${url}/images/${products[i].image}`]
        });

        // Price is generated using the id of the product fr the final chekout in stripe
        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: 'usd',
        });

        // Price is added to the ine item array
        line_items.push({
          price: price.id,
          quantity: 1
        });
      }
// wait for teh checkout to return to success page to show the payment was made and the items were reserved successfuly
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success`,
        cancel_url: `${url}/`
      });
      
      return { session: session.id };
    },

    products: async () => {
      return await Product.find();
    },

    product: async (parent, { _id }) => {
      return await Product.findById(_id)
    },

    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
        });
        user.orders.sort((a, b) => b.orderDate - a.orderDate);
        return user;
      }

      throw new AuthenticationError('Not logged in');
    },

    order: async (parent, {_id}, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
        });

        return user.orders.id(_id);
      }
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, args, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order(args);

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },
// add item for sale mutations to add more products from the user end to sell item
// the user can only add items if the user is logged in
    additemforsale: async (parent, {userId, itemforsale }, context) => {
      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      if (context.user) {
        return Product.findOneAndUpdate(
          { _id: userId },
          {
            $addToSet: { itemforsales: itemforsale },
          },
          {
            new: true,
            runValidators: false,
          }
        );
      }
        // If user attempts to execute this mutation and isn't logged in, throw an error
        throw new AuthenticationError('THE USER NEEDS TO LOGIN AND ITS REQUIRED!!!!!!!!!!');
      },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('YOU ARE NOT LOGGED IN PLEASE LOG IN TO CONTINUE');
    },
    updateProduct: async (parent, { _id, volume }) => {
      const decrement = Math.abs(volume) * -1;

      return await Product.findByIdAndUpdate(_id, { $inc: { volume: decrement } }, { new: true });
    },

    // addimageurl: async (parent, { _id, volume }) => {
    //    const options = {
    //        //     body: imageBody,
    //     $addToSet: { addimageurl: addimageurl },
    //     },
    //   };
    // },



    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
// if the user is not logged in error is thrown indicating login needed and need input
      if (!user) {
        throw new AuthenticationError('WRONG INFORMATION!!!!!!!!!!!!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('WRONG INFORMATION!!!!!!!!!!!!');
      }

      const token = signToken(user);

      return { token, user };
    }

  }
}

module.exports = resolvers;