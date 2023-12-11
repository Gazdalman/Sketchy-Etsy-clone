import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOneProduct } from "../../store/singleProduct";
import Reviews from "../ProductReviews";
import { addItemToCart, updateQuantity } from "../../store/cart";
import { deleteProductThunk } from "../../store/product";
import OpenModalButton from "../OpenModalButton";
import DeleteProduct from "../DeleteModal/deleteModalProduct";
import "./index.css";

const ProductShow = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const history = useHistory();
  //const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.session.user);
  const product = useSelector((state) => state.requestedProduct);

  const images = product ? product.images : null
  const imgLen = images ? images.length : 0
  const [revAvg, setRevAvg] = useState(0);
  const [imgNum, setImgNum] = useState(-1)
  const [numReviews, setNumReviews] = useState(0);
  const [renderSwitch, setRenderSwitch] = useState(true)

  console.log('images', imgLen);
  useEffect(() => {
    const res = dispatch(getOneProduct(productId));
    if (res.broken) {
      history.replace("/not-found");
    }
    setImgNum(-1)
    console.log("object");
  }, [dispatch, renderSwitch]);


  // useEffect(() => {
  //   if (product && product.ProductImages && product.ProductImages.length > 0) {
  //     setPreviewImage({ ...(product.ProductImages.find((image) => image.preview === true)) });
  //   }

  // }, [product]);

  // if (!isLoaded && rerendered && !product) {
  //   history.replace("/not-found")
  // }

  const edit = (e) => {
    e.preventDefault();
    return history.push(`/products/${productId}/edit`);
  };

  const changeImage = (direction) => {
    let num = imgNum
    if (direction == 'up' && num < - 1) {
      num++
      setImgNum(num)
      console.log(imgNum);
    } else if (direction =='down' && num > -1) {
      num--
      setImgNum(num)
      console.log(imgNum);
    }
  }

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
      </h3>f
      <div id="product-images-container">
        <img
          id="preview-image"
          src={imgNum == -1 ? product.preview  : images[imgNum].url }
          alt={`Product ${product.id}`}
        />
        <div id="image-buttons">
          <div id="change-photo-down" disabled={imgNum == -1} onClick={() => changeImage('down')}><i className="fa-solid fa-arrow-right fa-rotate-180"></i></div>
          <div id="change-photo-up" disabled={imgNum >= imgLen} onClick={() => changeImage('up')}><i className="fa-solid fa-arrow-right"></i></div>
        </div>

        {/* <span id="none-prev"> */}
        {/* {product.images.length > 0 &&
            product.images.map((image) => (
              <img
                className="product-img"
                id={`img-${imgNum++}`}
                key={image.id}
                src={image.url}
                alt={`Product ${image.id}`}
              />
            ))} */}
        {/* </span> */}
      </div>
      <h4 id="product-owner">Sold by {product?.seller}</h4>
      <div id="product-details-lower">
        <h4 id="prod-cat">Category: {product.category}</h4>
        <p id="product-description">{product.description}</p>
        {/* <CallOutBox numReviews={numReviews} avgRating={revAvg.toFixed(1)} product={product} /> */}
      </div>
      {user && user.id != product.seller_id && (
        <button onClick={(e) => handleClick(e, product)}>Add to cart</button>
      )}
      {user && user.id == product.seller_id && (
        <button onClick={edit}>Edit Product</button>
      )}
      {/* <ReviewArea setRevAvg={setRevAvg} numRevs={setNumReviews} revAvg={revAvg} product={product} /> */}
      <Reviews product={product} />
    </div>
  ) : product && !product.seller_id ? (
    <h1>Not Available</h1>
  ) : null;
};

export default ProductShow;
