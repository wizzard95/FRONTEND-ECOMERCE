import { Link } from 'react-router'
import { useProduct } from '../../../context/ProductContext'
import TableProducts from './TableProducts'

const TableProductDashboard = () => {
    const { products, productsLoading } = useProduct()

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Productos</h1>
                    <p className="text-sm text-base-content/60 mt-1">
                        Gestiona el catálogo de productos
                    </p>
                </div>
                <Link
                    to="/admin/dashboard/products/createProduct"
                    className="btn btn-primary"
                >
                    + Nuevo Producto
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="stat bg-base-100 rounded-xl shadow-sm border border-base-200">
                    <div className="stat-title">Total Productos</div>
                    <div className="stat-value text-2xl">{products.length}</div>
                </div>
                <div className="stat bg-base-100 rounded-xl shadow-sm border border-base-200">
                    <div className="stat-title">Stock Total</div>
                    <div className="stat-value text-2xl">
                        {products.reduce((acc, p) => acc + (p.stock || 0), 0)}
                    </div>
                </div>
                <div className="stat bg-base-100 rounded-xl shadow-sm border border-base-200">
                    <div className="stat-title">Precio Promedio</div>
                    <div className="stat-value text-2xl">
                        $
                        {products.length > 0
                            ? (
                                  products.reduce(
                                      (acc, p) => acc + (p.price || 0),
                                      0,
                                  ) / products.length
                              ).toFixed(2)
                            : '0.00'}
                    </div>
                </div>
            </div>

            <div className="bg-base-100 rounded-xl shadow-sm border border-base-200 overflow-hidden">
                {productsLoading ? (
                    <div className="flex justify-center py-16">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                ) : (
                    <TableProducts products={products} />
                )}
            </div>
        </div>
    )
}
export default TableProductDashboard
