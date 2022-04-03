// import our actions
import {
  UPDATE_Furnitures,
  ADD_TO_CART,
  ADD_MULTIPLE_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_DAYS,
  CLEAR_CART,
  TOGGLE_CART
} from '../utils/actions';

import { reducer } from '../utils/reducers';

// create a sample of what our global state will look like
const initialState = {
  Furniture: [],
  cart: [
    {
      _id: '1',
      brand: 'Sony',
      model: 'x',
      reserveDays: 1
    },
    {
      _id: '2',
      brand: 'Cannon',
      model: 'y',
      reserveDays: 2
    }
  ],
  cartOpen: false
};

test('UPDATE_Furnitures', () => {
  let newState = reducer(initialState, {
    type: UPDATE_Furnitures,
    furnitures: [{}, {}]
  });

  expect(newState.furnitures.length).toBe(2);
  expect(initialState.furnitures.length).toBe(0);
});

test('ADD_TO_CART', () => {
  let newState = reducer(initialState, {
    type: ADD_TO_CART,
    camera: { resreverveDays: 1 }
  });

  expect(newState.cart.length).toBe(3);
  expect(initialState.cart.length).toBe(2);
});

test('ADD_MULTIPLE_TO_CART', () => {
  let newState = reducer(initialState, {
    type: ADD_MULTIPLE_TO_CART,
    furnitures: [{}, {}]
  });

  expect(newState.cart.length).toBe(4);
  expect(initialState.cart.length).toBe(2);
});

test('REMOVE_FROM_CART', () => {
  let newState1 = reducer(initialState, {
    type: REMOVE_FROM_CART,
    _id: '1'
  });

  // cart is still open
  expect(newState1.cartOpen).toBe(true);

  // the second item should now be the first
  expect(newState1.cart.length).toBe(1);
  expect(newState1.cart[0]._id).toBe('2');

  let newState2 = reducer(newState1, {
    type: REMOVE_FROM_CART,
    _id: '2'
  });

  // cart is empty and closed
  expect(newState2.cartOpen).toBe(false);
  expect(newState2.cart.length).toBe(0);

  expect(initialState.cart.length).toBe(2);
});

test('UPDATE_CART_DAYS', () => {
  let newState = reducer(initialState, {
    type: UPDATE_CART_DAYS,
    _id: '1',
    reserveDays: 3
  });

  expect(newState.cartOpen).toBe(true);
  expect(newState.cart[0].reserveDays).toBe(3);
  expect(newState.cart[1].reserveDays).toBe(2);

  expect(initialState.cartOpen).toBe(false);
});

test('CLEAR_CART', () => {
  let newState = reducer(initialState, {
    type: CLEAR_CART
  });

  expect(newState.cartOpen).toBe(false);
  expect(newState.cart.length).toBe(0);
  expect(initialState.cart.length).toBe(2);
});

test('TOGGLE_CART', () => {
  let newState = reducer(initialState, {
    type: TOGGLE_CART
  });

  expect(newState.cartOpen).toBe(true);
  expect(initialState.cartOpen).toBe(false);

  let newState2 = reducer(newState, {
    type: TOGGLE_CART
  });

  expect(newState2.cartOpen).toBe(false);
});