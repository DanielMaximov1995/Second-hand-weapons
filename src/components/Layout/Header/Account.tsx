'use client'
import { AccountIcon } from "@/components/Icons";
import { useRef , useState , useEffect } from 'react'
import LoginForm from "@/components/Auth/Login/Login Form";
import {useRouter , useSearchParams} from "next/navigation";
import Link from "next/link";
import RegisterForm from "@/components/Auth/Register/Register Form";

const Account = () => {
    const [open, setOpen] = useState(false);
    const boxRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const router = useRouter()
    const searchParams = useSearchParams()
    const getAuth = searchParams.get('auth')

    useEffect(() => {
        const handleOutsideClick = (event : MouseEvent) => {
            if (
                boxRef.current &&
                !boxRef?.current?.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef?.current?.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [boxRef, buttonRef, setOpen]);

    const openBox = () => {
        setOpen(prev => !prev)
        router.push('?auth=login')
    }

    let formOption = {
        login : <LoginForm/>,
        register : <RegisterForm/>,
    }

    const selectedForm = formOption[getAuth as keyof typeof formOption] || <LoginForm />; // Ensure getAuth is not null when accessing formOption

    return (
        <div className='relative'>
            <button ref={buttonRef} onClick={openBox}>
                <AccountIcon fontSize={50}/>
            </button>
            <div
                ref={boxRef}
                className={`bg-accentBg dark:bg-accentSec shadow-custom rounded p-2 w-[300px] z-50 h-auto absolute left-0 top-[100%] mt-2 bg-white transition-all duration-300 ${!open ? 'opacity-0 hidden' : 'block opacity-100'}`}
            >
                {selectedForm}
            </div>
        </div>
    )
}
export default Account