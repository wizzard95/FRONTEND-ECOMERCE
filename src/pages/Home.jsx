import CardProduct from '../components/CardProduct/CardProduct'
import { useProduct } from '../context/ProductContext'

const Home = () => {
    const { products, productsLoading, error } = useProduct()

    return (
        <div>
            <div className="text-center py-6 sm:py-10">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                    Nuestros Productos
                </h1>
                <p className="text-base-content/60 mt-2 text-sm sm:text-base">
                    Encuentra la taza perfecta para cada ocasión
                </p>
            </div>

            <div className="flex flex-wrap gap-5 justify-center">
                {productsLoading ? (
                    <div className="w-full flex justify-center py-16">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                ) : error ? (
                    <div className="w-full text-center py-16 text-base-content/50">
                        <p className="text-lg">Error al cargar los productos</p>
                        <p className="text-sm mt-1">Intenta nuevamente más tarde</p>
                    </div>
                ) : products.length === 0 ? (
                    <div className="w-full text-center py-16 text-base-content/50">
                        <p className="text-lg">No hay productos disponibles</p>
                    </div>
                ) : (
                    products.map((product) => (
                        <CardProduct key={product._id} product={product} />
                    ))
                )}
            </div>
        </div>
    )
}

export default Home
