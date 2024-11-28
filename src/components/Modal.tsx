import { CSSProperties, FC, useEffect, useRef } from "react";

type ModalProps = {
    children: React.ReactNode,
    modalStyles?: CSSProperties,
    bodyStyles?: CSSProperties,
    onClose: () => void,
    customModalClasses?: string,
    customBodyClasses?: string,
    disableCloseOutside?: boolean,
}

const Modal: FC<ModalProps> = ({
    children,
    modalStyles,
    bodyStyles,
    onClose,
    customModalClasses,
    customBodyClasses,
    disableCloseOutside
}) => {
    const modalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        document.body.style.overflow = "hidden"

        return () => {
            document.body.style.overflow = "auto"
        }
    }, [])

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node) && !disableCloseOutside) {
                onClose()
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [onClose, disableCloseOutside])

    return (
        <div
            style={modalStyles}
            className={`fixed top-0 left-0 w-full min-h-screen p-4 flex items-center justify-center bg-[#00000033] z-[100] ${customModalClasses ? customModalClasses : ''}`}
        >
            <div
                ref={modalRef}
                style={bodyStyles}
                className={`rounded-[24px] p-6 w-full overflow-hidden ${customBodyClasses ? customBodyClasses : ''}`}
            >
                {children}
            </div>
        </div>
    )
}

export default Modal