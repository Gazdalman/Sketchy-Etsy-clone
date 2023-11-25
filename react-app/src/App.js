/* BoilerPlate */
import React, { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";

/* Import Routes */
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
// import Reviews from "./components/Review";
import EditAccountPage from "./components/EditAccountPage";
import PastOrder from "./components/Profile/PastOrder";
import Reviews from "./components/Review";
import EditProduct from "./components/EditComponent";

/* Import thunks */
import { getAllProducts } from "./store/product";

function App() {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.session.user);
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
    </>
  );
}

export default App;
