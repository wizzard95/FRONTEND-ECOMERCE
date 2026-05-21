import { Link } from 'react-router'
import AuthButtons from './AuthButtons'
import Cart from './Cart'
import UserDropDown from './UserDropDown'
import { useUser } from '../../context/UserContext'

const Navbar = () => {
    const { loading, userInfo } = useUser()
    /* console.log(userInfo)
    console.log(loading) */
    return (
        <header className="relative z-40">
            {!loading && !userInfo?.username && <AuthButtons />}
            <nav className="navbar bg-base-100 shadow-sm lg:rounded-box w-full min-h-12 sm:min-h-16">
                <div className="navbar-start">
                    <Link className="btn btn-ghost text-lg sm:text-xl" to="/">
                        E-comerce
                    </Link>
                </div>
                <div className="navbar-end gap-1 sm:gap-3">
                    {userInfo?.isAdmin && (
                        <Link className="btn btn-primary btn-sm sm:btn-md" to="/admin/dashboard">
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
