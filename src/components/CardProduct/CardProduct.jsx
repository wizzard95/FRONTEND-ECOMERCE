import { Link } from 'react-router'
import { useCart } from '../../context/CartContext'
import { FaShoppingCart } from 'react-icons/fa'

const CardProduct = ({
    product: { _id, name, price, imageUrl, description, stock },
}) => {
    const { addToCart } = useCart()

    return (
        <div className="card bg-base-100 w-80 lg:w-[30%] shadow-md hover:shadow-xl transition-shadow duration-300 rounded-xl">
            <figure className="overflow-hidden rounded-t-xl">
                <img
                    className="aspect-[9/9] object-cover hover:scale-105 transition-transform duration-500"
                    src={imageUrl}
                    alt={name}
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-lg">{name}</h2>
                <p className="text-base-content/60 text-sm line-clamp-2">{description}</p>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-xl font-bold text-primary">${price}</span>
                    {stock <= 5 && stock > 0 && (
                        <span className="text-xs text-base-content/50">Quedan {stock}</span>
                    )}
                </div>
                <div className="card-actions justify-between mt-4">
                    <Link
                        to={`/detailProduct/${_id}`}
                        className="btn btn-outline btn-sm md:btn-md"
                    >
                        Ver Detalles
                    </Link>
                    <button
                        onClick={() => addToCart({ _id, name, price, imageUrl, description, stock })}
                        disabled={stock === 0}
                        className="btn btn-primary btn-sm md:btn-md"
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
