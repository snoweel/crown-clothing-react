import {createStore,applyMiddleware} from "redux";
import {persistStore} from "redux-persist";
import {fetchCollectionStart} from "./shop/shop.sagas";
import logger from 'redux-logger';
import createSagaMiddleware from "redux-saga";
import rootReducer from './root-reducer';
const sagaMiddleware = createSagaMiddleware()



// import thunk from "redux-thunk";
// const middleware = [thunk];
const middleware = [sagaMiddleware];

// push logger in middleware only if running in development/local env
if(process.env.NODE_ENV==='development'){
    middleware.push(logger);
}

export const store = createStore(rootReducer,applyMiddleware(...middleware));
sagaMiddleware.run(fetchCollectionStart);
export const persistor = persistStore(store);
export default {store,persistor };
