import { useState } from 'react'
import { Link } from 'react-router'
import { useProduct } from '../../../context/ProductContext'
import toast from 'react-hot-toast'
import DeleteModal from './DeleteModal'

const TableProducts = ({ products }) => {
    const { deleteProduct } = useProduct()
    const [productToDelete, setProductToDelete] = useState(null)

    const onHandleDelete = async (id) => {
        const result = await deleteProduct(id)
        setProductToDelete(null)

        if (result.success) {
            toast.success(result.message)
        } else {
            toast.error(result.message)
        }
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-16 text-base-content/50">
                <p className="text-lg">No hay productos aún</p>
                <p className="text-sm mt-1">Crea tu primer producto para empezar</p>
            </div>
        )
    }

    return (
        <>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr className="bg-base-200">
                            <th className="w-12">#</th>
                            <th>Nombre</th>
                            <th className="hidden md:table-cell">Descripción</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th className="hidden lg:table-cell">Imagen</th>
                            <th className="w-24">Editar</th>
                            <th className="w-24">Borrar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={`${product._id}-${index}`}>
                                <td className="text-base-content/50">{index + 1}</td>
                                <td className="font-medium">{product.name}</td>
                                <td className="hidden md:table-cell text-sm text-base-content/70 max-w-xs truncate">
                                    {product.description}
                                </td>
                                <td className="font-mono">${product.price}</td>
                                <td>
                                    <span
                                        className={`badge ${
                                            product.stock > 10
                                                ? 'badge-success'
                                                : product.stock > 0
                                                  ? 'badge-warning'
                                                  : 'badge-error'
                                        } badge-sm`}
                                    >
                                        {product.stock}
                                    </span>
                                </td>
                                <td className="hidden lg:table-cell text-sm text-base-content/50 max-w-[120px] truncate">
                                    {product.imageUrl}
                                </td>
                                <td>
                                    <Link
                                        to={`/admin/dashboard/products/updateProduct/${product._id}`}
                                        className="btn btn-ghost btn-sm text-info"
                                    >
                                        Editar
                                    </Link>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-ghost btn-sm text-error"
                                        onClick={() =>
                                            setProductToDelete(product)
                                        }
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <DeleteModal
                isOpen={!!productToDelete}
                onClose={() => setProductToDelete(null)}
                onConfirm={() => onHandleDelete(productToDelete._id)}
                productName={productToDelete?.name}
            />
        </>
    )
}
export default TableProducts
