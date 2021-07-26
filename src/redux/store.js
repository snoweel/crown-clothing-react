import {createStore,applyMiddleware} from "redux";
import {persistStore} from "redux-persist";

import logger from 'redux-logger';

import rootReducer from './root-reducer';
import thunk from "redux-thunk";
const middleware = [thunk];

// push logger in middleware only if running in development/local env
if(process.env.NODE_ENV==='development'){
    middleware.push(logger);
}

export const store = createStore(rootReducer,applyMiddleware(...middleware));
export const persistor = persistStore(store);
export default {store,persistor };
