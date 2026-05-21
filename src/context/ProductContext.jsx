import {
    useState,
    useEffect,
    useCallback,
    createContext,
    useContext,
} from 'react'
import axios from 'axios'

axios.defaults.withCredentials = true

const API_URL = import.meta.env.VITE_BACKEND_URL + '/products'

export const ProductContext = createContext({})

export const ProductContextProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const [productsLoading, setproductsLoading] = useState(true)
    const [product, setProduct] = useState({})
    const [productLoading, setProductLoading] = useState(true)
    const [error, setError] = useState(null)

    // * funcion para traer todos los productos al front
    const getProducts = useCallback(async () => {
        try {
            const response = await axios.get(API_URL)
            const data = Array.isArray(response.data)
                ? response.data
                : response.data?.products || response.data?.data || []
            setProducts(data)
        } catch (error) {
            setError(error.message || 'Error al obtener los productos')
        } finally {
            setproductsLoading(false)
        }
    }, [])

    //* funcion para actulizar productos en en panel de administracion
    const updateProduct = useCallback(async (id, data) => {
        const cleanData = {
            name: data.name,
            description: data.description,
            price: Number(data.price),
            stock: Number(data.stock),
            imageUrl: data.imageUrl,
        }
        try {
            const response = await axios.put(API_URL + `/${id}`, cleanData, {
                withCredentials: true,
            })
            if (response.status === 200) {
                // * actualizar el producto individual
                setProduct(response.data)
                //* actualizar el producto en la lista de productos
                setProducts((prevProducts) =>
                    prevProducts.map((p) => (p._id === id ? response.data : p)),
                )
                return {
                    success: true,
                    message: 'Producto actualizado correctamente',
                }
            }
        } catch (error) {
            const serverMsg =
                error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                'Error al actualizar el producto'
            setError(serverMsg)
            return {
                success: false,
                message: serverMsg,
            }
        } finally {
            setproductsLoading(false)
            setProductLoading(false)
        }
    }, [])

    //* funcion para crear un producto
    const createProduct = useCallback(async (data) => {
        const cleanData = {
            name: data.name,
            description: data.description,
            price: Number(data.price),
            stock: Number(data.stock),
            imageUrl: data.imageUrl,
        }
        try {
            const response = await axios.post(API_URL, cleanData, {
                withCredentials: true,
            })
            if (response.status === 201) {
                setProducts((prevProducts) => [
                    ...prevProducts,
                    response.data.product,
                ])
                return {
                    success: true,
                    message: response.data.message,
                }
            }
        } catch (error) {
            const serverMsg =
                error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                'Error al crear el producto'
            setError(serverMsg)
            return {
                success: false,
                message: serverMsg,
            }
        } finally {
            setProductLoading(false)
        }
    }, [])

    //* funcion para borrar un producto
    const deleteProduct = useCallback(async (id) => {
        try {
            const response = await axios.delete(API_URL + `/${id}`, {
                withCredentials: true,
            })
            if (response.status === 200) {
                setProducts((prevProducts) =>
                    prevProducts.filter((p) => p._id !== id),
                )
                return {
                    success: true,
                    message: 'Producto eliminado correctamente',
                }
            }
        } catch (error) {
            setError(error.message || 'Error al eliminar el producto')
            return {
                success: false,
                message: 'Error al eliminar el producto',
            }
        } finally {
            setproductsLoading(false)
        }
    }, [])

    //* funcion para obtener un producto por id
    const getProductById = useCallback(async (id) => {
        setProductLoading(true)
        setProduct({})
        try {
            const response = await axios.get(`${API_URL}/${id}`)
            setProduct(response.data)
        } catch (error) {
            setError(error.message || 'Error al obtener el producto')
        } finally {
            setProductLoading(false)
        }
    }, [])

    useEffect(() => {
        getProducts()
    }, [getProducts])

    const value = {
        products,
        product,
        productsLoading,
        productLoading,
        error,
        getProducts,
        getProductById,
        updateProduct,
        createProduct,
        deleteProduct,
    }
    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    )
}
//* hook personalizado para traer valores (values)
export const useProduct = () => useContext(ProductContext)
