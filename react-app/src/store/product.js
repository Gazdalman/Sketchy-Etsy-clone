
const POPULATE_PRODUCTS = 'product/populateProducts';
const ADD_IMAGES = 'product/images'
const CHANGE_PRODUCTS = 'product/changeProducts';
const DELETE_PRODUCT = 'product/deleteProduct';

const populateProducts = (products) => {
  return {
    type: POPULATE_PRODUCTS,
    products
  }
}

const changeProducts = (product) => {
  return {
    type: CHANGE_PRODUCTS,
    product
  }
}

const deleteProduct = (productId) => {
  return {
    type: DELETE_PRODUCT,
    productId
  }
}

export const getAllProducts = () => async dispatch => {
  const res = await fetch('/api/products');

  if (res.ok) {
    const products = await res.json();
    dispatch(populateProducts(products))
    return products
  }
}

export const editProduct = (product, productId, images) => async dispatch => {
  const res = await fetch(`/api/products/${productId}`, {
    method: 'PUT',
    body: {
      ...product
    }
  })

  // if (res.ok) {
  //   const product = await res.json()
  //   const newImagesPromise = await fetch(`/api/products/${product.id}/images`, {
  //     method: 'PUT',
  //     body: JSON.stringify({
  //       images
  //     }),
  //     user: {
  //       id: product.seller_id
  //     }
  //   })
  //   const allImages = newImagesPromise.json()

  //   return allImages
  // }

  return res.json();
}

export const createProduct = (product) => async dispatch => {
  const res = await fetch('/api/products/form', {
    method: 'POST',
    body: {...product}
  });

  if (res.ok) {
    const product = await res.json();
    dispatch(changeProducts(product))
    return product
  }

  return res.json()
}

export const addImages = (productId, images) => async dispatch => {
  await images.forEach(image => {
    fetch(`/api/products/${productId}/images`, {
      method: 'POST',
      body: {
        ...image
      }
    })
  })
  return null
}

export const deleteProductThunk = (productId) => async dispatch => {
  const res = await fetch(`/api/products/${productId}`, {
    method: "DELETE"
  });
  dispatch(deleteProduct(productId))
  return res
}

let newState
// let allProducts
const productsReducer = (state = {}, action) => {
  switch (action.type) {
    case POPULATE_PRODUCTS:
      newState = {};
      action.products.forEach(product => {
        newState[product.id] = product;
      });
      // allProducts = {...newState}
      return newState;

    case CHANGE_PRODUCTS:
      newState = { ...state, [action.product.id]: action.product }
      return newState

    case ADD_IMAGES:
      return { ...state }

    case DELETE_PRODUCT:
      newState = { ...state }
      delete newState[action.productId]
      return newState

    default:
      return state
  }
}

export default productsReducer;
