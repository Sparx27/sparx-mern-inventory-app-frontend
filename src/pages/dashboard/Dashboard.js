import useRedirectWhenLogout from '../../customHook/useRedirectWhenLogout'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice'
import { useEffect } from 'react'
import { getProducts } from '../../redux/features/product/productSlice'
import ProductList from '../../components/product/productList/ProductList'
import ProductSummary from '../../components/product/productSummary/ProductSummary'
import { toast } from 'react-toastify'

const Dashboard = () => {
  useRedirectWhenLogout('/login')
  const dispatch = useDispatch()

  const isLoggedIn = useSelector(selectIsLoggedIn)
  const {
    products,
    isLoading,
    isError,
    message
  } = useSelector((state) => state.product)

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProducts())
    }

    if (isError) {
      toast.error(message)
    }
  }, [isLoggedIn, isError, message, dispatch])

  return (
    <div>
      <ProductSummary products={products} />
      <ProductList products={products} isLoading={isLoading} />
    </div>
  )
}

export default Dashboard
