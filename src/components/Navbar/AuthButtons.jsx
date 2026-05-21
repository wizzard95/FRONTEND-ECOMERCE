import { Link } from 'react-router'

const AuthButtons = () => {
    return (
        <div className="py-2 sm:py-4 flex justify-center items-center gap-2 sm:gap-4">
            <Link className="btn btn-ghost btn-sm sm:btn-neutral sm:btn-outline" to={'/register'}>
                Crear Cuenta
            </Link>

            <span className="text-base-content/30">|</span>

            <Link className="btn btn-ghost btn-sm sm:btn-neutral sm:btn-outline" to={'/login'}>
                Iniciar sesión
            </Link>
        </div>
    )
}
export default AuthButtons
