import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
} from '../actions/types';

const initialState = {
  products: [],
  loading: false,
  error: '',
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return { ...state, loading: true };
    case FETCH_PRODUCTS_SUCCESS:
      return { products: action.payload, loading: false, error: '' };
    case FETCH_PRODUCTS_FAILURE:
      return { products: [], loading: false, error: '' };
    default:
      return state;
  }
};

export default productReducer;
