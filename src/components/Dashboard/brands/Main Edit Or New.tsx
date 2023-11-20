'use client'
import {useEffect, useState} from "react";
import Modal from "@/components/Modal";
import {BrandTypeModel} from "@/types/Models";
import InputWithChip from "@/components/Input With Chip";
import {CustomEvent} from "@/types/others";
import toast from "react-hot-toast";
import {addNewBrand, deleteBrand, editBrand} from "@/services/fetch data";
import {useRouter} from "next/navigation";

type MainEditOrNewType = {
    brand ? : BrandTypeModel
    onClose ? : () => void
}

const MainEditOrNew = (props : MainEditOrNewType) => {
    const { brand, onClose } = props
    const router = useRouter()
    const [form, setForm] = useState<BrandTypeModel>({
        name : '',
        models : []
    });

    useEffect(() => {
        if(brand) {
            setForm(brand)
        }
    },[])

    const handleChange = (e : CustomEvent) => {
        const { name , value } = e.target
        setForm((prev) => ({
            ...prev,
            [name] : value,
        }));
    }

    const handleModels = (e : string[]) => {
        setForm((prev) => ({
            ...prev,
            models : e,
        }));
    }

    const handleDelete = () => {
        return toast.promise(deleteBrand(brand?._id?.toString()!), {
            loading: `\`${brand?.name} מוחק את ...`,
            success: () => {
                router.refresh()
                if (onClose) {
                    onClose()
                }
                return `${brand?.name} נמחק בהצלחה !`;
            },
            error: (data) => {
                return data.message
            },
        })
    }

    const handleSubmit = () => {
        if (!form.name) {
            return toast.error('חייב להיות שם למותג')
        }
        const typeFunc = brand ? editBrand(brand?._id?.toString()! , form) : addNewBrand(form)
        const process = brand ? "מעדכן את המותג..." : "מוסיף מותג חדש..."

        return toast.promise(typeFunc, {
            loading: process,
            success: (data) => {
                router.refresh()
                if (onClose) {
                    onClose()
                }
                return data.message;
            },
            error: (data) => {
                return data.message
            },
        })
    }


    return (
            <div className='bg-white w-[500px] z-50 h-auto p-4'>
               <div className='flex flex-wrap'>
                   <div className='w-full p-2'>
                       <input value={form.name || ""} className='input' name='name' placeholder='שם המותג' onChange={handleChange}/>
                   </div>
                   <div className='w-full p-2'>
                        <InputWithChip handleChange={handleModels} data={form.models}/>
                   </div>
                   <div className='w-full px-2 py-1'>
                       <button onClick={handleSubmit} className='btn'>שמירה</button>
                   </div>
                   {
                       brand && <div className='w-full px-2 py-1'>
                           <button onClick={handleDelete} className='btn bg-red-600 hover:bg-red-600/60'>מחיקה</button>
                       </div>
                   }
               </div>
            </div>
    )
}
export default MainEditOrNew
