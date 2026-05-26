// * CONEXION CON EL BACKEND

import axios from 'axios'

// * Configuracion base de axios para autenticacion
// Uso de rutas relativas con proxy de desarrollo (vite) para evitar CORS y cookies cross-origin
const API_URL = import.meta.env.VITE_BACKEND_URL + '/auth'
//* http://localhost:3001/api/auth/register

// * para incluir la cookie en las peticiones
axios.defaults.withCredentials = true

//* peticion GET hacie el backend para ver si el usuario esta autenticado
export const getProfileService = async () => {
    try {
        // Si existe un token en localStorage, incluirlo en la cabecera Authorization
        const token = localStorage.getItem('token')
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
        const response = await axios.get(`${API_URL}/profile`)
        return response.data
    } catch (error) {
        throw new Error('Error al obtener el perfil')
    }
}

export const loginService = async (data, reset, redirect, setUserInfo) => {
    try {
        const response = await axios.post(`${API_URL}/login`, data, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        })

        //* comprobar si la respuesta es exitosa
        if (response.status === 200) {
            setUserInfo(response.data)
            reset()
            redirect()
            return {
                succes: true,
                message: 'Inicio de sesión exitoso',
            }
        }
    } catch (error) {
        const serverMsg =
            error.response?.data?.message ||
            (Array.isArray(error.response?.data) &&
                error.response.data[0]?.message) ||
            'Error al loguearse'
        return {
            succes: false,
            message: serverMsg,
        }
    }
}

export const registerService = async (
    data,
    reset,
    redirect,
    checkSession,
) => {
    try {
        const response = await axios.post(`${API_URL}/register`, data, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        })
        if (response.status === 201 || response.status === 200) {
            // Al recibir token en respuesta, guardarlo localmente para autenticación en desarrollo
            const token = response.data?.token
            if (token) {
                localStorage.setItem('token', token)
                axios.defaults.headers.common['Authorization'] =
                    `Bearer ${token}`
            }
            //alert('REGISTRO EXITOSO DEL USUARIO')
            // * Verificar la sesion real del servidor despues del registro
            await checkSession()
            reset()
            redirect()

            return {
                message: true,
            }
        }
    } catch (error) {
        return {
            message: false,
        }
    }
}

export const logoutService = async () => {
    try {
        // Limpiar token del lado del cliente
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']

        // Notificar al backend para limpiar la cookie
        const response = await axios.post(`${API_URL}/logout`)
        return response.data
    } catch (error) {
        throw new Error(
            error.response?.data?.message || 'Error al cerrar la sesión',
        )
    }
}
