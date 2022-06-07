import React from 'react';
import ReactDOM from 'react-dom/client';

import 'semantic-ui-css/semantic.min.css'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  concat
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Auth from './utils/auth';

import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

// initialize Apollo Client
const httpLink = new HttpLink({ uri: '/graphql'}); // create endpoint link
const authLink = setContext( async (request, { headers }) => {
  const token = localStorage.getItem('id_token'); // get auth token from local storage if it exists
  console.log('token:', token);
  return { 
    headers: { 
      ...headers, 
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});
const client = new ApolloClient( // configure client with links
  { link: concat(authLink, httpLink), cache: new InMemoryCache() }
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <ApolloProvider client={client}> {/* connect Apollo Client*/}
      <App />
    </ApolloProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
