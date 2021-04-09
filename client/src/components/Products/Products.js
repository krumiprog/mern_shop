import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bounce } from 'react-reveal';
import { FaShoppingCart } from 'react-icons/fa';
import { fetchProducts } from '../../store/actions/productActions';
import { addToCart } from '../../store/actions/cartActions';
import './Products.scss';

const Products = () => {
  const { products, loading } = useSelector(state => state.products);
  const { items } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleClick = product => {
    dispatch(addToCart(items, product));
  };

  return (
    <div className="products">
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          {products.map(product => (
            <Bounce key={product._id}>
              <div className="item">
                <img src={`/images/${product.image}`} alt={product.title} />
                <div className="info">
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                </div>
                <div className="footer">
                  <h2>$ {product.price}</h2>
                  <button onClick={() => handleClick(product)}>
                    <FaShoppingCart />
                  </button>
                </div>
              </div>
            </Bounce>
          ))}
        </>
      )}
    </div>
  );
};

export default Products;
