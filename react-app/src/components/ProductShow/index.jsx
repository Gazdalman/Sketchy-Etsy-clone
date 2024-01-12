import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOneProduct } from "../../store/singleProduct";
import Reviews from "../ProductReviews";

// import { deleteProductThunk } from "../../store/product";
import OpenModalButton from "../OpenModalButton";
// import DeleteProduct from "../DeleteModal/deleteModalProduct";
import ConfirmAdd from "../ConfirmAddTo";
import "./index.css";

const ProductShow = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const history = useHistory();
  // const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.session.user);
  const product = useSelector((state) => state.requestedProduct);

  const images = product ? product.images : null;
  const imgLen = images ? images.length : 0;
  const [revAvg, setRevAvg] = useState(0);
  const [imgNum, setImgNum] = useState(-1);
  const [numReviews, setNumReviews] = useState(0);
  const [renderSwitch, setRenderSwitch] = useState(true);

  useEffect(() => {
    const res = dispatch(getOneProduct(productId));
    if (res.broken) {
      history.replace("/not-found");
    }
    setImgNum(-1);
    // console.log("object");
  }, [dispatch, renderSwitch]);

  const edit = (e) => {
    e.preventDefault();
    return history.push(`/products/${productId}/edit`);
  };

  const handleClick = (e, product) => {
    e.preventDefault();
    const message = "Item added to your shopping cart! 😊";
    alert(message);
    // const prodId = prod.id;
    // if (cart[prodId]) {
    //   dispatch(updateQuantity(prodId, "inc"));
    // } else {
    // dispatch(addItemToCart(prodId));
    // }
    let currCart = null;

    currCart = localStorage.getItem(`${user.id}Cart`);

    let updateCart = {};
    if (currCart) {
      const cart = JSON.parse(currCart);

      if (cart[product.id]) {
        cart[product.id].quantity++;
        updateCart = { ...cart };
      } else {
        product.quantity = 1;
        updateCart = { ...cart };
        updateCart[product.id] = product;
      }
    } else {
      product.quantity = 1;
      updateCart[product.id] = product;
    }

    localStorage.setItem(`${user.id}Cart`, JSON.stringify(updateCart));
  };

  return Object.keys(product).length > 0 &&
    +product.id === +productId &&
    +product.seller_id ? (
    <div id="product-show">
      <h1 id="product-name">{product.name}</h1>
      <h3>
        ${product.price} | Product #:{product.id} |{" "}
        {+product.units_available > 0
          ? `${product.units_available} available`
          : "SOLD OUT"}
      </h3>
      <div id="product-images-container">
        <img
          id="preview-image"
          src={product.preview}
          alt={`Product ${product.id}`}
        />
        <span id="none-prev">
          {/* {product.ProductImages.length > 0 && product.ProductImages.map(image => (
            image.id !== previewImage.id ? (
              <img className="product-img" id={`img-${imgNum++}`} key={image.id} src={image.url} alt={`Product ${image.id}`} />
            ) : null
          ))} */}
        </span>
      </div>
      <h4 id="product-owner">Sold by {product?.seller}</h4>
      <div id="product-details-lower">
        <p id="product-description">{product?.description}</p>
        {/* <CallOutBox numReviews={numReviews} avgRating={revAvg.toFixed(1)} product={product} /> */}
      </div>
      {user && user.id != product.seller_id && (
        <OpenModalButton
          modalClasses={["add-button"]}
          buttonText="Add to Cart"
          modalComponent={<ConfirmAdd product={product} user={user} />}
        />
      )}
      {/* <ReviewArea setRevAvg={setRevAvg} numRevs={setNumReviews} revAvg={revAvg} product={product} /> */}
      <Reviews product={product} />
    </div>
  ) : product && !product.seller_id ? (
    <h1>Loading...</h1>
  ) : null;
};

export default ProductShow;
