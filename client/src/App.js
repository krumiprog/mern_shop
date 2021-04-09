import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Admin from './components/Admin/Admin';
import Header from './components/Header/Header';
import Home from './components/Home/Home';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
