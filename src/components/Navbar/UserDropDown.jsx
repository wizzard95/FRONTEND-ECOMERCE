import toast from 'react-hot-toast'
import { useUser } from '../../context/UserContext'
import { logoutService } from '../../services/authServices'

const UserDropDown = () => {
    const { userInfo, setUserInfo } = useUser()

    const handleLogout = async () => {
        try {
            await logoutService()
            setUserInfo({})
            toast.success('Sesión cerrada correctamente')
        } catch (error) {
            console.error('Error al cerrar sesión', error)
            toast.error('Error al cerrar sesión')
        }
    }

    return (
        <div className="dropdown dropdown-end">
            <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost text-center"
            >
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold hidden lg:block">
                        {userInfo?.username}
                    </span>
                    {/* <div className="w-10 rounded-full">
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                            alt="Avatar"
                        />
                    </div> */}
                </div>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow"
            >
                <li className="menu-header px-4 py-2 text-sm font-semibold text-base-content/70 pointer-events-none">
                    {userInfo?.username}
                </li>
                <div className="divider my-1"></div>
                <li>
                    <a className="justify-between">
                        Perfil
                        <span className="badge">Nuevo</span>
                    </a>
                </li>
                <li>
                    <a className="justify-between">Configuración</a>
                </li>
                <li>
                    <a onClick={handleLogout} className="justify-between">
                        Cerrar sesión
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default UserDropDown
