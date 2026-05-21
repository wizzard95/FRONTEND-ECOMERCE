import { Link } from 'react-router'
import { useCart } from '../../context/CartContext'
import { FaShoppingCart } from 'react-icons/fa'

const CardProduct = ({
    product: { _id, name, price, imageUrl, description, stock },
}) => {
    const { addToCart } = useCart()

    return (
        <div className="card bg-base-100 w-full sm:w-80 lg:w-[30%] shadow-sm sm:shadow-lg">
            <figure>
                <img
                    className="aspect-[9/9] object-cover"
                    src={imageUrl}
                    alt="Tazas"
                />
            </figure>
            <div className="card-body p-4 sm:p-6">
                <h2 className="card-title text-base sm:text-lg">{name}</h2>
                <div className="badge badge-warning text-xs sm:text-sm">${price}</div>
                <p className="text-sm sm:text-base line-clamp-2">{description}</p>
                <div className="card-actions justify-between mt-3 sm:mt-4">
                    <Link
                        to={`/detailProduct/${_id}`}
                        className="btn btn-info btn-xs sm:btn-sm md:btn-md"
                    >
                        Ver Detalles
                    </Link>
                    <button
                        onClick={() => addToCart({ _id, name, price, imageUrl, description, stock })}
                        disabled={stock === 0}
                        className="btn btn-success btn-xs sm:btn-sm md:btn-md"
                    >
                        <FaShoppingCart size={14} />
                        {stock === 0 ? 'Sin stock' : 'Agregar'}
                    </button>
                </div>
            </div>
        </div>
    )
}
export default CardProduct
