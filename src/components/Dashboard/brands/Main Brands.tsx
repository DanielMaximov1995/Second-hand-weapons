'use client'
import {Fragment, useEffect, useState} from "react";
import {CustomEvent} from "@/types/others";
import {useRouter, useSearchParams} from "next/navigation";
import Modal from "@/components/Modal";
import MainEditOrNew from "@/components/Dashboard/brands/Main Edit Or New";
import {AddIcon, EditIcon, NewIcon} from "@/components/Icons";
import {BrandTypeModel} from "@/types/Models";
import Brands from "@/components/Dashboard/brands/Brands";

const MainBrands = ({tab , getBrands} : { tab ?: string , getBrands : BrandTypeModel[] }) => {
    const [openAddOrEdit, setOpenAddOrEdit] = useState<boolean>(false);
    const router = useRouter()
    const searchParams = useSearchParams()
    const searchQuery = searchParams.get('searchQuery')

    useEffect(() => {
        if(!searchQuery) {
            router.push(`dashboard?tab=${tab}`)
        }
    },[searchQuery])

    const handleChange = (e : CustomEvent) => {
        const { name , value } = e.target
        router.push(`dashboard?tab=${tab}&searchQuery=${value}`)
    }

    let filterBrands = getBrands.filter(x => searchQuery ? x.name?.toLowerCase()?.includes(searchQuery) : x)

    return (
        <div className='flex justify-center'>
            <div>
                <div className='flex w-full justify-between gap-x-4'>
                    <input onChange={handleChange} className='input w-auto' placeholder='חיפוש מותג'/>
                    <button onClick={() => setOpenAddOrEdit(prev => !prev)} className='btn w-auto flex items-center gap-x-1'>
                        חדש
                        <NewIcon/>
                    </button>
                </div>
                <div className='w-full'>
                    <Brands filterBrands={filterBrands}/>
                </div>
            </div>
            <Modal onClose={() => setOpenAddOrEdit(prev => !prev)} isOpen={openAddOrEdit} >
                <MainEditOrNew onClose={() => setOpenAddOrEdit(prev => !prev)}/>
            </Modal>
        </div>
    )
}
export default MainBrands
