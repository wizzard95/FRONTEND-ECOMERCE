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
                <h3 className="font-bold text-lg">Confirmar eliminación</h3>
                <p className="py-4">
                    ¿Estás seguro de que deseas eliminar el producto{' '}
                    <strong>{productName}</strong>? Esta acción no se puede
                    deshacer.
                </p>
                <div className="modal-action justify-center">
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
