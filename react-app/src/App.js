/* BoilerPlate */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";

/* Import Routes */
import Navigation from "./components/Navigation";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import Cart from "./components/ShoppingCart";
// import CheckOut from "./components/CheckOut";
import Wishlist from "./components/Wishlist";
import { getAllProducts } from "./store/product";
import ProductPage from "./components/ProductPage";
import ProductShow from "./components/ProductShow";
import Profile from "./components/Profile";
import Reviews from "./components/Review";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <ProductPage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/products/:productId">
            <ProductShow />
          </Route>
          <Route path="/wishlist">
            <Wishlist />
          </Route>
          <Route path="/profile/:userId">
            <Profile />
          </Route>
          <Route path="/reviews/:userId">
            <Reviews />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
