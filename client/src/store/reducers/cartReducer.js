import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  GET_TOTALS,
} from '../actions/types';

const initialState = {
  items: [],
  amount: 0,
  total: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, items: action.payload };
    case REMOVE_FROM_CART:
      return { ...state, items: action.payload };
    case CLEAR_CART:
      return { ...state, items: action.payload };
    case GET_TOTALS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default cartReducer;
