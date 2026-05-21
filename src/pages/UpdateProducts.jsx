import UpdateProductForm from '../components/AdminDashboard/UpdateProductForm/UpdateProductForm'
import { useParams } from 'react-router'
import { useProduct } from '../context/ProductContext'
import { useEffect } from 'react'

const UpdateProduct = () => {
    const { id } = useParams()
    const { getProductById, product, productLoading } = useProduct()

    useEffect(() => {
        getProductById(id)
    }, [id, getProductById])

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold">Actualizar Producto</h1>
                <p className="text-sm text-base-content/60 mt-1">
                    Modifica los campos del producto seleccionado
                </p>
            </div>
            {productLoading ? (
                <div className="flex justify-center py-16">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            ) : (
                <UpdateProductForm product={product} />
            )}
        </div>
    )
}
export default UpdateProduct
