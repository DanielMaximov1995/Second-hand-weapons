import RestrictedAdminContent from "@/components/RestrictedAdminContent";
import Link from "next/link";
import {redirect} from "next/navigation";
import MainBrands from "@/components/Dashboard/brands/Main Brands";
import {getAllBrands} from "@/services/fetch data";

interface FormOption {
    [key: string]: JSX.Element;
}

const Page = async ({searchParams} : {searchParams ?: { [key: string]: string | undefined }}) => {
    const tab = searchParams!.tab || "ads"
    const getBrands = await getAllBrands()

    if(!searchParams!.tab) {
        redirect('?tab=ads')
    }

    const options: FormOption = {
        users : <></>,
        ads : <></>,
        brands : <MainBrands tab={tab} getBrands={getBrands}/>
    }

    return (
        <div className='py-4'>
            <RestrictedAdminContent>
                <div className='flex justify-center gap-8'>
                    <Link className={`text-primary effect text-[24px] ${tab === "ads" && "tracking-widest font-semibold"}`} href='?tab=ads'>מודעות</Link>
                    <Link className={`text-primary effect text-[24px] ${tab === "brands" && "tracking-widest font-semibold"}`} href='?tab=brands'>מותגים</Link>
                    <Link className={`text-primary effect text-[24px] ${tab === "users" && "tracking-widest font-semibold"}`} href='?tab=users'>משתמשים</Link>
                </div>
                <div className='py-10'>
                    {options[tab]}
                </div>
            </RestrictedAdminContent>
        </div>
    )
}
export default Page
