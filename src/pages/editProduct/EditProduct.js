import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
import ProductForm from '../../components/product/productForm/ProductForm'
import { getProducts, getSingleProduct, selectIsLoading, selectProduct, updateProduct } from '../../redux/features/product/productSlice'

const EditProduct = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isLoading = useSelector(selectIsLoading)

  const productEdit = useSelector(selectProduct)

  const [product, setProduct] = useState(productEdit)
  const [productImg, setProductImg] = useState('')
  const [previewImg, setPreviewImg] = useState(null)
  const [description, setDescription] = useState('')

  useEffect(() => {
    dispatch(getSingleProduct(id))
  }, [dispatch, id])

  useEffect(() => {
    setProduct(productEdit)

    setPreviewImg(
      productEdit && productEdit.image
        ? `${productEdit.image.filePath}`
        : null
    )

    setDescription(
      productEdit && productEdit.description
        ? productEdit.description
        : ''
    )
  }, [productEdit])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }

  const handleImgChange = (e) => {
    setProductImg(e.target.files[0])
    setPreviewImg(URL.createObjectURL(e.target.files[0]))
  }

  const saveProduct = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', product?.name)
    formData.append('category', product?.category)
    formData.append('quantity', product?.quantity)
    formData.append('price', product?.price)
    formData.append('description', description)
    if (productImg) {
      formData.append('image', productImg)
    }

    await dispatch(updateProduct({ id, formData }))
    await dispatch(getProducts())

    navigate('/dashboard')
  }

  return (
    <div>
      {isLoading && <Loader />}

      <h3 className='--mt'>Edit Product</h3>

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

export default EditProduct
