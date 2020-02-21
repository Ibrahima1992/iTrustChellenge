import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Root from './root';
import * as serviceWorker from './serviceWorker';

import {configureStore} from './store/configure-store';
import { Provider } from 'react-redux';

const store = configureStore();

ReactDOM.render(
    <Provider store = {store}>
        <Root />
    </Provider>
    ,document.getElementById('root')
);

serviceWorker.unregister();
