import { AppContainer } from 'react-hot-loader';
import 'babel-polyfill';
import 'isomorphic-fetch';
import {polyfill} from 'es6-promise';
polyfill();
import 'normalize.css';
import 'moment/locale/ru';
import moment from 'moment';
moment.locale('ru');
import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import Store from './store/configureStore';
import Root from './root';
// import routes from './routes';
const store = Store();

const renderWithHotReload = (RootElement)=> {
  render(
    <AppContainer>
      <Provider store={store}>
        <RootElement />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

renderWithHotReload(Root);

if (module.hot) {
  module.hot.accept('./root', () => {
    const RootElement = require('./root').default;
    renderWithHotReload(RootElement);
  });
}
