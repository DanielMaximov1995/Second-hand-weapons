'use client'
import React from 'react'
import {ReactNodeType} from "@/types/others";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import NotLogin from "@/components/Restricted/Not Login";

const RestrictedAdminContent = ({ children } : ReactNodeType) => {
    const { status, data } : any = useSession();
    const isLoading = status === 'loading';
    const isLoggedIn = status === 'authenticated';


    if (isLoading) {
        return null
    }

    if (isLoggedIn && data?.role === 'admin') {
        return <>{children}</>;
    } else if(isLoggedIn && data?.role === 'user') {
        return <div className='text-center text-[30px] font-semibold'>
            <p>אינך מורשה לגשת לדף זה!</p>
        </div>
    } else {
        return <NotLogin/>
    }

}
export default RestrictedAdminContent
