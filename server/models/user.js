const { Schema, model } = require('mongoose');
const Order = require('./Order');
const bcrypt = require('bcrypt');
const userSchema = new Schema({
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    phoneNumber: {
      type: String,
      trim: true
    },
    mailList: {
      type: Boolean,
      default: false
    },
    orders: [Order.schema]
  });
  userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });

  userSchema.methods.isCorrectPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };



  const user = model('user', userSchema);

module.exports = user;