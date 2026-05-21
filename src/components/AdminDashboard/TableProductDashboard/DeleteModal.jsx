import { useEffect, useRef } from 'react'

const DeleteModal = ({ isOpen, onClose, onConfirm, productName }) => {
    const dialogRef = useRef(null)

    useEffect(() => {
        if (isOpen) {
            dialogRef.current?.showModal()
        } else {
            dialogRef.current?.close()
        }
    }, [isOpen])

    return (
        <dialog ref={dialogRef} className="modal" onClose={onClose}>
            <div className="modal-box">
                <h3 className="font-bold text-lg">Eliminar producto</h3>
                <p className="py-4 text-base-content/70">
                    ¿Estás seguro de que deseas eliminar{' '}
                    <span className="font-semibold text-base-content">
                        {productName}
                    </span>
                    ? Esta acción no se puede deshacer.
                </p>
                <div className="modal-action">
                    <button className="btn btn-ghost" onClick={onClose}>
                        Cancelar
                    </button>
                    <button className="btn btn-error" onClick={onConfirm}>
                        Eliminar
                    </button>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose}>close</button>
            </form>
        </dialog>
    )
}

export default DeleteModal
