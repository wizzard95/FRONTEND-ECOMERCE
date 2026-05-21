import { useState } from 'react'
import { useUser } from '../../context/UserContext'
import { useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { registerService } from '../../services/authServices'
import { Navigate } from 'react-router'
import toast from 'react-hot-toast'

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        mode: 'onChange', // ? validacion en tiempo real
    })

    //* acceso a la informacion del usuario
    const { userInfo, checkSession } = useUser()
    //const { userInfo, checkSession } = useContext(UserContext)

    const [showPassword, setShowPassword] = useState(false)

    const [redirect, setRedirect] = useState(false)

    const onSubmit = async (data) => {
        // ? registrando al usuario
        /* console.log(data) */
        const result = await registerService(
            data,
            reset,
            setRedirect,
            checkSession,
        )
        //console.log(result)
        if (result.message) {
            toast.success('Registro exitoso')
        } else {
            toast.error('Error, intente mas tarde')
        }
    }

    if (redirect && userInfo.isAdmin) {
        // * llevarlo a la pagina admin
    }
    if (redirect && !userInfo.isAdmin) {
        return <Navigate to={'/'} />
    }

    //console.log(userInfo)
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 sm:mt-8 flex flex-col gap-4 max-w-[500px] mx-auto px-0 sm:px-4"
        >
            <div>
                <label className="label">
                    <span className="label-text">Nombre de usuario</span>
                </label>
                <input
                    {...register('username', {
                        required: 'El nombre de usuario es requerido',
                        minLength: {
                            value: 3,
                            message: 'Mínimo 3 caracteres',
                        },
                        maxLength: {
                            value: 20,
                            message: 'Máximo de 20 caracteres',
                        },
                    })}
                    className={`input input-bordered w-full ${
                        errors.username ? 'input-error' : ''
                    }`}
                    autoComplete="username"
                    name="username"
                    placeholder="usuario123"
                    type="text"
                />
                {errors.username && (
                    <p className="text-error text-sm mt-1.5">
                        {errors.username.message}
                    </p>
                )}
            </div>
            <div>
                <label className="label">
                    <span className="label-text">Correo Electrónico</span>
                </label>
                <input
                    {...register('email', {
                        required: 'El email es requerido',
                        pattern: {
                            value: /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/,
                            message: 'Correo electrónico inválido',
                        },
                        minLength: {
                            value: 6,
                            message: 'Mínimo 6 caracteres',
                        },
                        maxLength: {
                            value: 254,
                            message: 'Máximo de 254 caracteres',
                        },
                    })}
                    className={`input input-bordered w-full ${
                        errors.email ? 'input-error' : ''
                    }`}
                    autoComplete="email"
                    name="email"
                    placeholder="correo@ejemplo.com"
                    type="text"
                />
                {errors.email && (
                    <p className="text-error text-sm mt-1.5">
                        {errors.email.message}
                    </p>
                )}
            </div>
            <div>
                <label className="label">
                    <span className="label-text">Contraseña</span>
                </label>
                <div className="relative">
                    <input
                        {...register('password', {
                            required:
                                'La contraseña es requerida (6-254 caracteres)',
                            minLength: {
                                value: 6,
                                message: 'Mínimo 6 caracteres',
                            },
                            maxLength: {
                                value: 254,
                                message: 'Máximo 254 caracteres',
                            },
                        })}
                        className={`input input-bordered w-full pr-12 ${
                            errors.password ? 'input-error' : ''
                        }`}
                        autoComplete="new-password"
                        placeholder="••••••••"
                        type={showPassword ? 'text' : 'password'}
                    />
                    <button
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={
                            showPassword
                                ? 'Ocultar contraseña'
                                : 'Mostrar contraseña'
                        }
                        type="button"
                        className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content"
                    >
                        {showPassword ? (
                            <FaEyeSlash size={20} />
                        ) : (
                            <FaEye size={20} />
                        )}
                    </button>
                </div>
                {errors.password && (
                    <p className="text-error text-sm mt-1.5">
                        {errors.password.message}
                    </p>
                )}
            </div>
            <button className="btn btn-primary mt-2" type="submit">
                Registrarse
            </button>
        </form>
    )
}

export default RegisterForm
