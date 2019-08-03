import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import App from './components/App';
import GraphQLApp from './components/GraphQLApp';

// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(reducers, composeEnhancer(applyMiddleware(thunk)));

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.querySelector('#root')
// );

ReactDOM.render(<GraphQLApp />, document.querySelector('#root'));
