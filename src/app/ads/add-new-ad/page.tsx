import {getServerSession} from "next-auth";
import AdForm from "@/components/Ads/Ad Form";
import LoginForm from "@/components/Auth/Login/Login Form";
import {authOptions} from "@/utils/authOprions";

const PageNewAd = async () => {
    const session = await getServerSession(authOptions)

    const previewOption = {
        true : <AdForm/>,
        false : <LoginForm/>
    }

    return (
        <div className='py-4'>
            <h2 className='h4 text-center'>הוספת מודעה חדשה</h2>
            {previewOption[session ? "true" : "false"]}
        </div>
    )
}
export default PageNewAd
