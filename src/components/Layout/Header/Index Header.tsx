'use client'
import Link from 'next/link'
import Image from 'next/image'
import {AccountIcon} from "@/components/Icons";
import Account from "@/components/Layout/Header/Account";

const IndexHeader = () => {
    return (
        <header className='h-20 px-2 flex justify-between items-center bg-secAccent/60'>
            {/*<Image src='' alt/>*/}
                <Link
                    className="w-[109px] h-[70px] relative"  href="/">
                    <Image src='/logo.png' alt='' className='object-contain' fill={true}/>
                </Link>
                <div className='text-center'>
                    <p className='text-[24px] text-primary m-0 font-semibold'>שוק הירי</p>
                    <p className='text-[20px] text-primary m-0'>השוק למכירת ציוד טקטי וכלי ירי</p>
                </div>
                <div>
                    <Account/>
                </div>
        </header>
    )
}
export default IndexHeader
