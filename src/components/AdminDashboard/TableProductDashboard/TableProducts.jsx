import { Link } from 'react-router'
import { useProduct } from '../../../context/ProductContext'
import toast from 'react-hot-toast'

const TableProducts = ({ products }) => {
    const { deleteProduct } = useProduct()

    const onHandleDelete = async (id) => {
        const result = await deleteProduct(id)

        if (result.success) {
            toast.success(result.message)
        } else {
            toast.error(result.message)
        }
    }

    return (
        <table className="table text-center">
            <thead>
                <tr>
                    <th></th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Imagen</th>
                    <th>Editar</th>
                    <th>Borrar</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product, index) => (
                    <tr key={`${product._id}-${index}`}>
                        <td>{index + 1}</td>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                        <td>{product.stock}</td>
                        <td>{product.imageUrl}</td>
                        <td>
                            <Link
                                to={`/admin/dashboard/products/updateProduct/${product._id}`}
                                className="btn btn-info"
                            >
                                Edit
                            </Link>
                        </td>
                        <td>
                            <button
                                className="btn btn-error"
                                onClick={() => onHandleDelete(product._id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
export default TableProducts
