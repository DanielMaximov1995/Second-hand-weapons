import AdForm from "@/components/Ads/Ad Form";
import RestrictedContent from "@/components/RestrictedContent";
import {getAllBrands} from "@/services/fetch data";

const PageNewAd = async () => {
    const brands = await getAllBrands()

    return (
        <div className='py-4'>
            <RestrictedContent>
            <h2 className='h4 text-center'>הוספת מודעה חדשה</h2>
                <AdForm brands={brands}/>
            </RestrictedContent>
        </div>
    )
}
export default PageNewAd
