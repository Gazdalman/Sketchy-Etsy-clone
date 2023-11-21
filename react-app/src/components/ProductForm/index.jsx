import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductFormPage = ({ type, product }) => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch()
  const [name, setName] = useState(type == 'edit' ? product.name : '')
  const [category, setCategory] = useState(type == 'edit' ? product.categories : '')
  const [price, setPrice] = useState(type == 'edit' ? product.price : 0)
  const [description, setDescription] = useState(type == 'edit' ? product.description : '')
  const [prevImg, setPrevImg] = useState('')
  const [img1, setImg1] = useState('')
  const [img2, setImg2] = useState('')
  const [img3, setImg3] = useState('')
  const [img4, setImg4] = useState('')
  const [img5, setImg5] = useState('')
  const [unitsAvailable, setUnitsAvailable] = useState(type == 'edit' ? product.units_available : 0)
  const [isLoaded, setIsLoaded] = useState(false)

  const checkPrice = (price) => {
    if (price < 0.01) {
      setPrice(.01)
      return 0.01;
    }
    return price;
  }

  let starterKey = -1
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div>
      <h1>What Are Yuh Sellin'?</h1>
      <form>
        <span>
          Product Name*
          <input
            type="text"
            placeholder="Name must be 3-50 characters"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </span>
        <span>
          Product Categories*
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
                onChange={e => setPrevImg(e.target.files[0])}
              />
            </span>
            {prevImg && <span>
              Add Image
              <input
                type="file"
                onChange={e => setImg1(e.target.files[0])}
              />
            </span>}
            {(prevImg && img1) && <span>
              Add Image
              <input
                type="file"
                onChange={e => setImg2(e.target.files[0])}
              />
            </span>}
            {(prevImg && img2) && <span>
              Add Image
              <input
                type="file"
                onChange={e => setImg3(e.target.files[0])}
              />
            </span>}
            {(prevImg && img3) && <span>
              Add Image
              <input
                type="file"
                onChange={e => setImg4(e.target.files[0])}
              />
            </span>}
            {(prevImg && img4) && <span>
              Add Image
              <input
                type="file"
                onChange={e => setImg5(e.target.files[0])}
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
            onChange={e => setPrice(e.target.value)}
          />
        </span>

      </form>

    </div>

  )
}

export default ProductFormPage
