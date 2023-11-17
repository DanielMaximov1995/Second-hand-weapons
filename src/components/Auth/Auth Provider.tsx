'use client'
import { ReactNodeType } from "@/types/others";
import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }: ReactNodeType) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
}

export default AuthProvider;
