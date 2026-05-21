//* importar el componente formulario

import CreateProductForm from '../components/AdminDashboard/CreateProductForm/CreateProductForm'

const CreateProduct = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-center my-10">
                Crear Producto
            </h1>
            {/* CreateProductForm */}
            <CreateProductForm />
        </div>
    )
}
export default CreateProduct
