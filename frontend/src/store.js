import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import testReducer from './reducers/testReducer'

const rootReducer = combineReducers({
    test: testReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;