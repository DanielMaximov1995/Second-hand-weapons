'use client'

import {EditIcon} from "@/components/Icons";
import {BrandTypeModel} from "@/types/Models";
import {Fragment, useState} from "react";
import MainEditOrNew from "@/components/Dashboard/brands/Main Edit Or New";

const Brands = ({filterBrands} : {filterBrands : BrandTypeModel[]}) => {
    const [openAccordionId, setOpenAccordionId] = useState<string | undefined>('');


    return (
        <table className="overflow-x-auto divide-y divide-gray-200 my-2">
            <thead className="bg-primary">
            <tr>
                <th scope="col"
                    className="px-6 py-3 text-right text-[18px] md:text-[22px] font-semibold text-white uppercase tracking-wider">
                    שם מותג
                </th>
                <th scope="col"
                    className="px-6 py-3 text-right text-[18px] md:text-[22px] font-semibold text-white uppercase tracking-wider">
                    כמות מודלים
                </th>
                <th scope="col"
                    className="px-6 py-3 text-right text-[18px] md:text-[22px] font-semibold text-white uppercase tracking-wider">
                    פעולה
                </th>
            </tr>
            </thead>
            <tbody className="bg-primary/60 divide-y divide-gray-200">
            {
                filterBrands.map((brand , index) => {
                    const brandIdString = brand?._id?.toString();
                    return <Fragment key={brandIdString}>
                        <tr className='text-white text-center'>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {brand.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {brand.models.length}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button onClick={() => setOpenAccordionId(prev => prev === brandIdString ? '' : brandIdString)}><EditIcon fontSize={20}/></button>
                            </td>
                        </tr>
                        <tr className={`transition-all duration-300 ${openAccordionId === brandIdString ? 'table-row opacity-100' : 'hidden opacity-0'}`}>
                            <td colSpan={6}>
                                <MainEditOrNew brand={brand} onClose={() => setOpenAccordionId('')}/>
                            </td>
                        </tr>
                    </Fragment>
                })
            }
            </tbody>
        </table>
    )
}
export default Brands
