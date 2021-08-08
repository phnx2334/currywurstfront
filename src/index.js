import React from 'react';
import ReactDOM from 'react-dom';
import { createStore,combineReducers,applyMiddleware,compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import App from './App';
import reportWebVitals from './reportWebVitals';
import employeesReducer from './store/reducers/employeesReducer'
import orderReducer from './store/reducers/orderReducer'
import cookingPlanReducer from './store/reducers/cookingPlanReducer'
import recipesReducer from './store/reducers/recipesReducer'
import ingredientsReducer from './store/reducers/ingredientsReducer'
import menuItemsReducer from './store/reducers/menuItemsReducer'
import './index.css';

//Combine all the available reducers
const rootReducer = combineReducers({
  employees:employeesReducer,
  orders:orderReducer,
  cookingPlan:cookingPlanReducer,
  recipes:recipesReducer,
  ingredients:ingredientsReducer,
  menuItems:menuItemsReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

//Use thunk to allow execution of async functions inside the actions
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
