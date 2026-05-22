import { useForm } from 'react-hook-form'
import { useProduct } from '../../../context/ProductContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'

const fields = [
    {
        name: 'name',
        label: 'Nombre',
        placeholder: 'Nombre del producto',
        type: 'text',
        validation: {
            required: 'El nombre es requerido',
            minLength: { value: 3, message: 'Mínimo 3 caracteres' },
            maxLength: { value: 50, message: 'Máximo 50 caracteres' },
        },
    },
    {
        name: 'description',
        label: 'Descripción',
        placeholder: 'Descripción del producto',
        type: 'text',
        validation: {
            required: 'La descripción es requerida',
            minLength: { value: 10, message: 'Mínimo 10 caracteres' },
            maxLength: { value: 500, message: 'Máximo 500 caracteres' },
        },
    },
    {
        name: 'price',
        label: 'Precio',
        placeholder: '0.00',
        type: 'number',
        validation: {
            required: 'El precio es requerido',
            min: { value: 1, message: 'Debe ser mayor a 0' },
        },
    },
    {
        name: 'stock',
        label: 'Stock',
        placeholder: '0',
        type: 'number',
        validation: {
            required: 'El stock es requerido',
            min: { value: 1, message: 'Debe ser mayor a 0' },
        },
    },
    {
        name: 'imageUrl',
        label: 'URL de la imagen',
        placeholder: 'https://ejemplo.com/imagen.jpg',
        type: 'text',
        validation: {
            required: 'La URL de la imagen es requerida',
        },
    },
]

const CreateProductForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm({ mode: 'onChange' })

    const { createProduct } = useProduct()
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        const result = await createProduct(data)

        if (result.success) {
            toast.success(result.message)
            reset()
            navigate('/admin/dashboard/products')
        } else {
            toast.error(result.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto">
            <div className="bg-base-100 rounded-xl shadow-sm border border-base-200 p-6 space-y-4">
                {fields.map((field) => (
                    <div key={field.name}>
                        <label className="label py-1">
                            <span className="label-text font-medium">
                                {field.label}
                            </span>
                        </label>
                        <input
                            {...register(field.name, {
                                ...field.validation,
                                ...(field.type === 'number' && {
                                    valueAsNumber: true,
                                }),
                            })}
                            type={field.type}
                            placeholder={field.placeholder}
                            className={`input input-bordered w-full ${
                                errors[field.name] ? 'input-error' : ''
                            }`}
                        />
                        {errors[field.name] && (
                            <p className="text-error text-sm mt-1">
                                {errors[field.name].message}
                            </p>
                        )}
                    </div>
                ))}
                <div className="flex gap-3 justify-end pt-2">
                    <button
                        type="button"
                        className="btn btn-ghost"
                        onClick={() => navigate('/admin/dashboard/products')}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={!isValid}
                    >
                        Crear Producto
                    </button>
                </div>
            </div>
        </form>
    )
}
export default CreateProductForm
