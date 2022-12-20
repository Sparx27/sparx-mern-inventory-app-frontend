import { useState } from 'react'
import ProductForm from '../../components/product/productForm/ProductForm'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct, selectIsLoading } from '../../redux/features/product/productSlice'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
import { toast } from 'react-toastify'

const initialState = {
  name: '',
  category: '',
  quantity: '',
  price: ''
}

const AddProduct = () => {
  const [product, setProduct] = useState(initialState)
  const [productImg, setProductImg] = useState('')
  const [previewImg, setPreviewImg] = useState('')
  const [description, setDescription] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isLoading = useSelector(selectIsLoading)

  const { name, category, quantity, price } = product

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }

  const handleImgChange = (e) => {
    setProductImg(e.target.files[0])
    setPreviewImg(URL.createObjectURL(e.target.files[0]))
  }

  const generateSKU = (category) => {
    const letter = category.slice(0, 3).toUpperCase()
    const number = Date.now()
    const sku = letter + '-' + number
    return sku
  }

  const saveProduct = async (e) => {
    e.preventDefault()

    if (!name || !category || !quantity || !price || !description) {
      return toast.error('Please fill all fields')
    }

    const formData = new FormData()
    formData.append('name', name)
    formData.append('sku', generateSKU(category))
    formData.append('category', category)
    formData.append('quantity', quantity)
    formData.append('price', price)
    formData.append('image', productImg)
    formData.append('description', description)

    await dispatch(createProduct(formData))

    navigate('/dashboard')
  }

  return (
    <div>
      {isLoading && <Loader />}

      <h3 className='--mt'>Add New Product</h3>

      <ProductForm
        product={product}
        productImg={productImg}
        previewImg={previewImg}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleImgChange={handleImgChange}
        saveProduct={saveProduct}
      />
    </div>
  )
}

export default AddProduct
