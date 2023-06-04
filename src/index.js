import React from 'react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './components/GlobalStyle';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from '~/utils/store';
import * as serviceWorker from '~/serviceWorker';
// import { productsFetch } from './slices/productSlice';

const container = document.getElementById('root');
const root = createRoot(container);
// store.dispatch(productsFetch());
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <GlobalStyle>
                <App />
            </GlobalStyle>
        </BrowserRouter>
    </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorker.unregister();
