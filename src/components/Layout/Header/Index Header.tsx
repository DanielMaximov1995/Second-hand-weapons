'use client'
import Link from 'next/link'
import Image from 'next/image'
import Account from "@/components/Layout/Header/Account";
import AddIcon from "@/components/Icons/Add Icon";
import {FavoriteIcon} from "@/components/Icons";

const IndexHeader = () => {
    return (
        <header className='h-20 px-2 flex justify-between items-center bg-secAccent/60 fixed w-full'>
            {/*<Image src='' alt/>*/}
                <Link
                    className="w-[109px] h-[70px] relative"  href="/">
                    <Image src='/logo.png' alt='' className='object-contain' fill={true}/>
                </Link>
                <div className='text-center'>
                    <p className='text-[24px] text-primary m-0 font-semibold'>שוק הירי</p>
                </div>
                <div className='flex items-center gap-x-2'>
                    <Link href='/ads/add-new-ad' className='rounded-full text-green-600 effect hover:text-white hover:bg-green-600'>
                        <AddIcon fontSize={48}/>
                    </Link>
                    <button className='rounded-full text-transparent effect hover:text-red-600'>
                        <FavoriteIcon fontSize={48} color={'error'}/>
                    </button>
                    <Account/>
                </div>
        </header>
    )
}
export default IndexHeader
