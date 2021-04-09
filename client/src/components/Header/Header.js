import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { getTotals } from '../../store/actions/cartActions';
import './Header.scss';

const Header = () => {
  const { items, amount } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals(items));
  }, [items, dispatch]);

  return (
    <header className="header">
      <div className="wrapper header__wrapper">
        <div className="logo">
          <Link to="/" className="logo__link">
            <h2>Home</h2>
          </Link>
        </div>
        <nav className="nav">
          <ul className="nav__list">
            <li>
              <Link to="/admin" className="nav__link">
                Admin
              </Link>
            </li>
            <li>
              <Link to="#" className="cart-sign">
                <FaShoppingCart />
                <div className="cart-sign__badge">{amount}</div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
