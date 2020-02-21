import { createStore } from 'redux';

import {rootReducer,initialState} from './../app/reducers/index';

export const configureStore = () => createStore(rootReducer,initialState);

export default configureStore;