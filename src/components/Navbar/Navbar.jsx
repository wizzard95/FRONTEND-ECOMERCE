import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router'
import Cart from './Cart'
import { useUser } from '../../context/UserContext'
import toast from 'react-hot-toast'
import { logoutService } from '../../services/authServices'

const Navbar = () => {
    const { loading, userInfo, setUserInfo } = useUser()
    const [menuOpen, setMenuOpen] = useState(false)
    const menuRef = useRef(null)

    useEffect(() => {
        const handleClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false)
            }
        }
        if (menuOpen) {
            document.addEventListener('mousedown', handleClick)
            document.body.style.overflow = 'hidden'
        }
        return () => {
            document.removeEventListener('mousedown', handleClick)
            document.body.style.overflow = ''
        }
    }, [menuOpen])

    const handleLogout = async () => {
        try {
            await logoutService()
            setUserInfo({})
            toast.success('Sesión cerrada correctamente')
            setMenuOpen(false)
        } catch (error) {
            toast.error('Error al cerrar sesión')
        }
    }

    return (
        <header className="sticky top-0 z-40">
            <nav className="navbar bg-base-100/95 backdrop-blur-sm shadow-sm w-full">
                <div className="navbar-start">
                    <Link className="btn btn-ghost text-xl" to="/">
                        meEcomerce
                    </Link>
                </div>
                <div className="navbar-end gap-1">
                    <Cart />

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="btn btn-ghost btn-sm sm:hidden"
                        aria-label="Menú"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {menuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>

                    <div className="hidden sm:flex sm:items-center sm:gap-2">
                        {!loading && !userInfo?.username && (
                            <>
                                <Link className="btn btn-ghost btn-sm" to="/register">
                                    Crear Cuenta
                                </Link>
                                <Link className="btn btn-primary btn-sm" to="/login">
                                    Iniciar sesión
                                </Link>
                            </>
                        )}
                        {userInfo?.isAdmin && (
                            <Link className="btn btn-ghost btn-sm" to="/admin/dashboard">
                                Dashboard
                            </Link>
                        )}
                        {!loading && userInfo?.username && (
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost">
                                    <span className="text-sm font-semibold">{userInfo.username}</span>
                                </div>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 w-52 p-2 shadow-lg">
                                    <li className="menu-header px-4 py-2 text-sm font-semibold text-base-content/70 pointer-events-none">
                                        {userInfo.username}
                                    </li>
                                    <div className="divider my-1"></div>
                                    <li><a className="justify-between">Perfil</a></li>
                                    <li><a className="justify-between">Configuración</a></li>
                                    <li><a onClick={handleLogout} className="justify-between text-error">Cerrar sesión</a></li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <div
                ref={menuRef}
                className={`fixed top-0 right-0 h-full w-72 bg-base-100 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out sm:hidden ${
                    menuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-4 border-b border-base-200">
                        <span className="text-lg font-semibold">Menú</span>
                        <button
                            onClick={() => setMenuOpen(false)}
                            className="btn btn-ghost btn-sm btn-circle"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex-1 p-4 space-y-2">
                        {!loading && userInfo?.username && (
                            <div className="px-3 py-2 text-sm font-medium text-base-content/70">
                                {userInfo.username}
                            </div>
                        )}

                        <Link
                            to="/"
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-base-200 transition-colors"
                        >
                            Inicio
                        </Link>

                        {userInfo?.isAdmin && (
                            <Link
                                to="/admin/dashboard"
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-base-200 transition-colors"
                            >
                                Dashboard
                            </Link>
                        )}

                        {!loading && !userInfo?.username && (
                            <>
                                <div className="border-t border-base-200 my-2"></div>
                                <Link
                                    to="/register"
                                    onClick={() => setMenuOpen(false)}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-base-200 transition-colors"
                                >
                                    Crear Cuenta
                                </Link>
                                <Link
                                    to="/login"
                                    onClick={() => setMenuOpen(false)}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary text-primary-content hover:bg-primary/90 transition-colors"
                                >
                                    Iniciar sesión
                                </Link>
                            </>
                        )}
                    </div>

                    {userInfo?.username && (
                        <div className="p-4 border-t border-base-200">
                            <button
                                onClick={handleLogout}
                                className="btn btn-ghost btn-sm w-full justify-start text-error"
                            >
                                Cerrar sesión
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 sm:hidden"
                    onClick={() => setMenuOpen(false)}
                />
            )}
        </header>
    )
}
export default Navbar
