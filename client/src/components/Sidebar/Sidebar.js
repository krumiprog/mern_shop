import { useDispatch, useSelector } from 'react-redux';
import { Fade } from 'react-reveal';
import { AiOutlineDelete } from 'react-icons/ai';
import {
  clearCart,
  getTotals,
  removeFromCart,
} from '../../store/actions/cartActions';

import './Sidebar.scss';

const Sidebar = () => {
  const { items, total } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleClick = item => {
    dispatch(removeFromCart(items, item));
    dispatch(getTotals(items));
  };

  return (
    <div className="sidebar">
      {items.length > 0 && (
        <>
          {items.map(item => (
            <Fade left>
              <div key={item._id} className="side-item">
                <img src={`/images/${item.image}`} alt={item.title} />
                <div className="side-item__info">
                  <div className="side-item__row">
                    <h2>{item.title}</h2>
                    <button
                      className="btn-remove"
                      onClick={() => handleClick(item)}
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                  <div className="side-item__row">
                    <div>Amount: {item.amount}</div>
                    <div>Price: $ {item.price}</div>
                  </div>
                </div>
              </div>
            </Fade>
          ))}
          <div className="total-price">
            <h3>Total: $ {total}</h3>
            <button className="btn-clear" onClick={() => dispatch(clearCart())}>
              Clear
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
