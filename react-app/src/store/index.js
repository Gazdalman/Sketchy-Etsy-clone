import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import review from "./review";
import users from "./users";
import allUsers from "./otherUsers";
import cart from "./cart";
import wishlist from "./wishlist";
import review from "./review";
import productsReducer from "./product";
import singleProductReducer from "./singleProduct";
import userProducts from "./userProducts";
import orderReducer from "./order";


const rootReducer = combineReducers({
  session,
  review,
  users,
  allUsers,
  cart,
  wishlist,
  review,
  products: productsReducer,
  requestedProduct: singleProductReducer,
  orders: orderReducer,
  userProducts
})

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
