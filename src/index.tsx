import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import todoApp from './store/reducers';
import App from './components';

const store = createStore(todoApp);

let div = document.createElement('div');
document.body.appendChild(div);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    div
)