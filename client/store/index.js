import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import allFlowersReducer from "./allFlowers";
import singleFlowerReducer from "./singleFlower";
import cartReducer from "./cart"; 


const reducer = combineReducers({
  auth,
  flowers: allFlowersReducer,
  flower: singleFlowerReducer,
  cart: cartReducer, 
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
