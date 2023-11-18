'use client'

import {useState, FormEvent, useEffect} from "react";
import {CustomEvent} from "@/types/others";
import {signIn} from "next-auth/react";
import toast, {Renderable} from 'react-hot-toast'
import Link from "next/link";
import {addNewUser} from "@/services/fetch data";
import VisibleIcon from "@/components/Icons/Visible Icon";
import {useRouter} from "next/navigation";

const RegisterForm = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
        fName: '',
        lName: '',
        fullName: '',
        phone: ''
    });
    const [showPass, setShowPass] = useState<boolean>(false);
    const router = useRouter()


    useEffect(() => {
        setForm(prev => ({
            ...prev,
            fullName: `${prev.fName} ${prev.lName}`
        }))
    }, [form.fName || form.lName])

    const handleChange = (e: CustomEvent) => {
        const {name, value} = e.target
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (form.password.length < 8 || form.password.length > 16) {
            return toast.error('אורך הסיסמה צריך להיות בין 8 ל-16 תווים')
        }

        if (!form.email || !form.password) {
            return toast.error('חובה לרשום אימייל וגם סיסמא')
        }

        if (!form.fName) {
            return toast.error('חובה לרשום שם פרטי')
        }

        let created = false
        toast.promise(addNewUser(form), {
            loading: 'יוצר משתמש חדש...',
            success: () => {
                created = true
                return `ברוך הבא ${form.fName}, מתחבר כעת!`;
            },
            error: (data) => {
                return data.message
            },
        }).then(async () => {
            await signIn('credentials' , { redirect : false , email : form.email , password : form.password })
            return router.push('?')
        })
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
            <div className="relative w-full p-2">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-3xl text-primary">
                    <button onClick={() => setShowPass(prev => !prev)} type='button' className='pl-2'>
                          <VisibleIcon type={showPass} fontSize={20}/>
                    </button>
                </span>
                <input onChange={handleChange} className='input' placeholder='סיסמה' value={form.password || ""}
                       name='password' type={showPass ? "text" : 'password'}/>
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
