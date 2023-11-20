'use client'

import LoginForm from "@/components/Auth/Login/Login Form";
import RegisterForm from "@/components/Auth/Register/Register Form";
import {useState} from "react";

interface FormOption {
    [key: string]: JSX.Element;
}

const NotLogin = () => {
    const [formType, setFormType] = useState<"login" | "register">('login');

    let formOption : FormOption = {
        login : <LoginForm switchToRegister={() => setFormType('register')}/>,
        register : <RegisterForm switchToLogin={() => setFormType('login')}/>,
    }


    return (
        <div
            className={`rounded p-2 w-[500px] mx-auto h-auto bg-white transition-all duration-300`}
        >
            {formOption[formType]}
        </div>
    )
}
export default NotLogin
