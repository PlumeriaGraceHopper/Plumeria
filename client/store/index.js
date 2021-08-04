import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import allFlowersReducer from "./allFlowers";
import singleFlowerReducer from "./singleFlower";
import singleUserReducer from "./singleUser"; 


const reducer = combineReducers({
  auth,
  flowers: allFlowersReducer,
  flower: singleFlowerReducer,
  user: singleUserReducer, // cart is accessed through singleUser
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
