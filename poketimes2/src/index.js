import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(...middlewares));
const middlewares = [thunk];

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
);
