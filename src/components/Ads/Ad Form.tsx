'use client'

import {ChangeEvent, useEffect, useState} from 'react'
import {AdModelType, BrandTypeModel} from "@/types/Models";
import {useSession} from "next-auth/react";
import FloatLabelText from "@/components/Float Label Text";
import {CustomEvent} from "@/types/others";
import Autocomplete from "@/components/Autocomplete";
import UploadFile from "@/components/Upload File";

const AdForm = ({brands}: { brands: BrandTypeModel[] }) => {
    const {data} = useSession()
    const initialAdState: AdModelType = {
        title: "", // √
        description: "", // √
        media: [],
        sellerName: data?.user?.fName || "", // √
        sellerPhone: "",
        userSaved: [],
        pistolBrand: "", // √
        pistolModel: "", // √
        timeWithMe: new Date(Date.now()).getFullYear(),
        city: "", // √
        store: "", // √
        price: 0,
    };
    const [ad, setAd] = useState<AdModelType>(initialAdState);

    useEffect(() => {
        if (!ad?.pistolBrand) {
            setAd(prev => ({
                ...prev,
                pistolModel: ''
            }))
        }
    }, [ad?.pistolModel])

    const handleChange = (e: CustomEvent) => {
        const {name, value} = e.target;
        setAd((prevAd) => ({
            ...prevAd,
            [name]: value
        }));
    };

    const handleSubmit = () => {

    }

    let findPistol = brands.find(pistol => pistol._id === ad?.pistolBrand)

    return (
        <div className='flex flex-wrap w-full md:w-[60%] md:mx-auto'>
            {/*<*/}
            <div className='w-full p-2'>
                <FloatLabelText
                    label='כותרת'
                    handleChange={handleChange}
                    name='title'
                    value={ad.title || ''}
                    type='text'
                    input='text'
                />
            </div>
            <div className='w-full p-2'>
                <FloatLabelText
                    label='תיאור'
                    handleChange={handleChange}
                    name='description'
                    value={ad.description || ''}
                    input='textarea'
                />
            </div>
            <div className='w-1/2 p-2'>
                <Autocomplete options={brands} label="דגם" name='pistolBrand' handleChange={handleChange}/>
            </div>
            <div className='w-1/2 p-2'>
                <Autocomplete options={findPistol?.models || []}
                              label={findPistol ? `מודל ה${findPistol?.name}` : "נא לבחור דגם"} name='pistolModel'
                              handleChange={handleChange}/>
            </div>
            <div className='w-1/2 p-2'>
                <FloatLabelText
                    label='שנת רכישת האקדח'
                    handleChange={handleChange}
                    name='timeWithMe'
                    type={"number"}
                    value={ad.timeWithMe || 0}
                    input='text'
                />
            </div>
            <div className='w-1/2 p-2'>
                <FloatLabelText
                    label='עיר מכירה'
                    handleChange={handleChange}
                    name='city'
                    value={ad.city || ''}
                    input='text'
                />
            </div>
            <div className='w-1/2 p-2'>
                <FloatLabelText
                    label='איפה תתבצע העברה?'
                    handleChange={handleChange}
                    name='store'
                    value={ad.store || ''}
                    input='text'
                />
            </div>
            <div className='w-1/2 p-2'>
                <FloatLabelText
                    label='שם המוכר'
                    handleChange={handleChange}
                    name='sellerName'
                    value={ad.sellerName || ''}
                    input='text'
                />
            </div>
            <div className='w-1/2 p-2'>
                <FloatLabelText
                    label='טלפון'
                    handleChange={handleChange}
                    name='sellerPhone'
                    value={ad.sellerPhone || ''}
                    input='text'
                    tel={true}
                    type='number'
                />
            </div>
            <div className='w-1/2 p-2'>
                <FloatLabelText
                    label='מחיר'
                    handleChange={handleChange}
                    name='price'
                    value={ad.price || ''}
                    input='text'
                    tel={true}
                    type='number'
                />
            </div>
            <div className='w-full p-2'>
                <UploadFile/>
            </div>
            <div className='w-full p-2'>
                <button className='btn'>פרסום מודעה</button>
            </div>
        </div>
    )
}
export default AdForm
