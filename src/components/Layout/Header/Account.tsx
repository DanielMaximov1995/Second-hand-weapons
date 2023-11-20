'use client'
import { AccountIcon } from "@/components/Icons";
import {useRef, useState, useEffect, MouseEventHandler} from 'react'
import LoginForm from "@/components/Auth/Login/Login Form";
import {useRouter } from "next/navigation";
import Link from "next/link";
import RegisterForm from "@/components/Auth/Register/Register Form";
import {useSession} from "next-auth/react";
import AccountOptions from "@/components/Auth/Account Details/Account Options";

const Account = () => {
    const [open, setOpen] = useState(false);
    const boxRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const [formType, setFormType] = useState<"login" | "register">('login');
    const { data , status } = useSession()

    const handleButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        setOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleOutsideClick = async (event : MouseEvent) => {
            if (
                boxRef.current &&
                !boxRef?.current?.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef?.current?.contains(event.target as Node)
            ) {
                setOpen(false)
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [boxRef, buttonRef, setOpen]);

    let formOption = {
        login : <LoginForm switchToRegister={() => setFormType('register')}/>,
        register : <RegisterForm switchToLogin={() => setFormType('login')}/>,
    }

    let statusOptions = {
        loading : 'טוען...',
        authenticated : <AccountOptions user={data}/>,
        unauthenticated : formOption[formType]
    }

    return (
        <div className='relative'>
            <button ref={buttonRef} onClick={handleButtonClick}>
                <AccountIcon fontSize={50}/>
            </button>
            <div
                ref={boxRef}
                className={`bg-accentBg dark:bg-accentSec shadow-custom rounded p-2 w-[300px] z-50 h-auto absolute left-0 top-[100%] mt-2 bg-white transition-all duration-300 ${!open ? 'opacity-0 hidden' : 'block opacity-100'}`}
            >
                {statusOptions[status]}
            </div>
        </div>
    )
}
export default Account
