import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../store/product";
import { useHistory } from "react-router-dom";

const ProductFormPage = ({ type, product }) => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory
  const [name, setName] = useState(type == 'edit' ? product.name : '')
  const [category, setCategory] = useState(type == 'edit' ? product.categories : '')
  const [price, setPrice] = useState(type == 'edit' ? product.price : '')
  const [description, setDescription] = useState(type == 'edit' ? product.description : '')
  const [imageLoading, setImageLoading] = useState(false)
  const [prevImg, setPrevImg] = useState('')
  const [img1, setImg1] = useState('')
  const [img2, setImg2] = useState('')
  const [img3, setImg3] = useState('')
  const [img4, setImg4] = useState('')
  const [img5, setImg5] = useState('')
  const [unitsAvailable, setUnitsAvailable] = useState(type == 'edit' ? product.units_available : null)
  const [isLoaded, setIsLoaded] = useState(false)

  const removeImgs = (e) => {
    if (!e.target.value) {
      setImg1('')
      setImg2('')
      setImg3('')
      setImg4('')
      setImg5('')
    }
    setPrevImg(e.target.files[0])

  }
  const checkPrice = (price) => {
    if (price < 1) {
      setPrice(1)
      return 1;
    }
    return price;
  }

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    product = {
      name,
      description,
      category,
      price,
      units_available: unitsAvailable,
      preview: prevImg
    }


    formData.append('name', name)
    formData.append('description', description)
    formData.append('category', category)
    formData.append('price', price)
    formData.append('units_available', unitsAvailable)
    formData.append('preview', prevImg)

    let num = 1
    for (const img of [img1, img2, img3, img4, img5]) {
      if (img) {
        formData.append(`img${num}`, img)
      }
      num += 1
    }

    setImageLoading(true);
    const id = await dispatch(createProduct(formData))
    return history.push(`/products/${id}`)
  }

  return !imageLoading ? (
    <div>
      <h1>What Are Yuh Sellin'?</h1>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <span>
          Product Name*
          <input
            type="text"
            placeholder="Name must be 3-50 characters"
            value={name}
            onChange={removeImgs}
          />
        </span>
        <span>
          Product Category*
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select...</option>
            <option value="Jackets and Coats">Jackets and Coats</option>
            <option value="Shirts and Tops">Shirts and Tops</option>
            <option value="Bottoms and Pants">Bottoms and Pants</option>
            <option value="Kitchen/Home">Kitchen/Home</option>
            <option value="Bathroom">Bathroom</option>
            <option value="Gardening">Gardening</option>
            <option value="Other">Other</option>
            {/* Add more options as needed */}
          </select>
        </span>
        <span>
          Description*
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder=
            {'10 or more characters \n(Add any tags at the bottom with an "#" before it)'}
          />
        </span>
        {type != 'edit' && (
          <>
            <span>
              Preview Image*
              <input
                type="file"
                onChange={removeImgs}
                accept="image/*"
              />
            </span>
            {prevImg && <span>
              Add Image
              <input
                type="file"
                onChange={e => setImg1(e.target.files[0])}
                accept="image/*"
              />
            </span>}
            {(prevImg && img1) && <span>
              Add Image
              <input
                type="file"
                onChange={e => setImg2(e.target.files[0])}
                accept="image/*"
              />
            </span>}
            {(prevImg && img2) && <span>
              Add Image
              <input
                type="file"
                onChange={e => setImg3(e.target.files[0])}
                accept="image/*"
              />
            </span>}
            {(prevImg && img3) && <span>
              Add Image
              <input
                type="file"
                onChange={e => setImg4(e.target.files[0])}
                accept="image/*"
              />
            </span>}
            {(prevImg && img4) && <span>
              Add Image
              <input
                type="file"
                onChange={e => setImg5(e.target.files[0])}
                accept="image/*"
              />
            </span>}
          </>
        )}
        <span>
          Price
          <input
            type="number"
            step=".01"
            value={checkPrice(price)}
            placeholder="$USD"
            onChange={e => setPrice(e.target.value)}
          />
        </span>
        <span>
          Units Available
          <input
            type="number"
            min={1}
            value={unitsAvailable}
            placeholder="# of units you have"
            onChange={(e) => setUnitsAvailable(e.target.value)}
          />
        </span>
        <button type="submit">Create Product</button>
      </form>

    </div>

  ) : (
    <h1>We loading...</h1>
  )
}

export default ProductFormPage
