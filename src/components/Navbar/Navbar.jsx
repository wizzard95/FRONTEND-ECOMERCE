import { Link } from 'react-router'
import Cart from './Cart'
import UserDropDown from './UserDropDown'
import { useUser } from '../../context/UserContext'

const Navbar = () => {
    const { loading, userInfo } = useUser()
    return (
        <header className="sticky top-0 z-40">
            <nav className="navbar bg-base-100/95 backdrop-blur-sm shadow-sm w-full">
                <div className="navbar-start">
                    <Link className="btn btn-ghost text-xl" to="/">
                        E-comerce
                    </Link>
                </div>
                <div className="navbar-end gap-1 sm:gap-3">
                    {!loading && !userInfo?.username && (
                        <>
                            <Link
                                className="btn btn-ghost btn-sm"
                                to="/register"
                            >
                                Crear Cuenta
                            </Link>
                            <Link className="btn btn-primary btn-sm" to="/login">
                                Iniciar sesión
                            </Link>
                        </>
                    )}

                    {userInfo?.isAdmin && (
                        <Link
                            className="btn btn-ghost btn-sm"
                            to="/admin/dashboard"
                        >
                            Dashboard
                        </Link>
                    )}

                    <Cart />

                    {!loading && userInfo?.username && <UserDropDown />}
                </div>
            </nav>
        </header>
    )
}
export default Navbar
