import type {Metadata} from 'next'
import {Assistant} from 'next/font/google'
import './globals.css'
import {ReactNode} from "react";
import AuthProvider from "@/components/Auth/Auth Provider";
import Script from "next/script";
import IndexHeader from "@/components/Layout/Header/Index Header";
import { Toaster } from 'react-hot-toast';

const assistant = Assistant({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export const dynamic = 'force-dynamic'

const Layout = ({children}: { children: ReactNode }) => {
    return (
        <html lang="en" dir='rtl' style={{ scrollBehavior : 'smooth' }}>
        {/*<Script src="https://cdn.userway.org/widget.js" data-language="he" data-account={process.env.USERWAY!}></Script>*/}
        <body className={assistant.className} suppressHydrationWarning={true}>
        <Toaster position="top-center" toastOptions={{ duration : 5000 }}/>
                <AuthProvider>
                    <IndexHeader/>
                        <main className='w-[80%] mx-auto pt-20'>
                            {children}
                        </main>
                    <div>credit</div>
                </AuthProvider>
            </body>
        </html>
    )
}
export default Layout