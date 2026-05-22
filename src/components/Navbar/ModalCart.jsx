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
        <div className="modal modal-open px-4">
            <section className="modal-box w-full max-w-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">Carrito de compras</h3>
                    <button
                        onClick={closeModal}
                        className="btn btn-sm btn-circle btn-ghost"
                    >
                        X
                    </button>
                </div>
                {loading ? (
                    <div className="text-center py-8">
                        <span className="loading loading-spinner loading-lg"></span>
                        <p className="text-gray-500 mt-2">
                            Actualizando carrito
                        </p>
                    </div>
                ) : cart.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500">Tu carrito esta vacío</p>
                    </div>
                ) : (
                    <>
                        <div className="space-y-4 max-h-96 flex flex-col gap-4 overflow-y-auto rounded">
                            {cart.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex items-center flex-wrap md:flex-row md:items-center gap-4 rounded-lg"
                                >
                                    <img
                                        className="w-20 h-20 object-cover aspect-square"
                                        src={item.imageUrl}
                                        alt={item.name}
                                    />
                                    <div className="flex-1 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                                        <div>
                                            <h4 className="font-semibold">
                                                {item.name}
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                {item.price}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3 mt-2 md:mt-0">
                                            <div className="flex items-center rounded-lg">
                                                <button
                                                    onClick={async () => {
                                                        if (item.quantity > 1) {
                                                            await updateQuantity(
                                                                item._id,
                                                                item.quantity -
                                                                    1,
                                                            )
                                                        }
                                                    }}
                                                    disabled={
                                                        loading ||
                                                        item.quantity <= 1
                                                    }
                                                    className="p-2 border rounded"
                                                >
                                                    <FaMinus size={12} />
                                                </button>
                                                <span className="px-4 py-2 font-medium">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={async () => {
                                                        await updateQuantity(
                                                            item._id,
                                                            item.quantity + 1,
                                                        )
                                                    }}
                                                    disabled={
                                                        loading ||
                                                        item.quantity >=
                                                            (item.stock || 999)
                                                    }
                                                    className="p-2 border rounded"
                                                >
                                                    <FaPlus size={12} />
                                                </button>
                                            </div>
                                            <span className="font-semibold text-lg">
                                                ${item.price * item.quantity}
                                            </span>
                                            <button
                                                onClick={async () => {
                                                    await removeFromCart(
                                                        item._id,
                                                    )
                                                }}
                                                disabled={loading}
                                                className="btn btn-ghost btn-sm hover:bg-red-200"
                                            >
                                                <CgTrash size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="border-t pt-4 mt-4">
                            <div className="flex justify-between items-center mb-2">
                                <span>Total de artículos</span>
                                <span className="font-semibold">
                                    {itemsQuantity}
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-lg font-semibold">
                                <span>Total:</span>
                                <span>${total}</span>
                            </div>
                        </div>
                        <div className="modal-action mt-4 gap-2 flex flex-col lg:flex-row lg:justify-between">
                            <button
                                onClick={() => setShowConfirm(true)}
                                disabled={loading}
                                className="btn btn-error"
                            >
                                Vaciar carrito
                            </button>
                            <Link
                                className="btn btn-info"
                                onClick={closeModal}
                                to="/"
                            >
                                Seguir comprando
                            </Link>
                            <Link
                                className="btn btn-primary"
                                onClick={closeModal}
                                to="/checkout"
                            >
                                Proceder al pago
                            </Link>
                        </div>
                    </>
                )}
            </section>

            {showConfirm && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-sm text-center">
                        <h3 className="font-bold text-lg mb-2">
                            Vaciar carrito
                        </h3>
                        <p className="text-gray-600 mb-6">
                            ¿Estás seguro de que quieres vaciar el carrito?
                        </p>
                        <div className="flex justify-center gap-3">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="btn btn-ghost"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={async () => {
                                    setShowConfirm(false)
                                    await clearCart()
                                }}
                                className="btn btn-error"
                            >
                                Vaciar
                            </button>
                        </div>
                    </div>
                    <div
                        className="modal-backdrop"
                        onClick={() => setShowConfirm(false)}
                    ></div>
                </div>
            )}

            {/*  cerrar el carrito haciendo click fuera del modal */}
            <div className="modal-backdrop" onClick={closeModal}></div>
        </div>,
        document.body,
    )
}

export default ModalCart
