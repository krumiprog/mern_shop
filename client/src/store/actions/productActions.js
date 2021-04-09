import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
} from './types';

export const fetchProductsRequest = () => {
  return { type: FETCH_PRODUCTS_REQUEST };
};

export const fetchProductsSuccess = products => {
  return { type: FETCH_PRODUCTS_SUCCESS, payload: products };
};

export const fetchProductsFailure = error => {
  return { type: FETCH_PRODUCTS_FAILURE, payload: error };
};

export const fetchProducts = () => dispatch => {
  dispatch(fetchProductsRequest());
  fetch('/api/products')
    .then(res => res.json())
    .then(data => {
      dispatch(fetchProductsSuccess(data));
    })
    .catch(error => dispatch(fetchProductsFailure(error.message)));
};
