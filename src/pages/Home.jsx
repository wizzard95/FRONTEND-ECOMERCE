import CardProduct from '../components/CardProduct/CardProduct'
import { useProduct } from '../context/ProductContext'

const Home = () => {
    const { products, productsLoading, error } = useProduct()

    return (
        <div>
            {/* <h1 className="text-4xl font-bold text-center mt-7 mb-2 text-purple-700 uppercase">
                Mi Ecomerce
            </h1> */}
            <p className="text-center text-sm sm:text-base text-base-content/60 mb-3 sm:mb-4">Elige tu producto</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 place-items-center">
                {productsLoading ? (
                    <div className="col-span-full flex justify-center py-16">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                ) : error ? (
                    <p className="col-span-full text-center text-base-content/50 py-16">Error al cargar los productos</p>
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
