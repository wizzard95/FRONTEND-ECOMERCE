import { createContext, useState, useEffect, useContext } from 'react'
import { useUser } from './UserContext'
import {
    addToCartService,
    getCartService,
    updateCartService,
    removeCartService,
    clearCartService,
    getCartTotalService,
} from '../services/cartServices'
import toast from 'react-hot-toast'

export const CartContext = createContext({})

export const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)
    const [itemsQuantity, setItemsQuantity] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [loading, setLoading] = useState(true)

    const {
        userInfo,
        getUserId,
        isAuthenticated,
        loading: userLoading,
    } = useUser()

    //* funcion para cargar el carrito desde el localStorage
    const loadLocalCart = () => {
        try {
            const localCart = localStorage.getItem('cart')
            return localCart ? JSON.parse(localCart) : []
        } catch (error) {
            console.error('Error al cargar el carrito local: ', error)
            return []
        }
    }
    //* funcion para guardar el carrito en el localStorage
    const saveLocalCart = (cartItems) => {
        try {
            localStorage.setItem('cart', JSON.stringify(cartItems))
        } catch (error) {
            console.error('Error al guardar el carrito local', error)
        }
    }
    //* funcion para cargar el carrito (backend o localstorage)
    const loadCart = async () => {
        if (isAuthenticated()) {
            // * usuario autenticado: cargar desde backend
            try {
                setLoading(true)
                const userId = getUserId()
                const response = await getCartService(userId)

                //* transformar los datos del backend al formato del front
                console.log('Carrito obtenido con éxito:', response.cart)

                const cartItems =
                    response.cart?.products?.map((product) => ({
                        _id: product.productId._id,
                        name: product.productId.name,
                        price: product.productId.price,
                        imageUrl: product.productId.imageUrl,
                        description: product.productId.description,
                        stock: product.productId.stock,
                        quantity: product.quantity,
                    })) || []

                setCart(cartItems)
            } catch (error) {
                //* si falla el backend, cargar desde el
                const localCart = loadLocalCart()
                setCart(localCart)
            } finally {
                setLoading(false)
            }
        } else {
            //* usuario no autenticado: cargar desde localstorage
            const localCart = loadLocalCart()
            setCart(localCart)
        }
    }
    //* funcion para sincronizar carrito local con el backend
    const syncCartWithBackend = async () => {
        const localCart = loadLocalCart()

        if (localCart.length > 0 && isAuthenticated()) {
            try {
                setLoading(true)
                const userId = getUserId()

                //* agregar cada producto del carrito local al backend
                for (const item of localCart) {
                    try {
                        await addToCartService(userId, item._id, item.quantity)
                    } catch (error) {
                        console.error(
                            `Error al sicronizar producto ${item.name}`,
                            error,
                        )
                    }
                }
                //* limpiar localstorage despues de sincronizar
                localStorage.removeItem('cart')

                //* reacargar carrito desde el backend
                await loadCart()
                toast.success(`Carrito sincronizado con exito`)
            } catch (error) {
                console.error('Error al sincronizar carrito', error)
            } finally {
                setLoading(false)
            }
        }
    }

    //* añadir producto al carrito
    const addToCart = async (product, quantity = 1) => {
        if (isAuthenticated()) {
            //* si el usuario está autenticado / Usar el backend
            try {
                setLoading(true)
                const userId = getUserId()
                await addToCartService(userId, product._id, quantity)

                //* recargar el carrito despues de agregar
                await loadCart()
                toast.success('Producto agregador al carrito')
            } catch (error) {
                console.error('Error al agregar producto al carrito', error)
                toast.error('Error al agregar producto al carrito')
            } finally {
                setLoading(false)
            }
        } else {
            //* usuario no autenticado: usar localstorage
            try {
                const currentCart = [...cart]
                const existingIndex = currentCart.findIndex(
                    (item) => item._id === product._id,
                )
                if (existingIndex > -1) {
                    //* producto ya existe, actualizar cantidad
                    currentCart[existingIndex].quantity += quantity
                } else {
                    //* nuevo producto: agregar
                    currentCart.push({ ...product, quantity })

                    setCart(currentCart)
                    saveLocalCart(currentCart)
                    toast.success('Producto agregado al carrito')
                }
            } catch (error) {
                console.error(
                    'Error al agregar producto al carrito local: ',
                    error,
                )
                toast.error('Error al agregar producto al carrito')
            }
        }
    }

    //* eliminar producto del carrito
    const removeFromCart = async (productId) => {
        if (isAuthenticated()) {
            try {
                setLoading(true)
                const userId = getUserId()
                await removeCartService(userId, productId)

                //* recargar el carrito despues de eliminar
                await loadCart()
                toast.success('Producto eliminado del carrito')
            } catch (error) {
                console.error('Error al eliminar producto del carrito: ', error)
                toast.error('Error al eliminar producto del carrito')
            } finally {
                setLoading(false)
            }
        } else {
            try {
                const currentCart = cart.filter(
                    (item) => item._id !== productId,
                )
                setCart(currentCart)
                saveLocalCart(currentCart)
                toast.success('Producto eliminado del carrito')
            } catch (error) {
                console.error(
                    'Error al eliminar producto del carrito local: ',
                    error,
                )
                toast.error('Error al eliminar producto del carrito local')
            }
        }
    }

    //* actualizar cantidad de productos en el carrito
    const updateQuantity = async (productId, newQuantity) => {
        if (newQuantity < 1) {
            toast.error('La cantidad deber ser al menos 1')
            return
        }
        if (isAuthenticated()) {
            try {
                setLoading(true)
                const userId = getUserId()
                await updateCartService(userId, productId, newQuantity)

                //* recargar el carrito despues de actualizar
                await loadCart()
                toast.success('Cantidad actualizada')
            } catch (error) {
                console.error('Error al actualizar la cantidad', error)
                toast.error('Error al actualizar la cantidad')
            }
        } else {
            try {
                const currentCart = cart.map((item) =>
                    item._id === productId
                        ? { ...item, quantity: newQuantity }
                        : item,
                )
                setCart(currentCart)
                saveLocalCart(currentCart)
                toast.success('Cantidad actulizada')
            } catch (error) {
                console.error('Error al actualizar la cantidad local', error)
                toast.error('Error al actualizar la cantidad')
            }
        }
    }

    //* Limpiar el carrito
    const clearCart = async () => {
        if (isAuthenticated()) {
            try {
                setLoading(true)
                const userId = getUserId()
                await clearCartService(userId)

                //* limpiar el estado local
                setCart([])
                toast.success('Carrito vacio')
            } catch (error) {
                console.error('Error al vaciar el carrito', error)
                toast.error('Error al vaciar el carrito')
            } finally {
                setLoading(false)
            }
        } else {
            try {
                setCart([])
                saveLocalCart([])
                toast.success('Carrito vacio')
            } catch (error) {
                console.error('Error al vaciar el carrito local', error)
                toast.error('Error al vaciar el carrito local')
            }
        }
    }

    //* cargar carrito al inicializar
    useEffect(() => {
        let isMounted = true

        const initializeCart = async () => {
            // * Esperar un poco para el user context se estabilice
            await new Promise((resolve) => setTimeout(resolve, 100))

            if (!isMounted) return

            const previousAuthState = localStorage.getItem('wasAuthenticated')
            const currentAuthState = isAuthenticated()

            if (!previousAuthState && currentAuthState) {
                //* usuario acaba de iniciar sesion: sincronizar el carrito local
                await syncCartWithBackend()
            } else {
                // * cargart carrito normalmente
                await loadCart()
            }
            //* guardar estado de autenticacion actual
            localStorage.setItem(
                'wasAuthenticated',
                currentAuthState.toString(),
            )

            setLoading(false)
        }

        initializeCart()

        return () => {
            isMounted = false
        }
    }, [userLoading])

    //* escuchar cambios de autenticacion por separado
    useEffect(() => {
        const previousAuthState =
            localStorage.getItem('wasAuthenticated') === 'true'
        const currentAuthState = isAuthenticated()

        //* solo actuar si realmente cambio el estado de autenticacion
        if (previousAuthState !== currentAuthState && cart.length === 0) {
            loadCart()
            localStorage.setItem(
                'wasAuthenticated',
                currentAuthState.toString(),
            )
        }
    }, [])

    //* Reaccionar directamente a cambios en userInfo (login/logout)
    useEffect(() => {
        //* esperar a que UserContext termine de verificar la sesion
        if (userLoading) return
        //* si el usuario inicio sesion (userInfo.id aparece), sincronizar o cargar
        if (userInfo?.id) {
            ;(async () => {
                try {
                    const localCart = loadLocalCart()
                    if (localCart.length > 0) {
                        await syncCartWithBackend()
                    } else {
                        await loadCart()
                    }
                } catch (error) {
                    console.error(
                        'Error al sincronizar/cargar carrito tras login',
                        error,
                    )
                }
            })()
        } else {
            //* si el usuario hace logout, mostrar el carrito local
            try {
                setCart(loadLocalCart())
            } catch (error) {
                console.error('Error al cargar el carrito tras logout', error)
            }
        }
    }, [userInfo?.id, userLoading])

    //* calcular total y cantidad de items cuando cambia el carrito
    useEffect(() => {
        const newTotal = cart.reduce(
            (acc, item) => acc + item.price * (item.quantity || 1),
            0,
        )
        setTotal(newTotal)

        const newItemsQuantity = cart.reduce(
            (acc, item) => acc + (item.quantity || 1),
            0,
        )
        setItemsQuantity(newItemsQuantity)
    }, [cart])

    //* Abrir modal
    const openModal = () => setIsModalOpen(true)
    //* cerrar el modal
    const closeModal = () => setIsModalOpen(false)

    return (
        <CartContext.Provider
            value={{
                cart,
                total,
                itemsQuantity,
                isModalOpen,
                closeModal,
                loading,
                addToCart,
                removeFromCart,
                clearCart,
                openModal,
                updateQuantity,
                loadCart,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}
export const useCart = () => useContext(CartContext)
