'use client'

import {useState, FormEvent} from "react";
import {CustomEvent} from "@/types/others";
import {signIn} from "next-auth/react";
import toast from 'react-hot-toast'
import Link from "next/link";

const LoginForm = () => {
    const [form, setForm] = useState({email: '', password: ''});

    const handleChange = (e: CustomEvent) => {
        const {name, value} = e.target
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {email, password} = form;
        try {
            const signInResponse = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });
            if (signInResponse?.ok) {
                toast.success('ההתחברות בוצעה בהצלחה!');
            } else {
                toast.error('אימייל/סיסמה שגויים!');
            }
        } catch (error) {
            console.error('Error during sign-in:', error);
            toast.error('An error occurred during sign-in.');
        }
    };


    return (
        <form onSubmit={handleSubmit} className='flex flex-wrap'>
            <p className='text-[24px] w-full font-semibold text-center'>התחברות</p>
            <div className='w-full p-2'>
                <input onChange={handleChange} className='input' placeholder='דוא"ל' value={form.email || ""}
                       name='email' type='email'/>
            </div>
            <div className='w-full p-2'>
                <input onChange={handleChange} className='input' placeholder='סיסמה' value={form.password || ""}
                       name='password' type='password'/>
            </div>
            <div className='flex w-full justify-between'>
                <Link href="?auth=register" className='px-2'>הרשמה</Link>
                <Link href="?auth=register" className='px-2'>שכחת סיסמה?</Link>
            </div>
            <div className='w-full p-2'>
                <button type='submit' className='btn'>התחברות</button>
            </div>
        </form>
    )
}

export default LoginForm
