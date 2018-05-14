import { createStore, applyMiddleware, compose } from 'redux';
import * as reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

import rootReducer from '../reducers/root-reducer';

export default function configureStore(initialState?: any) {
    // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
    // See https://github.com/rackt/redux/releases/tag/v3.1.0
    // const store = createStore(rootReducer, initialState, enhancer);

    console.log(process.env.NODE_ENV);
    const composeEnhancers = (process.env.NODE_ENV === 'production') ? compose : (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    var middleware = (process.env.NODE_ENV === 'production') ? [thunk] : [thunk, reduxImmutableStateInvariant()];

    const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middleware)));
    return store;
};