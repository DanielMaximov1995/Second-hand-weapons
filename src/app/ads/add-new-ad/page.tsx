import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import AdForm from "@/components/Ads/Ad Form";
import LoginForm from "@/components/Auth/Login/Login Form";

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
