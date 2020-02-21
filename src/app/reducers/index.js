import {combineReducers} from 'redux';

import * as eventReducer from './eventReducer';

export const rootReducer = combineReducers({
    event : eventReducer.reducer
});

export const initialState = {
    event : eventReducer.initialState,
}