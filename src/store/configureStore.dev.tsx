import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from '../reducers/root-reducer';

// Middleware you want to use in production:
// const enhancer = applyMiddleware(sagaMiddleware);

export default function configureStore(initialState: any) {
    // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
    // See https://github.com/rackt/redux/releases/tag/v3.1.0
    // const store = createStore(rootReducer, initialState, enhancer);
    const store = createStore(rootReducer, initialState);

    return store;
};