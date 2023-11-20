'use client'

import {ChangeEvent, useState} from 'react'
import {AdModelType} from "@/types/Models";

const AdForm = () => {
    const initialAdState: AdModelType = {
        title: "",
        description: "",
        media: [],
        sellerName: "",
        sellerPhone: "",
        userSaved: [],
        pistolBrand: "",
        pistolModel: "",
        timeWithMe: 0,
        city: "",
        store: "",
        price: 0,
    };
    const [ad, setAd] = useState<AdModelType>(initialAdState);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setAd((prevAd) => ({ ...prevAd, [name]: value }));
    };

    const handleSubmit = () => {

        
    }

    return (
        <div className='flex flex-wrap w-full'>
            {/*<*/}
            <input className='input' placeholder='כותרת'/>
        </div>
    )
}
export default AdForm
