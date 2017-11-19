import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import appReducer from '../rootReducer/rootReducer';

let middlewares = [];
middlewares.push(thunk);

let composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let appMiddlewares = applyMiddleware(...middlewares);

const store = createStore(appReducer, composeEnhancer(appMiddlewares));

export { store };
