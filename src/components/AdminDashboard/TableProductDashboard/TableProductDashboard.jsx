import { useState, useMemo } from 'react'
import { Link } from 'react-router'
import { useProduct } from '../../../context/ProductContext'
import { FaSearch } from 'react-icons/fa'
import TableProducts from './TableProducts'

const TableProductDashboard = () => {
    const { products, productsLoading } = useProduct()
    const [search, setSearch] = useState('')

    const filteredProducts = useMemo(() => {
        if (!search.trim()) return products
        const term = search.toLowerCase().trim()
        return products.filter(
            (p) =>
                p.name.toLowerCase().includes(term) ||
                (p.description && p.description.toLowerCase().includes(term)),
        )
    }, [products, search])

    return (
        <div className="h-full flex flex-col gap-4 md:gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shrink-0">
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 shrink-0">
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

            <div className="flex items-center gap-2 bg-base-100 rounded-xl border border-base-200 px-4 py-2.5 shrink-0">
                <FaSearch className="text-base-content/40 shrink-0" size={14} />
                <input
                    type="text"
                    placeholder="Buscar por nombre o descripción..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-transparent outline-none w-full text-sm"
                />
                {search && (
                    <button
                        onClick={() => setSearch('')}
                        className="text-base-content/40 hover:text-base-content/70 text-sm"
                    >
                        Limpiar
                    </button>
                )}
            </div>

            <div className="bg-base-100 rounded-xl shadow-sm border border-base-200 overflow-hidden flex-1 flex flex-col min-h-0">
                {productsLoading ? (
                    <div className="flex justify-center py-16">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                ) : (
                    <TableProducts products={filteredProducts} />
                )}
            </div>
        </div>
    )
}
export default TableProductDashboard
