/* BoilerPlate */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import { authenticate } from "./store/session";

/* Import Routes */
/* Landing Page*/
import LandingPage from "./components/LandingPage";
import Navigation from "./components/Navigation";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import Cart from "./components/ShoppingCart";
import CheckOut from "./components/CheckOut";
import Wishlist from "./components/Wishlist";
import ProductPage from "./components/ProductPage";
import ProductShow from "./components/ProductShow";
import ProductFormPage from "./components/ProductForm";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
import EditAccountPage from "./components/EditAccountPage";
import PastOrder from "./components/Profile/PastOrder";
import Reviews from "./components/Review";
import EditProduct from "./components/EditComponent";

/* Import thunks */
import { getAllProducts } from "./store/product";
import ProductShowing from "./components/ProductShowing";

function App() {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.session.user);
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {location.pathname === "/" ? null : <Navigation isLoaded={isLoaded} />}
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/home">
            <ProductPage />
          </Route>
          <Route exact path="/login">
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/products/:productId">
            <ProductShow />
          </Route>
          <Route exact path="/new_product">
            <ProductFormPage />
          </Route>
          <Route exact path="/products/:productId/edit">
            <EditProduct />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/wishlist">
            <Wishlist />
          </Route>
          <Route exact path="/profile/:userId">
            <Profile />
          </Route>
          <Route path="/:userId/reviews/">
            <Reviews />
          </Route>
          <Route exact path="/editAccount">
            <EditAccountPage />
          </Route>
          <Route exact path="/checkout">
            <CheckOut />
          </Route>
          <Route exact path="/past-order">
            <PastOrder />
          </Route>
          <Route>"404: Route doesn't exist"</Route>
        </Switch>
      )}
      {location.pathname === "/" ? null : <Footer isLoaded={isLoaded} />}
    </>
  );
}

export default App;
