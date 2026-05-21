import { Link } from 'react-router'
import { useCart } from '../../context/CartContext'
import { FaShoppingCart } from 'react-icons/fa'

const CardProduct = ({
    product: { _id, name, price, imageUrl, description, stock },
}) => {
    const { addToCart } = useCart()

    return (
        <div className="card bg-base-100 w-80 lg:w-[30%] shadow-lg">
            <figure>
                <img
                    className="aspect-[9/9] object-cover"
                    src={imageUrl}
                    alt="Tazas"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <div className="badge badge-warning">{price}</div>
                <p>{description}</p>
                <div className="card-actions justify-between mt-4">
                    <Link
                        to={`/detailProduct/${_id}`}
                        className="btn btn-info btn-sm md:btn-md"
                    >
                        Ver Detalles
                    </Link>
                    <button
                        onClick={() => addToCart({ _id, name, price, imageUrl, description, stock })}
                        disabled={stock === 0}
                        className="btn btn-success btn-sm md:btn-md"
                    >
                        <FaShoppingCart size={16} />
                        {stock === 0 ? 'Sin stock' : 'Agregar'}
                    </button>
                </div>
            </div>
        </div>
    )
}
export default CardProduct
