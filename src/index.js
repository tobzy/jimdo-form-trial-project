import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

let enhancer;
const _createStore = (r) => enhancer ? createStore(reducer, enhancer) : createStore(reducer);
const store = applyMiddleware(thunk)(_createStore)(reducer);

ReactDOM.render(
    <Provider store={store} >
        <App />
    </Provider>,
    document.getElementById('root')
);
