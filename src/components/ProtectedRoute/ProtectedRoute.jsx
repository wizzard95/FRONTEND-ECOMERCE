import { useUser } from '../../context/UserContext'
import { Navigate } from 'react-router'

const ProtectedRoute = ({ children, requireAdmin = true }) => {
    const { userInfo, loading } = useUser()

    if (loading) {
        return <span className="loading loading-spinner loading-lg"></span>
    }

    if (Object.keys(userInfo).length === 0) {
        return <Navigate to="/login" replace />
    }

    if (requireAdmin && !userInfo.isAdmin) {
        return <Navigate to="/" replace />
    }

    return children
}
export default ProtectedRoute
