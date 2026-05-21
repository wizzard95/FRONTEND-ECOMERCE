import { Routes, Route } from 'react-router'
import Layout from './layout/Layout'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Checkout from './pages/Checkout'
import { UserContextProvider } from './context/UserContext'
import { Toaster } from 'react-hot-toast'
import { ProductContextProvider } from './context/ProductContext'
import DetailProduct from './pages/DetailProduct'
import { CartContextProvider } from './context/CartContext'
import AdminDashboard from './pages/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import PaymentSuccess from './pages/PaymentSuccess'
import PaymentFailure from './pages/PaymentFailure'
import PaymentPending from './pages/PaymentPending'

function App() {
    return (
        <UserContextProvider>
            <ProductContextProvider>
                <CartContextProvider>
                    <Routes>
                        <Route element={<Layout />}>
                            <Route path="/" element={<Home />}></Route>
                            <Route
                                path="/register"
                                element={<Register />}
                            ></Route>
                            <Route path="/login" element={<Login />}></Route>
                            <Route
                                path="/detailProduct/:id"
                                element={<DetailProduct />}
                            ></Route>
                            <Route
                                path="/checkout"
                                element={<Checkout />}
                            ></Route>
                            <Route
                                path="/payment/success"
                                element={<PaymentSuccess />}
                            ></Route>
                            <Route
                                path="/payment/failure"
                                element={<PaymentFailure />}
                            ></Route>
                            <Route
                                path="/payment/pending"
                                element={<PaymentPending />}
                            ></Route>
                        </Route>
                        <Route
                            path="/admin/dashboard/*"
                            element={
                                <ProtectedRoute>
                                    <AdminDashboard />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                    <Toaster />
                </CartContextProvider>
            </ProductContextProvider>
        </UserContextProvider>
    )
}

export default App
