import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, GET_TOTALS } from './types';

export const addToCart = (items, product) => {
  let productInCart = false;

  const newItems = items.map(item => {
    if (item._id === product._id) {
      item = { ...item, amount: item.amount + 1 };
      productInCart = true;
    }
    return item;
  });

  if (!productInCart) {
    newItems.push({ ...product, amount: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(newItems));
  return { type: ADD_TO_CART, payload: newItems };
};

export const removeFromCart = (items, product) => {
  const newItems = items.filter(item => item._id !== product._id);
  localStorage.setItem('cart', JSON.stringify(newItems));
  return { type: REMOVE_FROM_CART, payload: newItems };
};

export const clearCart = () => {
  localStorage.clear();
  return { type: CLEAR_CART, payload: [] };
};

export const getTotals = items => {
  let { amount, total } = items.reduce(
    (cartTotal, item) => {
      const { price, amount } = item;
      const itemTotal = price * amount;
      cartTotal.amount += amount;
      cartTotal.total += itemTotal;
      return cartTotal;
    },
    {
      amount: 0,
      total: 0,
    }
  );
  total = parseFloat(total.toFixed(2));

  return { type: GET_TOTALS, payload: { amount, total } };
};
