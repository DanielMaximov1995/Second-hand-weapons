'use client'

import {useState, FormEvent, useEffect} from "react";
import {CustomEvent} from "@/types/others";
import {signIn} from "next-auth/react";
import toast from 'react-hot-toast'
import Link from "next/link";
import {addNewUser} from "@/services/fetch data";

const RegisterForm = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
        fName : '',
        lName : '',
        fullName : '',
        phone : ''
    });

    useEffect(() => {
        setForm(prev => ({
            ...prev,
            fullName: `${prev.fName} ${prev.lName}`
        }))
    },[form.fName || form.lName])

    const handleChange = (e: CustomEvent) => {
        const {name, value} = e.target
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast.promise(addNewUser(form), {
            loading: 'יוצר משתמש חדש...',
            success: (data) => {
                console.log(data)
                return 'המשתמש נוסף בהצלחה, מתחבר כעת!'
            },
            error: (data) => {
                console.log(data)
                return data.message
            },
        });
    };


    return (
        <form onSubmit={handleSubmit} className='flex flex-wrap'>
            <p className='text-[24px] w-full font-semibold text-center'>התחברות</p>
            <div className='w-full p-2'>
                <input onChange={handleChange} className='input' placeholder='שם פרטי' value={form.fName || ""}
                       name='fName'/>
            </div>
            <div className='w-full p-2'>
                <input onChange={handleChange} className='input' placeholder='שם משפחה' value={form.lName || ""}
                       name='lName'/>
            </div>
            <div className='w-full p-2'>
                <input onChange={handleChange} className='input' placeholder='דוא"ל' value={form.email || ""}
                       name='email' type='email'/>
            </div>
            <div className='w-full p-2'>
                <input onChange={handleChange} className='input' placeholder='סיסמה' value={form.password || ""}
                       name='password' type='password'/>
            </div>
            <div className='flex w-full justify-between'>
                <Link href="?auth=login" className='px-2'>כבר קיים משתמש? לחץ כאן</Link>
            </div>
            <div className='w-full p-2'>
                <button type='submit' className='btn'>הרשמה</button>
            </div>
        </form>
    )
}

export default RegisterForm
