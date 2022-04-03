import { gql } from '@apollo/client';

export const QUERY_PRODUCTS = gql`
{
    products{
      _id
    itemcategory
    productitem
    productdetails
    image
    rentamount
    availability
    volume
    reserveDays
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      email
      phoneNumber
      mailList
      orders {
        _id
        orderDate
        datePeriods
        products {
          _id
          reserveDays
          rentamount
          image
        }
      }
    }
  }
`;
