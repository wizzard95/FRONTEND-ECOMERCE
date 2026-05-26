import { useState } from 'react'
import { createPortal } from 'react-dom'
import { CgTrash } from 'react-icons/cg'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { useCart } from '../../context/CartContext'
import { Link } from 'react-router'

const ModalCart = () => {
    const {
        cart,
        closeModal,
        isModalOpen,
        itemsQuantity,
        total,
        updateQuantity,
        removeFromCart,
        clearCart,
        loading,
    } = useCart()

    const [showConfirm, setShowConfirm] = useState(false)

    if (!isModalOpen) return null

    return createPortal(
        <div className="modal modal-open">
            <div className="modal-box w-full max-w-2xl p-0 overflow-hidden">
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-base-200">
                    <div>
                        <h3 className="text-lg font-bold">Carrito de compras</h3>
                        {itemsQuantity > 0 && (
                            <p className="text-sm text-base-content/50">{itemsQuantity} artículos</p>
                        )}
                    </div>
                    <button onClick={closeModal} className="btn btn-sm btn-circle btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center py-12 text-base-content/50">
                        <span className="loading loading-spinner loading-md"></span>
                        <p className="mt-3 text-sm">Actualizando carrito</p>
                    </div>
                ) : cart.length === 0 ? (
                    <div className="flex flex-col items-center py-12 text-base-content/50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <p className="text-sm">Tu carrito está vacío</p>
                    </div>
                ) : (
                    <>
                        <div className="max-h-96 overflow-y-auto p-4 sm:p-6 space-y-3">
                            {cart.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex items-center gap-3 sm:gap-4 p-3 bg-base-200/50 rounded-xl"
                                >
                                    <img
                                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
                                        src={item.imageUrl}
                                        alt={item.name}
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-sm sm:text-base truncate">
                                            {item.name}
                                        </h4>
                                        <p className="text-xs sm:text-sm text-base-content/50 mt-0.5">
                                            ${item.price} c/u
                                        </p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <button
                                                onClick={async () => {
                                                    if (item.quantity > 1) {
                                                        await updateQuantity(
                                                            item._id,
                                                            item.quantity - 1,
                                                        )
                                                    }
                                                }}
                                                disabled={loading || item.quantity <= 1}
                                                className="btn btn-xs btn-ghost btn-square border border-base-300 disabled:opacity-30"
                                            >
                                                <FaMinus size={10} />
                                            </button>
                                            <span className="w-6 text-center text-sm font-medium tabular-nums">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={async () => {
                                                    await updateQuantity(
                                                        item._id,
                                                        item.quantity + 1,
                                                    )
                                                }}
                                                disabled={loading || item.quantity >= (item.stock || 999)}
                                                className="btn btn-xs btn-ghost btn-square border border-base-300 disabled:opacity-30"
                                            >
                                                <FaPlus size={10} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <span className="font-semibold text-sm sm:text-base">
                                            ${item.price * item.quantity}
                                        </span>
                                        <button
                                            onClick={async () => await removeFromCart(item._id)}
                                            disabled={loading}
                                            className="btn btn-xs btn-ghost text-base-content/40 hover:text-error transition-colors"
                                        >
                                            <CgTrash size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-base-200 p-4 sm:p-6 space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-base-content/60">Artículos</span>
                                <span className="font-medium">{itemsQuantity}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span>${total}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 pt-2">
                                <button
                                    onClick={() => setShowConfirm(true)}
                                    disabled={loading}
                                    className="btn btn-outline btn-sm flex-1 order-2 sm:order-1"
                                >
                                    Vaciar carrito
                                </button>
                                <Link
                                    className="btn btn-ghost btn-sm flex-1 order-3 sm:order-2"
                                    onClick={closeModal}
                                    to="/"
                                >
                                    Seguir comprando
                                </Link>
                                <Link
                                    className="btn btn-primary btn-sm flex-1 order-1 sm:order-3"
                                    onClick={closeModal}
                                    to="/checkout"
                                >
                                    Proceder al pago
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {showConfirm && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-sm text-center">
                        <h3 className="font-bold text-lg mb-2">Vaciar carrito</h3>
                        <p className="text-base-content/60 mb-6">
                            ¿Estás seguro de que quieres vaciar el carrito?
                        </p>
                        <div className="flex justify-center gap-3">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="btn btn-ghost btn-sm"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={async () => {
                                    setShowConfirm(false)
                                    await clearCart()
                                }}
                                className="btn btn-error btn-sm"
                            >
                                Vaciar
                            </button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={() => setShowConfirm(false)}></div>
                </div>
            )}

            <div className="modal-backdrop" onClick={closeModal}></div>
        </div>,
        document.body,
    )
}

export default ModalCart
