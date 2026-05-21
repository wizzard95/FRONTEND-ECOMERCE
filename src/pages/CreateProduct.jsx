import CreateProductForm from '../components/AdminDashboard/CreateProductForm/CreateProductForm'

const CreateProduct = () => {
    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold">Crear Producto</h1>
                <p className="text-sm text-base-content/60 mt-1">
                    Completa los campos para agregar un nuevo producto al
                    catálogo
                </p>
            </div>
            <CreateProductForm />
        </div>
    )
}
export default CreateProduct
