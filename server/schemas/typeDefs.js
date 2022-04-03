const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Product {
    _id: ID
    itemcategory: String
    productitem: String
    productdetails: String
    image: String
    rentamount: Float
    availability: String
    volume: Int
    reserveDays: Int
  }
  type Order {
    _id: ID
    orderDate: String
    datePeriods: String
    products:[Product]

  }
  type Auth {
    token: ID
    user: User
  }

  type Checkout {
    session: ID
  }
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    phoneNumber: String
    mailList: Boolean
    orders: [Order]
    products: Product
  }


  type Query {
    products( name: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }
  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!, phoneNumber: String, mailList: Boolean): Auth
    addOrder(products: [ID]!, datePeriods: String!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String, phoneNumber: String, mailList: Boolean): User
    updateProduct(_id: ID, volume: Int!): Product
    login(email: String!, password: String!): Auth
    additemforsale(UserId: ID!, itemcategory: String!, productitem: String!, productdetails: String!, image: String!, rentamount: Float!, availability: String!, volume: Int!, reserveDays: Int!): Product
  }
 
`;

module.exports = typeDefs;
