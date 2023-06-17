import ReactDOM from 'react-dom/client';
import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
//
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';


// ----------------------------------------------------------------------

const root = document.getElementById('root');

const rootElement = ReactDOM.createRoot(root);
rootElement.render(
    <GoogleOAuthProvider clientId="443548709065-cdrvaj8bjiu2knbdncakkgb037ftvtkv.apps.googleusercontent.com">
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </GoogleOAuthProvider>
);

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(<App />);


// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
