'use client'
import {ReactNode, useEffect} from "react";

type ModalType = {
    children : ReactNode;
    isOpen : boolean;
    onClose : () => void;
}
const Modal = (props : ModalType) => {
    const { children , isOpen , onClose } = props

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isOpen]);


    if(isOpen) {
        return (
            <div
                className={`fixed top-0 left-0 w-full transition-all duration-300 overflow-y-auto h-full bg-black backdrop-blur bg-opacity-50 ${
                    isOpen ? "flex items-center justify-center z-high" : "hidden"
                }`}
            >
                <div className='absolute w-full h-full' onClick={onClose}/>
                {children}
            </div>
        );
    }
};
export default Modal