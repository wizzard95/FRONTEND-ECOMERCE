import { useEffect } from 'react'
import { useProduct } from '../context/ProductContext'
import { useParams, Link } from 'react-router'
import { useCart } from '../context/CartContext'
import { FaShoppingCart } from 'react-icons/fa'

const DetailProduct = () => {
    const { id } = useParams()
    const { getProductById, product, productLoading } = useProduct()
    const { addToCart, openModal } = useCart()

    useEffect(() => {
        getProductById(id)
    }, [id, getProductById])

    const handleAddToCart = async () => {
        await addToCart(product)
        openModal()
    }

    return (
        <div className="py-4 sm:py-8">
            {productLoading ? (
                <div className="flex justify-center py-16">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            ) : (
                <div className="flex flex-col md:flex-row gap-6 sm:gap-10">
                    <div className="md:w-1/2">
                        <div className="bg-base-100 rounded-2xl overflow-hidden shadow-sm border border-base-200">
                            <img
                                className="w-full aspect-square object-cover"
                                src={product.imageUrl}
                                alt={product.name}
                            />
                        </div>
                    </div>
                    <div className="md:w-1/2 flex flex-col gap-4 sm:gap-6">
                        <div>
                            <Link
                                to="/"
                                className="text-sm text-base-content/40 hover:text-base-content/70 transition-colors"
                            >
                                ← Volver
                            </Link>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2">
                                {product.name}
                            </h1>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-2xl sm:text-3xl font-bold text-primary">
                                ${product.price}
                            </span>
                            <span
                                className={`badge badge-sm ${
                                    product.stock > 0
                                        ? 'badge-success'
                                        : 'badge-error'
                                }`}
                            >
                                {product.stock > 0
                                    ? `Stock: ${product.stock}`
                                    : 'Sin stock'}
                            </span>
                        </div>

                        <p className="text-sm sm:text-base text-base-content/70 leading-relaxed">
                            {product.description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <button
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                                className="btn btn-primary flex-1 gap-2"
                            >
                                <FaShoppingCart size={16} />
                                {product.stock === 0
                                    ? 'Sin stock'
                                    : 'Agregar al carrito'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DetailProduct
