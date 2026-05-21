import {
    useContext,
    createContext,
    useState,
    useEffect,
    useCallback,
} from 'react'
import { getProfileService } from '../services/authServices'

export const UserContext = createContext({})

export const UserContextProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({})
    const [loading, setLoading] = useState(true)

    // * funcion para verificar la sesion del usuario
    const checkSession = useCallback(async () => {
        try {
            const userData = await getProfileService()
            setUserInfo(userData)
            /* a traves de esta funcion haremos una peticion a nuestro backend
             para checar la informacion del usuario en especifico*/
        } catch (error) {
            //console.log('No hay sesion activa: ', error)
            setUserInfo({})
        } finally {
            setLoading(false)
        }
    }, [])
    // * funcion para obtener el id del usuario autenticado
    const getUserId = () => {
        return userInfo?.id || null
    }

    //* verificar si el usuario esta autenticado o no
    const isAuthenticated = () => {
        return !!userInfo?.id
    }

    useEffect(() => {
        checkSession()
    }, [checkSession])

    return (
        <UserContext.Provider
            value={{
                userInfo,
                setUserInfo,
                loading,
                checkSession,
                getUserId,
                isAuthenticated,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)
