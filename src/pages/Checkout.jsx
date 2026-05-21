import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCart } from '../context/CartContext'
import { useUser } from '../context/UserContext'
import { createOrder } from '../services/orderServices'
import toast from 'react-hot-toast'

const Checkout = () => {
    const { cart, total, clearCart, loading: cartLoading } = useCart()
    const { user } = useUser()
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            firstname: '',
            lastName: '',
            email: user?.email || '',
            phone: '',
            street: '',
            number: '',
            city: '',
            state: '',
            zipCode: '',
        },
        mode: 'onChange',
    })

    if (cartLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-200">
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg"></span>
                    <p className="mt-4 text-lg">Cargando carrito...</p>
                </div>
            </div>
        )
    }
    const onSubmit = async (data) => {
        setLoading(true)

        try {
            //* prepar los datos para el backend
            const orderData = {
                items: cart.map((item) => ({
                    id: item._id,
                    title: item.name,
                    quantity: item.quantity || 1,
                    unit_price: item.price,
                    currency_id: 'CLP',
                })),
                payer: {
                    email: data.email,
                },
                shippingInfo: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    address: {
                        street: data.street,
                        number: data.number,
                        city: data.city,
                        state: data.state,
                        zipCode: data.zipCode,
                    },
                },
            }

            const response = await createOrder(orderData)
            console.log(response)

            if (response.success && response.paymentUrl) {
                //* Mostrar mensaje de exito
                toast.success(
                    'Orden creada con éxito. Redirigiendo a Mercado Pago...',
                )

                //* Guardar el carrito en sessionStorage como respaldo
                sessionStorage.setItem('checkputCart', JSON.stringify(cart))

                //* Redirigir a mercado pago despues de un breve delay
                setTimeout(() => {
                    window.location.href = response.paymentUrl
                }, 1500)
            } else {
                throw new Error('No se recibio URL de pago')
            }
        } catch (error) {
            toast.error('Error al procesar la orden intente más tarde')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="px-0 sm:px-4 py-4 sm:py-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
                {/* Formulario de envío */}
                <div className="bg-base-100 p-4 sm:p-6 rounded-xl shadow-sm border border-base-200">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
                        Información de Envío
                    </h2>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-3 sm:gap-4"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                                <label className="label py-1">
                                    <span className="label-text">Nombre</span>
                                </label>
                                <input
                                    {...register('firstName', {
                                        required: 'El nombre es requerido',
                                        minLength: {
                                            value: 2,
                                            message: 'Mínimo 2 caracteres',
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: 'Máximo 50 caracteres',
                                        },
                                        pattern: {
                                            value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                            message: 'Solo se permiten letras',
                                        },
                                    })}
                                    className={`input input-bordered w-full ${
                                        errors.firstName ? 'input-error' : ''
                                    }`}
                                    type="text"
                                    placeholder="Nombre"
                                    autoComplete="given-name"
                                />
                                {errors.firstName && (
                                    <p className="text-error text-sm mt-1.5">
                                        {errors.firstName.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="label py-1">
                                    <span className="label-text">Apellido</span>
                                </label>
                                <input
                                    {...register('lastName', {
                                        required: 'El apellido es requerido',
                                        minLength: {
                                            value: 2,
                                            message: 'Mínimo 2 caracteres',
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: 'Máximo 50 caracteres',
                                        },
                                        pattern: {
                                            value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                            message: 'Solo se permiten letras',
                                        },
                                    })}
                                    className={`input input-bordered w-full ${
                                        errors.lastName ? 'input-error' : ''
                                    }`}
                                    type="text"
                                    placeholder="Apellido"
                                    autoComplete="family-name"
                                />
                                {errors.lastName && (
                                    <p className="text-error text-sm mt-1.5">
                                        {errors.lastName.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="label py-1">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                {...register('email', {
                                    required: 'El email es requerido',
                                    pattern: {
                                        value: /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/,
                                        message: 'Email inválido',
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Mínimo 6 caracteres',
                                    },
                                    maxLength: {
                                        value: 254,
                                        message: 'Máximo 254 caracteres',
                                    },
                                })}
                                className={`input input-bordered w-full ${
                                    errors.email ? 'input-error' : ''
                                }`}
                                type="email"
                                placeholder="correo@ejemplo.com"
                                autoComplete="email"
                            />
                            {errors.email && (
                                <p className="text-error text-sm mt-1.5">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="label py-1">
                                <span className="label-text">Teléfono</span>
                            </label>
                            <input
                                {...register('phone', {
                                    required: 'El teléfono es requerido',
                                    pattern: {
                                        value: /^[0-9+\-\s()]+$/,
                                        message: 'Formato de teléfono inválido',
                                    },
                                    minLength: {
                                        value: 8,
                                        message: 'Mínimo 8 dígitos',
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: 'Máximo 20 caracteres',
                                    },
                                })}
                                className={`input input-bordered w-full ${
                                    errors.phone ? 'input-error' : ''
                                }`}
                                type="tel"
                                placeholder="+56 9 1234 5678"
                                autoComplete="tel"
                            />
                            {errors.phone && (
                                <p className="text-error text-sm mt-1.5">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                            <div className="sm:col-span-2">
                                <label className="label py-1">
                                    <span className="label-text">Calle</span>
                                </label>
                                <input
                                    {...register('street', {
                                        required: 'La calle es requerida',
                                        minLength: {
                                            value: 3,
                                            message: 'Mínimo 3 caracteres',
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: 'Máximo 100 caracteres',
                                        },
                                    })}
                                    className={`input input-bordered w-full ${
                                        errors.street ? 'input-error' : ''
                                    }`}
                                    type="text"
                                    placeholder="Calle"
                                    autoComplete="address-line1"
                                />
                                {errors.street && (
                                    <p className="text-error text-sm mt-1.5">
                                        {errors.street.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="label py-1">
                                    <span className="label-text">Número</span>
                                </label>
                                <input
                                    {...register('number', {
                                        required: 'El número es requerido',
                                        pattern: {
                                            value: /^[0-9a-zA-Z\s\-\/]+$/,
                                            message:
                                                'Formato de número inválido',
                                        },
                                        maxLength: {
                                            value: 10,
                                            message: 'Máximo 10 caracteres',
                                        },
                                    })}
                                    className={`input input-bordered w-full ${
                                        errors.number ? 'input-error' : ''
                                    }`}
                                    type="text"
                                    placeholder="Número"
                                    autoComplete="address-line2"
                                />
                                {errors.number && (
                                    <p className="text-error text-sm mt-1.5">
                                        {errors.number.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                                <label className="label py-1">
                                    <span className="label-text">Ciudad</span>
                                </label>
                                <input
                                    {...register('city', {
                                        required: 'La ciudad es requerida',
                                        minLength: {
                                            value: 2,
                                            message: 'Mínimo 2 caracteres',
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: 'Máximo 50 caracteres',
                                        },
                                        pattern: {
                                            value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                            message: 'Solo se permiten letras',
                                        },
                                    })}
                                    className={`input input-bordered w-full ${
                                        errors.city ? 'input-error' : ''
                                    }`}
                                    type="text"
                                    placeholder="Ciudad"
                                    autoComplete="address-level2"
                                />
                                {errors.city && (
                                    <p className="text-error text-sm mt-1.5">
                                        {errors.city.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="label py-1">
                                    <span className="label-text">Provincia</span>
                                </label>
                                <input
                                    {...register('state', {
                                        required: 'La provincia es requerida',
                                        minLength: {
                                            value: 2,
                                            message: 'Mínimo 2 caracteres',
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: 'Máximo 50 caracteres',
                                        },
                                        pattern: {
                                            value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                            message: 'Solo se permiten letras',
                                        },
                                    })}
                                    className={`input input-bordered w-full ${
                                        errors.state ? 'input-error' : ''
                                    }`}
                                    type="text"
                                    placeholder="Provincia"
                                    autoComplete="address-level1"
                                />
                                {errors.state && (
                                    <p className="text-error text-sm mt-1.5">
                                        {errors.state.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="label py-1">
                                <span className="label-text">Código Postal</span>
                            </label>
                            <input
                                {...register('zipCode', {
                                    required: 'El código postal es requerido',
                                    pattern: {
                                        value: /^[0-9A-Za-z\s\-]+$/,
                                        message:
                                            'Formato de código postal inválido',
                                    },
                                    minLength: {
                                        value: 3,
                                        message: 'Mínimo 3 caracteres',
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: 'Máximo 10 caracteres',
                                    },
                                })}
                                className={`input input-bordered w-full ${
                                    errors.zipCode ? 'input-error' : ''
                                }`}
                                type="text"
                                placeholder="1234567"
                                autoComplete="postal-code"
                            />
                            {errors.zipCode && (
                                <p className="text-error text-sm mt-1.5">
                                    {errors.zipCode.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full mt-4 sm:mt-6"
                        >
                            {loading ? (
                                <>
                                    <span className="loading loading-spinner"></span>
                                    Procesando...
                                </>
                            ) : (
                                'Proceder al Pago'
                            )}
                        </button>
                    </form>
                </div>

                {/* Resumen de la orden */}
                <div className="bg-base-100 p-4 sm:p-6 rounded-xl shadow-sm border border-base-200">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
                        Resumen de la Orden
                    </h2>

                    <div className="space-y-3 sm:space-y-4">
                        {cart.map((item) => (
                            <div
                                key={item._id}
                                className="flex justify-between items-center border-b border-base-200 pb-2"
                            >
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.name}
                                        className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded"
                                    />
                                    <div>
                                        <h3 className="font-medium text-sm sm:text-base">
                                            {item.name}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-base-content/50">
                                            Cantidad: {item.quantity || 1}
                                        </p>
                                    </div>
                                </div>
                                <span className="font-semibold text-sm sm:text-base">
                                    ${item.price * (item.quantity || 1)}
                                </span>
                            </div>
                        ))}

                        <div className="border-t border-base-200 pt-3 sm:pt-4">
                            <div className="flex justify-between items-center text-lg sm:text-xl font-bold">
                                <span>Total:</span>
                                <span>${total}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
