'use client'

import {useEffect, useState , FormEvent} from "react";
import {CloseIcon} from "@/components/Icons";
import {CustomEvent} from "@/types/others";
import toast from "react-hot-toast";

type InputTypeProps = {
    handleChange ?: (e: string[]) => void;
    data ?: string[]
}

const InputWithChip = (props : InputTypeProps) => {
    const { handleChange , data } = props
    const [values, setValues] = useState<string[]>( []);
    const [query, setQuery] = useState('');

    useEffect(() => {
        if (handleChange) {
            handleChange(values)
        }
    },[values])

    useEffect(() => {
        if (values.length === 0 && data) {
            setValues(data);
        }
    }, [data?.length! > 0]);

    const handleAddToValues = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let value = query.toLowerCase().trim()
        return values.includes(value)
            ? toast.error('הערך קיים כבר ברשימה !')
            : (setValues((prevValues) => [...prevValues, value]), setQuery(''));
    };

    const deleteValue = (value : string) => {
        const remove = values.filter(val => val !== value)
        setValues(remove)
    }

    return (
        <div className='w-full flex flex-wrap items-center py-2 px-6 h-auto input'>
            {
                values.map((value , index) => (
                    <div key={`value-${value}-${index}`} className='bg-primary text-white w-max flex z-high gap-x-2 px-2 mb-2 mx-2 rounded-md items-center'>
                        <span className='text-white'>{value}</span>
                        <span onClick={(e) => deleteValue(value)} className='bg-white text-primary cursor-pointer rounded-full'>
                                    <CloseIcon/>
                                </span>
                    </div>
                ))
            }
            <form onSubmit={handleAddToValues}>
                <input
                    className={`input ${values.length > 0 && 'mb-2'} h-10 w-[70%]`}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder='רשום ולחץ Enter'
                    value={query}
                    name='value'
                />
            </form>
        </div>
    )
}
export default InputWithChip