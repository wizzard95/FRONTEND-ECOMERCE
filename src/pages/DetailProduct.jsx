import { useEffect } from 'react'
import { useProduct } from '../context/ProductContext'
import { useParams } from 'react-router'
import { useCart } from '../context/CartContext'

const DetailProduct = () => {
    const { id } = useParams()
    const { getProductById, product, productLoading } = useProduct()

    const { addToCart, openModal } = useCart()

    useEffect(() => {
        getProductById(id)
    }, [id, getProductById])

    //* funcion para añadir producto al carrito desde el boton
    const handleAddToCart = async () => {
        await addToCart(product)
        openModal()
    }

    return (
        <>
            {productLoading ? (
                <div className="flex justify-center py-16">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            ) : (
                <div className="mt-4 sm:mt-6 flex flex-col md:flex-row gap-4 sm:gap-8">
                    <div className="md:w-1/2">
                        <img
                            className="w-full rounded-xl object-cover aspect-square"
                            src={product.imageUrl}
                            alt={product.name}
                        />
                    </div>
                    <section className="flex flex-col gap-4 sm:gap-5 md:w-1/2">
                        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold">
                            {product.name}
                        </h1>
                        <p className="text-lg sm:text-xl badge badge-warning py-3 sm:py-4 px-4 font-bold w-fit">
                            ${product.price}
                        </p>
                        <p className="text-sm sm:text-base text-base-content/70 leading-relaxed">
                            {product.description}
                        </p>
                        <button
                            onClick={handleAddToCart}
                            className="btn btn-success mt-2 md:mt-auto btn-md sm:btn-lg"
                        >
                            Agregar al carrito
                        </button>
                    </section>
                </div>
            )}
        </>
    )
}

export default DetailProduct
