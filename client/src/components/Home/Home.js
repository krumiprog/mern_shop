import Products from '../Products/Products';
import Sidebar from '../Sidebar/Sidebar';
import './Home.scss';

const Home = () => {
  return (
    <div className="wrapper home__wrapper">
      <Products />
      <Sidebar />
    </div>
  );
};

export default Home;
