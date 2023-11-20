'use client'
import React from 'react'
import {ReactNodeType} from "@/types/others";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import NotLogin from "@/components/Restricted/Not Login";

const RestrictedContent = ({ children } : ReactNodeType) => {
    const { status, data } : any = useSession();
    const isLoading = status === 'loading';
    const isLoggedIn = status === 'authenticated';


    if (isLoading) {
        return null
    }

    if (isLoggedIn) {
        return <>{children}</>;
    } else {
        return <NotLogin/>
    }

}
export default RestrictedContent
